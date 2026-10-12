import { Platform } from "react-native";
import utils from "@/utils";

// Priority: explicit EXPO_PUBLIC_BACKEND_BASE_URL -> derive http://<host>:5000
// from the Expo development host when no explicit URL is configured -> clear error.
export function getBackendBaseUrl(): string {
    let baseUrl = utils.env.BACKEND_BASE_URL || "";

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
