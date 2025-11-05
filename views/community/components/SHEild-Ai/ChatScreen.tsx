import React, { useState } from "react";
import {
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    View,
    TouchableOpacity,
} from "react-native";
import { Box } from "@/components/ui/box";
import { MessageBubble } from "./MessageBubble";
import { SuggestChat } from "./ChatButtons";
import { ChatInput } from "./ChatInput";
import { Stack } from "expo-router";
import { IMessage } from "@/interface/request/shield/sheild.interface";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";



export default function ChatScreen() {
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme ?? `light`];
    const router = useRouter();

    const [messages, setMessages] = useState<IMessage[]>([]);
    const [loading, setLoading] = useState(false);

    const handleSend = (text: string) => {
        setMessages((prev) => [...prev, { text, isUser: true }]);
        setLoading(true);
        // Simulate AI typing
        setTimeout(() => {
            setMessages((prev) => [
                ...prev,
                { text: "Got it! Let me help you with that.", isUser: false },
            ]);
            setLoading(false);
        }, 3000);
    };

    return (
        <Box className="flex-1">
            <Stack.Screen
                options={{
                    headerShown: true,
                    headerTitle: "Sheild AI",
                    headerTitleAlign: "center",
                    headerTitleStyle: { color: theme.textSecondary },
                    headerStyle: { backgroundColor: theme.tint },
                    headerBackVisible: false,
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => router.back()}>
                            <Feather name="arrow-left-circle" size={24} color={theme.textSecondary} />
                        </TouchableOpacity>
                    ),
                }}
            />

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : undefined}
                className="flex-1"
            >
                {messages.length === 0 ? (
                    <Box className="flex-1 items-center justify-center">
                        {/* <Ionicons name="cloud-offline-outline" size={24} color="black" /> */}
                        
                        <SuggestChat />
                    </Box>
                ) : (
                    <ScrollView
                        contentContainerStyle={{
                            padding: 16,
                            paddingBottom: 80, // room for input
                        }}
                        showsVerticalScrollIndicator={false}
                    >
                        {messages.map((m, i) => (
                            <View key={i} style={{ marginBottom: 10 }}>
                                <MessageBubble text={m.text} isUser={m.isUser} isLoading={false} />
                            </View>
                        ))}
                        {loading && (
                            <View style={{ marginBottom: 10 }}>
                                <MessageBubble text="" isUser={false} isLoading={true} />
                            </View>
                        )}
                    </ScrollView>
                )}

                <ChatInput onSend={handleSend} isLoading={loading} />
            </KeyboardAvoidingView>
        </Box>
    );
}
