import { TurboModuleRegistry } from "react-native";
import utils from "@/utils";

type GoogleSigninModule = typeof import("@react-native-google-signin/google-signin");

/**
 * The package runs TurboModuleRegistry.getEnforcing('RNGoogleSignin') while it
 * is being imported, which throws a red Invariant Violation in Expo Go. Probe
 * with the non-enforcing get() first so a missing module is a quiet, expected
 * case instead of an error.
 */
export function getGoogleSignin(): GoogleSigninModule | null {
    if (!TurboModuleRegistry.get("RNGoogleSignin")) {
        return null;
    }

    const module = require("@react-native-google-signin/google-signin") as GoogleSigninModule;
    return module?.GoogleSignin ? module : null;
}

/**
 * Configures the native Google Sign-In SDK once at app startup (called from the
 * root layout). `webClientId` is required: it is the audience baked into the
 * ID token that the backend verifies. `offlineAccess` requests a refresh token
 * for server-side token exchange flows.
 */
export function configureGoogleSignIn(): void {
    const googleSignin = getGoogleSignin();
    if (!googleSignin) {
        console.warn(
            "GoogleSignin:::: 'RNGoogleSignin' native module is not in this build. " +
            "Use a development build (npx expo prebuild / eas build), not Expo Go."
        );
        return;
    }

    const webClientId = utils.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID;
    if (!webClientId) {
        console.warn("GoogleSignin:::: EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID is not set in .env");
        return;
    }

    const iosClientId = utils.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID;
    googleSignin.GoogleSignin.configure({
        webClientId,
        ...(iosClientId ? { iosClientId } : {}),
        offlineAccess: true,
    });
}
