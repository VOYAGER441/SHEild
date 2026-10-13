import * as WebBrowser from "expo-web-browser";
import * as Crypto from "expo-crypto";
import utils from "@/utils";
import { getBackendBaseUrl } from "./backendUrl";

// Deep link the backend bridge page forwards the Google result into. Must stay
// in sync with ALLOWED_DEEP_LINK_PREFIXES on the backend (auth.controller.ts).
const APP_OAUTH_DEEP_LINK = "sheild://oauth/callback";

// Google OAuth 2.0 implicit flow (response_type=id_token) against the Web
// client. The redirect lands on the backend bridge page
// (GET /v1/auth/google/callback), whose JS moves the id_token from the URL
// fragment - which browsers never send to servers - into the app deep link.
// This is the Expo Go / no-native-module fallback; it still ends with OUR
// backend verifying the token, so nothing is bypassed.

function generateNonce(): string {
    const bytes = Crypto.getRandomValues(new Uint8Array(32));
    return Array.from({ length: 32 }, (_, index) => bytes[index].toString(16).padStart(2, "0")).join("");
}

function buildGoogleAuthorizeUrl(nonce: string): string {
    const webClientId = utils.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID;
    if (!webClientId) {
        throw new Error("EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID is not set in .env");
    }

    const redirectUri = `${getBackendBaseUrl()}/v1/auth/google/callback`;
    const params = new URLSearchParams({
        client_id: webClientId,
        redirect_uri: redirectUri,
        response_type: "id_token",
        scope: "openid email profile",
        nonce,
        // tells the bridge page which deep link to forward into
        state: APP_OAUTH_DEEP_LINK,
    });
    return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
}

// Opens the system browser at Google's consent screen and resolves with the
// id_token delivered back through the backend bridge page + app deep link.
export async function signInWithGoogleBrowser(): Promise<string> {
    const authorizeUrl = buildGoogleAuthorizeUrl(generateNonce());

    // Wait for the app deep link, not the https callback: the bridge page
    // re-targets it, which also survives Android dropping URL fragments.
    const result = await WebBrowser.openAuthSessionAsync(authorizeUrl, APP_OAUTH_DEEP_LINK);

    if (result.type !== "success" || !result.url) {
        const cancelled = new Error("Google sign-in was cancelled");
        cancelled.name = "SignInCancelledError";
        throw cancelled;
    }

    const url = new URL(result.url);
    const idToken = url.searchParams.get("id_token");
    const error = url.searchParams.get("error");

    if (error) {
        throw new Error(decodeURIComponent(error));
    }
    if (!idToken) {
        throw new Error("Google sign-in returned no ID token");
    }

    return idToken;
}
