import { authProvider } from "@/utils/constants/appConstant";
import { account } from "./appwrite.service";
import { OAuthProvider } from "react-native-appwrite";
import axios from "axios";
import utils from "@/utils";
import { IJWTResponse } from "@/interface/response/auth.response";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { makeRedirectUri } from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import { Platform } from "react-native";

class AuthService {
    // public methods
    // ###############################################################

    // login function
    async login(provider: authProvider) {
        try {
            if (provider === authProvider.GOOGLE) {
                // Generate the redirect URI dynamically (handles Expo Go vs Prod)
                const redirectUri = makeRedirectUri({
                    scheme: 'sheild',
                    path: 'oauth/success'
                });
                console.log("AuthService:::login:::: Generated Redirect URI:", redirectUri);

                // Get the login URL from backend, PASSING the redirect URI
                const { url } = await this._getGoogleLoginURL(redirectUri);

                // Open the browser session
                const result = await WebBrowser.openAuthSessionAsync(url, redirectUri);

                if (result.type !== 'success' || !result.url) {
                    throw new Error('OAuth was cancelled or failed');
                }

                // ... (rest of parsing logic remains same)

                // Parse the URL to get secret and userId
                // URL format: sheild://oauth/success?secret=...&userId=...
                const matchSecret = result.url.match(/secret=([^&]+)/);
                const matchUserId = result.url.match(/userId=([^&]+)/);

                const secret = matchSecret ? matchSecret[1] : null;
                const userId = matchUserId ? matchUserId[1] : null;

                if (!secret || !userId) {
                    throw new Error('Failed to parse secret or userId from callback URL');
                }

                // Create the session in Appwrite (Client side)
                await this._createSession(userId, secret);

                // Now get the JWT
                const jwt = await account.createJWT();

                // Verify with backend
                const jwtFromBackend = await this._verifyJWTAndGetNewJWT(jwt.jwt, redirectUri);

                if (!jwtFromBackend) {
                    throw new Error("Failed to get JWT from Backend");
                }

                // encode the jwt
                const encodeData = utils.commonFunction.encodeBase64(jwtFromBackend);

                // save the jwt in local storage
                await AsyncStorage.setItem(utils.appConstant.SESSION_DATA_KEY_FOR_LOCAL_STORAGE, encodeData);

                return jwtFromBackend;
            }
        } catch (error) {
            console.error("Login Error:", error);
            throw error;
        }
    }

    // ... private methods ...

    private async _getGoogleLoginURL(redirectUri: string): Promise<{ url: string }> {
        try {
            const baseUrl = this._getBackendBaseUrl(redirectUri);
            const url = `${baseUrl}/v1/auth/googleLogin`;
            console.log("Fetching Google Login URL from:", url);

            // Send redirectUri to backend
            const result = await axios.get(url, {
                params: {
                    redirectUri: redirectUri
                }
            });
            return result.data;
        } catch (error) {
            console.error("Google Login URL Error:", error);
            throw error;
        }
    }

    private async _verifyJWTAndGetNewJWT(jwtFromAppwrite: string, redirectUri?: string): Promise<IJWTResponse> {
        try {
            const baseUrl = this._getBackendBaseUrl(redirectUri);
            const encodedJWT = encodeURIComponent(jwtFromAppwrite);
            const url = `${baseUrl}/v1/auth/jwtVerify/${encodedJWT}`;
            const result = await axios.post(url);
            const jwtResponse = result.data as IJWTResponse;

            if (!jwtResponse?.accessToken || !jwtResponse?.refreshToken) {
                throw new Error("Invalid JWT response from backend");
            }

            return jwtResponse;
        } catch (error) {
            console.error("JWT Verify Error:", error);
            throw error;
        }
    }

    private async _createSession(userId: string, secret: string): Promise<void> {
        try {
            await account.createSession(userId, secret);
        } catch (error: any) {
            const message = error?.message || "";
            if (typeof message === "string" && message.includes("session is active")) {
                await account.deleteSession("current");
                await account.createSession(userId, secret);
                return;
            }
            throw error;
        }
    }

    private _getBackendBaseUrl(redirectUri?: string): string {
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
}

export default new AuthService();
