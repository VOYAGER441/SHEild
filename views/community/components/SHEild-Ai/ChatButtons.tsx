import React from "react";
import { HStack } from "@/components/ui/hstack";
import { Button, ButtonText } from "@/components/ui/button";
import { Box } from "@/components/ui/box";
import { Image, View } from "react-native";
import { Text } from "@/components/ui/text";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import Feather from '@expo/vector-icons/Feather';
import { VStack } from "@/components/ui/vstack";

export const SuggestChat = () => {
    const topQuery = [
        "Safety tips for traveling alone",
        "My rights if someone harasses me",
        "Emergency helplines for women in India",
    ];


    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme ?? `light`];

    return (
        <Box
            style={{
                width: "90%",
                alignItems: "center",
                backgroundColor: theme.card,
                borderRadius: theme.borderRadius,
                shadowColor: theme.shadowColor,
                shadowOffset: theme.shadowOffset,
                shadowOpacity: theme.shadowOpacity,
                shadowRadius: theme.shadowRadius,
                elevation: theme.elevation,
                padding: 20,

            }}
        >
            <Box style={{ alignItems: "center", display: "flex", flexDirection: "column", justifyContent: "center", marginBottom: 10 }}>
                <View style={{ alignItems: "center", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                    <Image
                        source={require("@/assets/images/SHEild-Ai.png")}
                        style={{ width: 150, height: 150, marginBottom: -20, marginTop: -20 }}
                    />
                    <Text className="text-clip font-bold" style={{ color: theme.text }}>Welcome to SHEild AI</Text>
                    <Text className="text-clip font-bold" style={{ color: theme.text }}>SHEild AI — your personal Safety Ally</Text>

                </View>
            </Box>
            <HStack
                className="flex-wrap justify-center gap-3"
                style={{
                    flexWrap: "wrap",
                    justifyContent: "center",
                }}
            >
                {topQuery.map((b) => (
                    <Button
                        key={b}
                        size="sm"
                        variant="outline"
                        className="rounded-full px-4 py-1"
                        style={{
                            borderColor: theme.tint,
                        }}
                    >
                        <ButtonText className="text-sm" style={{ color: theme.text }}>{b}</ButtonText>
                    </Button>
                ))}
            </HStack>
            <Box className="flex-row items-center justify-center px-6" style={{ marginTop: 10 }}>
                <Feather name="lock" size={16} color={theme.tabIconDefault} />
                <Text className="text-xs" style={{ color: theme.text,textAlign: "left",marginLeft: 10 }}>
                   Chats aren’t stored to protect your privacy.
                </Text>
            </Box>

        </Box>
    );
};
