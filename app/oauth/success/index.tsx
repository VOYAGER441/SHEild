import { View, Text, ActivityIndicator } from "react-native";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RelativePathString, useLocalSearchParams, useRouter } from "expo-router";
import utils from "@/utils";
import { exchangeOAuthCodeOnce } from "@/services/auth.service";

// The exchange code is single-use. Once this screen has attempted it - or
// services/auth.service.ts already consumed it - there is nothing left to do.
let claimed = false;

export default function OAuthSuccessScreen() {
    const router = useRouter();
    const { code, error } = useLocalSearchParams<{ code?: string; error?: string }>();

    useEffect(() => {
        let active = true;
        let pendingTimeout: ReturnType<typeof setTimeout> | undefined;

        const handleOAuthCallback = async () => {
            if (error) {
                if (active) router.replace("/oauth/failure" as RelativePathString);
                return;
            }

            if (!code) {
                // Benign loading screen: no timer, no automatic redirect.
                return;
            }

            if (claimed) return;
            claimed = true;

            try {
                const nonce = await AsyncStorage.getItem(
                    utils.appConstant.OAUTH_NONCE_KEY_FOR_LOCAL_STORAGE
                );

                // No nonce left means the in-app browser flow already finished
                // the exchange, so this screen must do nothing.
                if (!nonce) return;

                // Shares the single request with the browser flow: the one-time
                // code can only be spent once, so a second POST here would be
                // rejected as "Sign-in code is invalid or has expired".
                const jwtFromBackend = await exchangeOAuthCodeOnce(code, nonce);

                if (!jwtFromBackend?.accessToken || !jwtFromBackend?.refreshToken) {
                    throw new Error("Invalid JWT response from backend");
                }

                await AsyncStorage.removeItem(
                    utils.appConstant.OAUTH_NONCE_KEY_FOR_LOCAL_STORAGE
                );

                // Persist under the same key/shape the auth gate in app/index.tsx reads.
                await AsyncStorage.setItem(
                    utils.appConstant.SESSION_DATA_KEY_FOR_LOCAL_STORAGE,
                    utils.commonFunction.encodeBase64(jwtFromBackend)
                );

                if (active) router.replace("/(tabs)" as RelativePathString);
            } catch (exchangeError) {
                // The code may already have been consumed by the in-app browser
                // flow. Swallow it and stay on the loading screen so a successful
                // login is never yanked back to the failure screen.
                console.warn("OAuth exchange skipped:", exchangeError);
            }
        };

        handleOAuthCallback();

        return () => {
            active = false;
            if (pendingTimeout !== undefined) {
                clearTimeout(pendingTimeout);
            }
        };
    }, [code, error, router]);

    return (
        <View className="flex-1 items-center justify-center bg-white px-6">
            <ActivityIndicator size="large" />
            <Text className="mt-4 text-base text-gray-600 text-center">
                Signing you in securely…
            </Text>
        </View>
    );
}
