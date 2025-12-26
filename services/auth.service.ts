import { authProvider } from "@/utils/constants/appConstant";
import { account } from "./appwrite.service";
import { OAuthProvider } from "appwrite";
import axios from "axios";
import utils from "@/utils";
import { IJWTResponse } from "@/interface/response/auth.response";
import AsyncStorage from "@react-native-async-storage/async-storage";


class AuthService {
    // public methods
    // ###############################################################

    // login function
    async login(provider: authProvider) {
        const jwtFromAppwrite = await this._login(provider);

        if (!jwtFromAppwrite) {
            throw new Error("Failed to get JWT from Appwrite");
        }
        // send the jwt to backend
        const jwtFromBackend = await this._verifyJWTAndGetNewJWT(jwtFromAppwrite);

        if (!jwtFromBackend) {
            throw new Error("Failed to get JWT from Backend");
        }

        const encodeData = utils.commonFunction.encodeBase64(jwtFromBackend);

        AsyncStorage.setItem(utils.appConstant.SESSION_DATA_KEY_FOR_LOCAL_STORAGE, encodeData)


    }


    // logout function
    async logout() {

    }

    // private methods
    // ###############################################################
    // login with auth provider
    private async _login(provider: authProvider) {
        if (provider === authProvider.GOOGLE) {
            return await this._OauthWithGoogle();
        }
        else if (provider === authProvider.FACEBOOK) {

        }
        else if (provider === authProvider.APPLE) {

        }
        else if (provider === authProvider.LINKEDIN) {

        }
        else {
            throw new Error("Invalid provider");
        }
    }

    // send the id to back

    private async _OauthWithGoogle() {
        const redirectUri = "myapp://index";
        account.createOAuth2Session(OAuthProvider.Google, redirectUri, redirectUri);
        const jwt = await account.createJWT();
        return jwt.jwt;
    }

    private async _verifyJWTAndGetNewJWT(jwtFromAppwrite: string): Promise<IJWTResponse> {
        const result = await axios.post<IJWTResponse>(`${utils.env.BACKEND_BASE_URL}/v1/auth/jwtVerify/${jwtFromAppwrite}`);
        return result.data;
    }

}

export default new AuthService();