import { authProvider } from "@/utils/constants/appConstant";
import { IJWTResponse } from "@/interface/response/auth.response";
import { apiPost } from "./api.client";
import { saveSession, loadSession, clearSession } from "./token.storage";
import { getGoogleSignin } from "./googleSignin";

// Backend endpoint that verifies the Google ID token server-side.
const GOOGLE_LOGIN_PATH = "/api/v1/auth/google";

class AuthService {
    // public methods
    // ###############################################################

    // login function - native Google account picker only, no browser fallback
    async login(provider: authProvider): Promise<IJWTResponse> {
        try {
            if (provider === authProvider.GOOGLE) {
                const idToken = await this._signInWithGoogle();
                return await this.loginWithGoogleIdToken(idToken);
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

    // Triggers the OS native account picker and resolves with the ID token.
    // Requires a dev/production build - Expo Go has no RNGoogleSignin module.
    private async _signInWithGoogle(): Promise<string> {
        const googleSignin = getGoogleSignin();
        if (!googleSignin) {
            throw new Error(
                "Native Google Sign-In is unavailable in this build. Use a development build (npx expo prebuild / eas build), not Expo Go."
            );
        }

        const { GoogleSignin, isSuccessResponse, statusCodes } = googleSignin;

        try {
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        } catch (error: any) {
            throw new Error(`Google Play Services unavailable (${error?.code || "unknown"}). Please update Google Play Services and try again.`);
        }

        let response;
        try {
            response = await GoogleSignin.signIn();
        } catch (error: any) {
            if (error?.code === statusCodes.SIGN_IN_CANCELLED) {
                const cancelled = new Error("Google sign-in was cancelled");
                cancelled.name = "SignInCancelledError";
                throw cancelled;
            }
            throw new Error(`Google sign-in failed (${error?.code || "unknown"}): ${error?.message || error}`);
        }

        if (response.type === "cancelled") {
            const cancelled = new Error("Google sign-in was cancelled");
            cancelled.name = "SignInCancelledError";
            throw cancelled;
        }

        if (!isSuccessResponse(response) || !response.data.idToken) {
            throw new Error("Google did not return an ID token");
        }

        return response.data.idToken;
    }
}

export default new AuthService();
