import { View, Text, ActivityIndicator } from "react-native";
import { useEffect } from "react";
import * as Linking from "expo-linking";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RelativePathString, useRouter } from "expo-router";
import { ElegantLoadingScreen } from "@/views/global.Components/Loadingscreens";

const LOADING_DELAY_MS = 1500;

export default function OAuthSuccessScreen() {
    const router = useRouter();

    useEffect(() => {
        const handleOAuthSuccess = async () => {
            const url = await Linking.getInitialURL();
            if (!url) return;

            const { queryParams } = Linking.parse(url);

            const accessToken = queryParams?.accessToken as string | undefined;
            const refreshToken = queryParams?.refreshToken as string | undefined;

            if (!accessToken || !refreshToken) {
                // <ElegantLoadingScreen
                //     message="Authenticating..."
                //     submessage="One moment"
                // />
                await new Promise((resolve) => setTimeout(resolve, LOADING_DELAY_MS));

                router.replace("/oauth/failure" as RelativePathString);
                return;
            }

            await AsyncStorage.multiSet([
                ["accessToken", accessToken],
                ["refreshToken", refreshToken],
            ]);

            // Navigate to main app
            router.replace("/(tabs)" as RelativePathString);
        };

        handleOAuthSuccess();
    }, []);

    return (
        <View className="flex-1 items-center justify-center bg-white px-6">
            <ActivityIndicator size="large" />
            <Text className="mt-4 text-base text-gray-600 text-center">
                Signing you in securely…
            </Text>
        </View>
    );
}
