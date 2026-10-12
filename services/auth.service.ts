import { authProvider } from "@/utils/constants/appConstant";
import axios from "axios";
import utils from "@/utils";
import { IJWTResponse } from "@/interface/response/auth.response";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { makeRedirectUri } from "expo-auth-session";
import * as Crypto from "expo-crypto";
import * as WebBrowser from "expo-web-browser";
import { Platform, TurboModuleRegistry } from "react-native";
import type { SignInResponse } from "@react-native-google-signin/google-signin";

type GoogleSigninModule = typeof import("@react-native-google-signin/google-signin");

/**
 * Outcome of a native sign-in attempt, so callers never depend on `instanceof`
 * checks against Error subclasses.
 */
type NativeSignInResult =
    | { ok: true; jwt: IJWTResponse }
    | { ok: false; cancelled: boolean; reason: string };

class AuthService {
    // public methods
    // ###############################################################

    // login function
    async login(provider: authProvider): Promise<IJWTResponse> {
        try {
            if (provider === authProvider.GOOGLE) {
                const attempt = await this._tryGoogleNativeSignIn();

                if (attempt.ok) {
                    return attempt.jwt;
                }

                if (attempt.cancelled) {
                    const cancelled = new Error("Google sign-in was cancelled");
                    cancelled.name = "SignInCancelledError";
                    throw cancelled;
                }

                // Native sign-in could not run (Expo Go, no dev build, no Play
                // Services, missing config). The browser flow still ends with
                // Appwrite/backend verifying the user, so nothing is bypassed.
                console.warn(
                    `AuthService:::login:::: native Google sign-in unavailable - ${attempt.reason}. Falling back to the browser flow.`
                );
                return await this._loginWithGoogleBrowser();
            }

            throw new Error(`Login is not implemented for provider: ${provider}`);
        } catch (error: any) {
            if (error?.name !== "SignInCancelledError") {
                console.error("Login Error:", error?.message || error);
            }
            throw error;
        }
    }

    // Authenticate natively using Google ID token verified strictly by backend
    async loginWithGoogleIdToken(idToken: string, redirectUri?: string): Promise<IJWTResponse> {
        try {
            const baseUrl = this._getBackendBaseUrl(redirectUri);
            const url = `${baseUrl}/v1/auth/google/native`;
            console.log("Authenticating Google ID token with backend at:", url);

            // The ID token is only ever sent to the backend over HTTPS. Appwrite
            // verifies the signature, audience and expiry before a session exists.
            const result = await axios.post(url, { idToken }, { timeout: 15000 });
            const jwtFromBackend = result.data as IJWTResponse;

            if (!jwtFromBackend?.accessToken || !jwtFromBackend?.refreshToken) {
                throw new Error("Invalid JWT response from backend");
            }

            await this._persistSession(jwtFromBackend);
            return jwtFromBackend;
        } catch (error: any) {
            const errorMsg = error?.response?.data?.message || error?.message || "Google native sign-in failed";
            console.error("Native Google Login Error:", errorMsg);
            throw new Error(errorMsg);
        }
    }

    // ... private methods ...

    // Attempts the native Google account picker and exchanges the ID token for a
    // backend session. Every failure is converted into a result so nothing escapes
    // as an unhandled rejection.
    private async _tryGoogleNativeSignIn(): Promise<NativeSignInResult> {
        try {
            const googleSignin = this._requireGoogleSignin();
            if (!googleSignin) {
                return {
                    ok: false,
                    cancelled: false,
                    reason: "'RNGoogleSignin' native module is not in this build - use a development build (npx expo prebuild / eas build), not Expo Go",
                };
            }

            const { GoogleSignin, isSuccessResponse, statusCodes } = googleSignin;

            const webClientId = utils.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID;
            if (!webClientId) {
                return {
                    ok: false,
                    cancelled: false,
                    reason: "EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID is not set in .env",
                };
            }

            const iosClientId = utils.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID;
            GoogleSignin.configure(iosClientId ? { webClientId, iosClientId } : { webClientId });

            try {
                await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
            } catch (error: any) {
                return {
                    ok: false,
                    cancelled: false,
                    reason: `Google Play Services unavailable (${error?.code || "unknown"})`,
                };
            }

            let response: SignInResponse;
            try {
                response = await GoogleSignin.signIn();
            } catch (error: any) {
                if (error?.code === statusCodes.SIGN_IN_CANCELLED) {
                    return { ok: false, cancelled: true, reason: "cancelled" };
                }
                return {
                    ok: false,
                    cancelled: false,
                    reason: `Google sign-in failed (${error?.code || "unknown"}): ${error?.message || error}`,
                };
            }

            if (response.type === "cancelled") {
                return { ok: false, cancelled: true, reason: "cancelled" };
            }

            if (!isSuccessResponse(response) || !response.data.idToken) {
                return { ok: false, cancelled: false, reason: "Google did not return an ID token" };
            }

            const jwt = await this.loginWithGoogleIdToken(response.data.idToken);
            return { ok: true, jwt };
        } catch (error: any) {
            return {
                ok: false,
                cancelled: false,
                reason: error?.message || String(error),
            };
        }
    }

