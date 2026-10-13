import { authProvider } from "@/utils/constants/appConstant";
import { IJWTResponse } from "@/interface/response/auth.response";
import { apiPost } from "./api.client";
import { saveSession, loadSession, clearSession } from "./token.storage";
import { getGoogleSignin } from "./googleSignin";
import { signInWithGoogleBrowser } from "./googleAuthBrowser";

// Backend endpoint that verifies the Google ID token server-side.
const GOOGLE_LOGIN_PATH = "/api/v1/auth/google";

class AuthService {
    // public methods
    // ###############################################################

    // login function - native Google account picker first; when the native
    // module is missing (Expo Go), falls back to the browser OAuth flow. Both
    // paths end with our backend verifying the Google ID token.
    async login(provider: authProvider): Promise<IJWTResponse> {
        try {
            if (provider === authProvider.GOOGLE) {
                const native = await this._tryNativeGoogleSignIn();

                if (native.ok) {
                    return await this.loginWithGoogleIdToken(native.idToken);
                }

                if (native.cancelled) {
                    const cancelled = new Error("Google sign-in was cancelled");
                    cancelled.name = "SignInCancelledError";
                    throw cancelled;
                }

                console.warn(
                    `AuthService:::login:::: native Google sign-in unavailable - ${native.reason}. Falling back to the browser flow.`
                );
                const idToken = await signInWithGoogleBrowser();
                return await this.completeBrowserLogin(idToken);
            }

            throw new Error(`Login is not implemented for provider: ${provider}`);
        } catch (error: any) {
            if (error?.name !== "SignInCancelledError") {
                console.error("Login Error:", error?.message || error);
            }
            throw error;
        }
    }

    // Authenticate natively: the Google ID token is verified strictly by our
    // Node.js backend (google-auth-library), never by a third party.
    async loginWithGoogleIdToken(idToken: string): Promise<IJWTResponse> {
        try {
            console.log("Authenticating Google ID token with backend at:", GOOGLE_LOGIN_PATH);

            const jwtFromBackend = await apiPost<IJWTResponse>(GOOGLE_LOGIN_PATH, { idToken });

            if (!jwtFromBackend?.accessToken || !jwtFromBackend?.refreshToken) {
                throw new Error("Invalid JWT response from backend");
            }

            await saveSession(jwtFromBackend);
            return jwtFromBackend;
        } catch (error: any) {
            const errorMsg = error?.response?.data?.message || error?.message || "Google sign-in failed";
            console.error("Google Login Error:", errorMsg);
            throw new Error(errorMsg);
        }
    }

    // The browser-flow deep link can be seen twice (openAuthSessionAsync and
    // the /oauth/callback screen on a cold start). Whoever asks first starts
    // the exchange; everyone else awaits the same in-flight promise so the
    // backend is only called once per id_token.
    private _inFlightBrowserLogin: { idToken: string; startedAt: number; promise: Promise<IJWTResponse> } | null = null;

    async completeBrowserLogin(idToken: string): Promise<IJWTResponse> {
        const now = Date.now();
        if (
            this._inFlightBrowserLogin &&
            this._inFlightBrowserLogin.idToken === idToken &&
            now - this._inFlightBrowserLogin.startedAt < 60000
        ) {
            return this._inFlightBrowserLogin.promise;
        }

        const promise = this.loginWithGoogleIdToken(idToken);
        this._inFlightBrowserLogin = { idToken, startedAt: now, promise };

        // A failed attempt must stay retryable, so the rejection is not pinned.
        promise.catch(() => {
            if (this._inFlightBrowserLogin?.idToken === idToken) {
                this._inFlightBrowserLogin = null;
            }
        });

        return promise;
    }

    // current session (null when signed out)
    getSession(): Promise<IJWTResponse | null> {
        return loadSession();
    }

    // local logout: drop the Google account from the device and clear tokens.
    // (Stateless backend JWTs are not server-revoked yet - see backend /auth/logout TODO.)
    async logout(): Promise<void> {
        const googleSignin = getGoogleSignin();
        if (googleSignin) {
            try {
                await googleSignin.GoogleSignin.signOut();
            } catch (error: any) {
                console.warn("AuthService:::logout:::: GoogleSignin.signOut failed:", error?.message || error);
            }
        }
        await clearSession();
    }

    // private methods
    // ###############################################################

    // Attempts the native Google account picker. Every non-success outcome is
    // converted into a result so the caller can fall back to the browser flow.
    private async _tryNativeGoogleSignIn(): Promise<
        { ok: true; idToken: string } | { ok: false; cancelled: boolean; reason: string }
    > {
        const googleSignin = getGoogleSignin();
        if (!googleSignin) {
            return {
                ok: false,
                cancelled: false,
                reason: "'RNGoogleSignin' native module is not in this build - use a development build (npx expo prebuild / eas build), not Expo Go",
            };
        }

        const { GoogleSignin, isSuccessResponse, statusCodes } = googleSignin;

        try {
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        } catch (error: any) {
            return {
                ok: false,
                cancelled: false,
                reason: `Google Play Services unavailable (${error?.code || "unknown"})`,
            };
        }

        let response;
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

        return { ok: true, idToken: response.data.idToken };
    }
}

export default new AuthService();
