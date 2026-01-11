import { authProvider } from "@/utils/constants/appConstant";
import { account } from "./appwrite.service";
import { OAuthProvider } from "react-native-appwrite";
import axios from "axios";
import utils from "@/utils";
import { IJWTResponse } from "@/interface/response/auth.response";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { makeRedirectUri } from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";

class AuthService {
    // public methods
    // ###############################################################

    // login function
    async login(provider: authProvider) {
        // login with auth provider
        const jwtFromAppwrite = await this._login(provider);

        if (!jwtFromAppwrite) {
            throw new Error("Failed to get JWT from Appwrite");
        }
        // send the jwt to backend
        const jwtFromBackend = await this._verifyJWTAndGetNewJWT(jwtFromAppwrite);

        if (!jwtFromBackend) {
            throw new Error("Failed to get JWT from Backend");
        }

        // encode the jwt
        const encodeData = utils.commonFunction.encodeBase64(jwtFromBackend);

        // save the jwt in local storage
        AsyncStorage.setItem(utils.appConstant.SESSION_DATA_KEY_FOR_LOCAL_STORAGE, encodeData);
    }


    // logout function
    async logout() {
        try {
            await account.deleteSession('current');
        } catch (error) {
            console.error("Logout Error:", error);
            throw error;
        }
    }

    // private methods
    // ###############################################################
    // login with auth provider
    private async _login(provider: authProvider) {
        if (provider === authProvider.GOOGLE) {
            const jwtFromAppwrite = await this._OauthWithGoogle();
            return jwtFromAppwrite;
        }
        else if (provider === authProvider.FACEBOOK) {
            // FIXIT : need to implement
        }
        else if (provider === authProvider.APPLE) {
            // FIXIT : need to implement
        }
        else if (provider === authProvider.LINKEDIN) {
            // FIXIT : need to implement
        }
        else {
            throw new Error("Invalid provider");
        }
    }

    // send the id to back

    private async _OauthWithGoogle(): Promise<string> {
        // Use makeRedirectUri for proper redirect URL generation
        const redirectUri = makeRedirectUri({
            scheme: 'sheild',
            path: '/(tabs)'
        });
        console.log("Generated Redirect URI:", redirectUri);

        try {

            // Build the OAuth URL manually using Appwrite endpoint
            const endpoint = utils.env.EXPO_PUBLIC_APPWRITE_ENDPOINT;
            const projectId = utils.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID;

            // Construct the OAuth URL
            const oauthUrl = `${endpoint}/account/sessions/oauth2/${OAuthProvider.Google}`
                + `?project=${projectId}`
                + `&success=${encodeURIComponent(redirectUri)}`
                + `&failure=${encodeURIComponent(redirectUri)}`;

            console.log("Opening OAuth URL:", oauthUrl);

            // Open the OAuth URL in browser and wait for callback
            const result = await WebBrowser.openAuthSessionAsync(
                oauthUrl,
                redirectUri
            );

            console.log("OAuth result:", result);



            // Check if the OAuth was successful
            if (result.type !== 'success') {
                throw new Error('OAuth was cancelled or failed');
            }

            // The session should now be established in Appwrite
            // Wait a moment for the session to be fully established
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Now create and return the JWT token
            const jwt = await account.createJWT();
            console.log("JWT:", jwt);
            return jwt.jwt;
        } catch (error) {
            console.error("Google OAuth Error:", error);
            throw error;
        }
    }

    private async _verifyJWTAndGetNewJWT(jwtFromAppwrite: string): Promise<IJWTResponse> {
        const result = await axios.post<IJWTResponse>(`${utils.env.BACKEND_BASE_URL}/v1/auth/jwtVerify/${jwtFromAppwrite}`);
        return result.data;
    }
}

export default new AuthService();