    private async _loginWithGoogleBrowser(): Promise<IJWTResponse> {
        // Generate the redirect URI dynamically (handles Expo Go vs Prod)
        const redirectUri = makeRedirectUri({
            scheme: 'sheild',
            path: 'oauth/success'
        });
        console.log("AuthService:::login:::: Generated Redirect URI:", redirectUri);

        // The nonce is persisted BEFORE the browser opens so a cold-start deep
        // link (app relaunched by the callback) can still complete the exchange.
        const nonce = this._generateNonce();
        await AsyncStorage.setItem(utils.appConstant.OAUTH_NONCE_KEY_FOR_LOCAL_STORAGE, nonce);

        // Ask the backend for the Google consent URL; it now hands back a URL and
        // a state, never tokens.
        const { url } = await this._getGoogleLoginURL(redirectUri, nonce);

        // Open the browser session
        const result = await WebBrowser.openAuthSessionAsync(url, redirectUri);

        if (result.type !== 'success' || !result.url) {
            throw new Error('OAuth was cancelled or failed');
        }

        const matchError = result.url.match(/[?&]error=([^&]+)/);
        if (matchError) {
            throw new Error(decodeURIComponent(matchError[1]));
        }

        const matchCode = result.url.match(/[?&]code=([^&]+)/);
        if (!matchCode) {
            throw new Error('Failed to parse authentication result from callback URL: no one-time code or error was returned');
        }

        let jwtFromBackend: IJWTResponse;
        try {
            jwtFromBackend = await this._exchangeOAuthCode(
                decodeURIComponent(matchCode[1]),
                nonce,
                redirectUri
            );
        } catch (exchangeError) {
            // The OAuth success screen may have finished the same exchange first
            // and stored the session. That is a successful login, not a failure.
            const persisted = await AsyncStorage.getItem(utils.appConstant.SESSION_DATA_KEY_FOR_LOCAL_STORAGE);
            if (persisted) {
                console.log("AuthService:::login:::: session already stored by the OAuth success screen");
                jwtFromBackend = JSON.parse(utils.commonFunction.decodeBase64(persisted));
            } else {
                throw exchangeError;
            }
        }

        await this._persistSession(jwtFromBackend);
        return jwtFromBackend;
    }

    // 64 lowercase hex chars from a CSPRNG (expo-crypto -> native crypto).
    private _generateNonce(): string {
        const bytes = Crypto.getRandomValues(new Uint8Array(32));
        return Array.from({ length: 32 }, (_, index) => bytes[index].toString(16).padStart(2, "0")).join("");
    }

    // Swaps the single-use code + nonce for the real session tokens and forgets
    // the nonce so it can never be replayed.
    private async _exchangeOAuthCode(
        code: string,
        nonce: string,
        redirectUri?: string
    ): Promise<IJWTResponse> {
        try {
            return await exchangeOAuthCodeOnce(code, nonce, redirectUri);
        } catch (error: any) {
            const errorMsg = error?.response?.data?.message || error?.message || "Failed to exchange OAuth code";
            console.error("OAuth Exchange Error:", errorMsg);
            throw new Error(errorMsg);
        }
    }

    private async _persistSession(jwtFromBackend: IJWTResponse): Promise<void> {
        const encodeData = utils.commonFunction.encodeBase64(jwtFromBackend);
        await AsyncStorage.setItem(utils.appConstant.SESSION_DATA_KEY_FOR_LOCAL_STORAGE, encodeData);
    }

    // The package runs TurboModuleRegistry.getEnforcing('RNGoogleSignin') while it
    // is being imported, which throws a red Invariant Violation in Expo Go. Probe
    // with the non-enforcing get() first so a missing module is a quiet, expected
    // case instead of an error.
    private _requireGoogleSignin(): GoogleSigninModule | null {
        if (!TurboModuleRegistry.get("RNGoogleSignin")) {
            return null;
        }

        const module = require("@react-native-google-signin/google-signin") as GoogleSigninModule;
        return module?.GoogleSignin ? module : null;
    }

