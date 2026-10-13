import { View, Text, ActivityIndicator } from "react-native";
import { useEffect } from "react";
import { RelativePathString, useLocalSearchParams, useRouter } from "expo-router";
import authService from "@/services/auth.service";

// Deep-link target of the browser OAuth fallback: the backend bridge page
// (GET /v1/auth/google/callback) forwards the Google id_token here. When the
// app was foregrounded by openAuthSessionAsync the exchange may already be
// in flight - authService.completeBrowserLogin dedupes by id_token.
export default function OAuthCallbackScreen() {
    const router = useRouter();
    const { id_token: idToken, error } = useLocalSearchParams<{ id_token?: string; error?: string }>();

    useEffect(() => {
        let active = true;

        const handleCallback = async () => {
            if (error) {
                console.warn("OAuth callback error:", error);
                if (active) router.replace("/login" as RelativePathString);
                return;
            }

            if (!idToken) {
                if (active) router.replace("/login" as RelativePathString);
                return;
            }

            try {
                await authService.completeBrowserLogin(String(idToken));
                if (active) router.replace("/(tabs)" as RelativePathString);
            } catch (exchangeError) {
                console.warn("OAuth callback exchange failed:", exchangeError);
                if (active) router.replace("/login" as RelativePathString);
            }
        };

        handleCallback();

        return () => {
            active = false;
        };
    }, [idToken, error, router]);

    return (
        <View className="flex-1 items-center justify-center bg-white px-6">
            <ActivityIndicator size="large" />
            <Text className="mt-4 text-base text-gray-600 text-center">
                Signing you in securely…
            </Text>
        </View>
    );
}
