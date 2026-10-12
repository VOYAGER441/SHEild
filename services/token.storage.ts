import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import utils from "@/utils";
import { IJWTResponse } from "@/interface/response/auth.response";

// Encrypted-at-rest storage for the backend JWT pair. SecureStore (Keychain /
// Keystore) on native; AsyncStorage is the only option on web, where the app is
// not the primary auth target.
const SESSION_SECURE_KEY = "sheild.session.v1";
const LEGACY_SESSION_KEY = utils.appConstant.SESSION_DATA_KEY_FOR_LOCAL_STORAGE;

const secureStoreAvailable = Platform.OS !== "web";

export async function saveSession(session: IJWTResponse): Promise<void> {
    const raw = JSON.stringify(session);
    if (secureStoreAvailable) {
        await SecureStore.setItemAsync(SESSION_SECURE_KEY, raw, {
            keychainAccessible: SecureStore.AFTER_FIRST_UNLOCK,
        });
        // Drop any pre-migration copy so only one source of truth remains.
        await AsyncStorage.removeItem(LEGACY_SESSION_KEY);
    } else {
        await AsyncStorage.setItem(SESSION_SECURE_KEY, raw);
    }
}

export async function loadSession(): Promise<IJWTResponse | null> {
    try {
        let raw: string | null = null;
        if (secureStoreAvailable) {
            raw = await SecureStore.getItemAsync(SESSION_SECURE_KEY);
        } else {
            raw = await AsyncStorage.getItem(SESSION_SECURE_KEY);
        }

        if (!raw) {
            return await migrateLegacySession();
        }

        const session = JSON.parse(raw) as IJWTResponse;
        return session?.accessToken ? session : null;
    } catch (error) {
        console.warn("TokenStorage:::loadSession:::: failed to read session:", error);
        return null;
    }
}

// Sessions written by earlier builds lived in AsyncStorage as base64 JSON.
// Read once and move them into secure storage so existing logins survive.
async function migrateLegacySession(): Promise<IJWTResponse | null> {
    try {
        const legacy = await AsyncStorage.getItem(LEGACY_SESSION_KEY);
        if (!legacy) return null;

        const session = JSON.parse(utils.commonFunction.decodeBase64(legacy)) as IJWTResponse;
        if (!session?.accessToken) return null;

        await saveSession(session);
        console.log("TokenStorage:::migrateLegacySession:::: migrated legacy session to secure storage");
        return session;
    } catch {
        return null;
    }
}

export async function clearSession(): Promise<void> {
    if (secureStoreAvailable) {
        await SecureStore.deleteItemAsync(SESSION_SECURE_KEY);
    } else {
        await AsyncStorage.removeItem(SESSION_SECURE_KEY);
    }
    await AsyncStorage.removeItem(LEGACY_SESSION_KEY);
}