    private async _getGoogleLoginURL(
        redirectUri: string,
        nonce: string
    ): Promise<{ url: string; state: string }> {
        try {
            const baseUrl = getBackendBaseUrl(redirectUri);
            const url = `${baseUrl}/v1/auth/googleLogin`;
            console.log("Fetching Google Login URL from:", url);

            // Send redirectUri and the nonce to the backend
            const result = await axios.get(url, {
                params: {
                    redirectUri: redirectUri,
                    nonce: nonce
                },
                timeout: 15000
            });
            return result.data;
        } catch (error: any) {
            const errorMsg = error?.response?.data?.message || error?.message || "Failed to fetch Google Login URL";
            console.error("Google Login URL Error:", errorMsg, error);
            throw new Error(errorMsg);
        }
    }

    private _getBackendBaseUrl(redirectUri?: string): string {
        return getBackendBaseUrl(redirectUri);
    }
}

export default new AuthService();

// The deep link that carries the one-time code is handled twice: the in-app
// browser flow resolves with it, and expo-router also navigates to
// /oauth/success with it. Both used to POST /v1/auth/oauth/exchange, the second
// request always lost with "Sign-in code is invalid or has expired" because the
// backend consumes the code exactly once. Every caller therefore shares one
// request: whoever asks first starts it, everyone else awaits the same result.
type ExchangeAttempt = { code: string; startedAt: number; promise: Promise<IJWTResponse> };

const EXCHANGE_DEDUPE_WINDOW_MS = 60000;
let sharedExchange: ExchangeAttempt | null = null;

export async function exchangeOAuthCodeOnce(
    code: string,
    nonce: string,
    redirectUri?: string
): Promise<IJWTResponse> {
    const normalizedCode = code.trim();
    const now = Date.now();

    if (
        sharedExchange &&
        sharedExchange.code === normalizedCode &&
        now - sharedExchange.startedAt < EXCHANGE_DEDUPE_WINDOW_MS
    ) {
        console.log("AuthService:::exchangeOAuthCodeOnce:::: reusing the in-flight exchange for this code");
        return sharedExchange.promise;
    }

    const promise = postOAuthExchange(normalizedCode, nonce, redirectUri);
    sharedExchange = { code: normalizedCode, startedAt: now, promise };

    // A failed attempt (offline, backend restart) must stay retryable, so the
    // rejection is not pinned for later callers.
    promise.catch(() => {
        if (sharedExchange?.code === normalizedCode) {
            sharedExchange = null;
        }
    });

    return promise;
}

async function postOAuthExchange(
    code: string,
    nonce: string,
    redirectUri?: string
): Promise<IJWTResponse> {
    const baseUrl = getBackendBaseUrl(redirectUri);
    const url = `${baseUrl}/v1/auth/oauth/exchange`;
    console.log("Exchanging OAuth code with backend at:", url);

    const result = await axios.post(url, { code, nonce }, { timeout: 15000 });
    const jwtFromBackend = result.data as IJWTResponse;

    if (!jwtFromBackend?.accessToken || !jwtFromBackend?.refreshToken) {
        throw new Error("Invalid JWT response from backend");
    }

    await AsyncStorage.removeItem(utils.appConstant.OAUTH_NONCE_KEY_FOR_LOCAL_STORAGE);
    await AsyncStorage.setItem(
        utils.appConstant.SESSION_DATA_KEY_FOR_LOCAL_STORAGE,
        utils.commonFunction.encodeBase64(jwtFromBackend)
    );
    return jwtFromBackend;
}

// Priority: explicit EXPO_PUBLIC_BACKEND_BASE_URL -> derive http://<host>:5000
// from an exp:// redirectUri (Expo Go) -> clear error. Exported so the OAuth
// success screen can build the same exchange URL.
export function getBackendBaseUrl(redirectUri?: string): string {
    let baseUrl = utils.env.BACKEND_BASE_URL || "";

    if (!baseUrl && redirectUri?.startsWith("exp://")) {
        const hostFromExpoUri = redirectUri.replace("exp://", "").split("/")[0]?.split(":")[0];
        if (hostFromExpoUri) {
            baseUrl = `http://${hostFromExpoUri}:5000`;
        }
    }

    if (!baseUrl) {
        throw new Error(
            "Missing backend URL. Set EXPO_PUBLIC_BACKEND_BASE_URL in .env (for example: http://192.168.x.x:5000)."
        );
    }

    if (Platform.OS === "android" && baseUrl.includes("localhost")) {
        console.log("Replacing localhost with 10.0.2.2 for Android Emulator");
        baseUrl = baseUrl.replace("localhost", "10.0.2.2");
    }

    return baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
}
