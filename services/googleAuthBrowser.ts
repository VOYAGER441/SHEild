import * as WebBrowser from "expo-web-browser";
import * as Crypto from "expo-crypto";
import utils from "@/utils";
import { getBackendBaseUrl } from "./backendUrl";

// Google OAuth 2.0 implicit flow (response_type=id_token) against the Web
// client. The redirect lands on the backend bridge page
// (GET /v1/auth/google/callback), whose JS moves the id_token from the URL
// fragment - which browsers never send to servers - into a backend
// browser-session record. The app polls for that record instead of relying
// on a sheild:// deep link, which Expo Go does not register. This is the
// Expo Go / no-native-module fallback; it still ends with OUR backend
// verifying the token, so nothing is bypassed.

const POLL_INTERVAL_MS = 1500;
const POLL_TIMEOUT_MS = 4 * 60 * 1000;

function generateNonce(): string {
    const bytes = Crypto.getRandomValues(new Uint8Array(32));
    return Array.from({ length: 32 }, (_, index) => bytes[index].toString(16).padStart(2, "0")).join("");
}

function buildGoogleAuthorizeUrl(state: string, nonce: string): string {
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
        // sessionId the bridge page uses to hand the result to the backend
        state,
    });
    return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
}

async function pollForBrowserResult(sessionId: string): Promise<string> {
    const url = `${getBackendBaseUrl()}/v1/auth/google/browser-session/${encodeURIComponent(sessionId)}`;
    const deadline = Date.now() + POLL_TIMEOUT_MS;

    while (Date.now() < deadline) {
        try {
            const response = await fetch(url, { method: "GET" });
            if (response.status === 200) {
                const data = await response.json();
                if (typeof data.idToken === "string" && data.idToken) {
                    return data.idToken;
                }
                if (typeof data.error === "string" && data.error) {
                    throw new Error(decodeURIComponent(data.error));
                }
            }
            // 404 = bridge page hasn't posted the result yet; keep polling.
        } catch (networkError) {
            // Rethrow real sign-in errors; ignore transient network errors.
            if (networkError instanceof Error && !(networkError instanceof TypeError)) {
                throw networkError;
            }
        }
        await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL_MS));
    }

    throw new Error("Google sign-in timed out. Please try again.");
}

// Opens the system browser at Google's consent screen and resolves with the
// id_token handed back through the backend browser-session record.
export async function signInWithGoogleBrowser(): Promise<string> {
    const sessionId = generateNonce();
    const authorizeUrl = buildGoogleAuthorizeUrl(sessionId, generateNonce());

    // Fire-and-forget: no deep link, no openAuthSessionAsync. The user
    // completes Google sign-in in the browser; the bridge page posts the
    // result to the backend; we poll for it below. Works in Expo Go.
    await WebBrowser.openBrowserAsync(authorizeUrl);

    return pollForBrowserResult(sessionId);
}
