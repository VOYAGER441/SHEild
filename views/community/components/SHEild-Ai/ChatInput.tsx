import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { Input, InputField } from "@/components/ui/input";
import Colors from "@/constants/Colors";
import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { useColorScheme } from "@/components/useColorScheme";

export const ChatInput = ({ onSend, isLoading }: { onSend: (text: string) => void, isLoading: boolean }) => {
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme ?? `light`];
    const [text, setText] = useState("");

    const handleSend = () => {
        if (text.trim().length > 0) {
            onSend(text);
            setText("");
        }
    };

    return (
        <Box style={{
            marginBottom: 20,
            marginHorizontal: 10,
            backgroundColor: theme.card,
            borderRadius: theme.borderRadius,
            shadowColor: theme.shadowColor,
            shadowOffset: theme.shadowOffset,
            shadowOpacity: theme.shadowOpacity,
            shadowRadius: theme.shadowRadius,
            elevation: theme.elevation,
        }}>
            <HStack className="items-center border-t border-gray-200 bg-[#F9F9F9]">
                <Input className="flex-1 rounded-full bg-white px-4 py-2 border border-gray-200">
                    <Box
                        style={{
                            backgroundColor: theme.card,
                            borderRadius: theme.borderRadius,
                            shadowColor: theme.shadowColor,
                            shadowOffset: theme.shadowOffset,
                            shadowOpacity: theme.shadowOpacity,
                            shadowRadius: theme.shadowRadius,
                            elevation: theme.elevation,
                        }
                        }>

                        <Feather name="plus" size={24} color="black" />
                    </Box>
                    <InputField
                        placeholder="Ask anything..."
                        placeholderTextColor="#9CA3AF"
                        value={text}
                        onChangeText={setText}
                        onSubmitEditing={handleSend}
                        returnKeyType="send"
                    />
                    <TouchableOpacity onPress={handleSend} disabled={isLoading}>
                        <Box
                            style={{
                                backgroundColor: theme.card,
                                borderRadius: theme.borderRadius,
                                shadowColor: theme.shadowColor,
                                shadowOffset: theme.shadowOffset,
                                shadowOpacity: theme.shadowOpacity,
                                shadowRadius: theme.shadowRadius,
                                elevation: theme.elevation,
                            }
                            }>

                            <Feather name="send" size={24} color="black" />
                        </Box>
                    </TouchableOpacity>
                </Input>
            </HStack>
        </Box>
    );
};
