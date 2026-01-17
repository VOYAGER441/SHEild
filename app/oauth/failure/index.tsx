import { View, Text, TouchableOpacity } from "react-native";
import * as Linking from "expo-linking";
import { useMemo } from "react";
import { RelativePathString, useRouter } from "expo-router";

export default function OAuthFailureScreen() {
    const router = useRouter();

    const errorMessage = useMemo(() => {
        const url = Linking.useURL();
        if (!url) return "Authentication failed.";

        const { queryParams } = Linking.parse(url);
        return (queryParams?.error as string) || "Authentication failed.";
    }, []);

    return (
        <View className="flex-1 items-center justify-center bg-white px-6">
            <Text className="text-xl font-semibold text-red-600">
                Login Failed
            </Text>

            <Text className="mt-3 text-center text-gray-600">
                {errorMessage}
            </Text>

            <TouchableOpacity
                onPress={() => router.replace("/login" as RelativePathString)}
                className="mt-6 rounded-xl bg-black px-6 py-3"
            >
                <Text className="text-white font-medium">
                    Try Again
                </Text>
            </TouchableOpacity>
        </View>
    );
}
