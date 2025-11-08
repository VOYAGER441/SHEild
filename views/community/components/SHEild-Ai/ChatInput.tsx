import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { Input, InputField } from "@/components/ui/input";
import Colors from "@/utils/constants/Colors";
import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { useColorScheme } from "@/components/useColorScheme";
import {
    Actionsheet,
    ActionsheetBackdrop,
    ActionsheetContent,
    ActionsheetDragIndicator,
    ActionsheetDragIndicatorWrapper,
    ActionsheetItem,
    ActionsheetItemText
} from "@/components/ui/actionsheet";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


export const ChatInput = ({
    onSend,
    isLoading,
}: {
    onSend: (text: string, mode: "deep" | "fast") => void;
    isLoading: boolean;
}) => {
    const [text, setText] = useState("");
    const [showActionsheet, setShowActionsheet] = useState(false);
    const [aiMode, setAiMode] = useState<"deep" | "fast">("fast");

    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme ?? "light"];

    const handleSend = () => {
        if (text.trim().length > 0) {
            onSend(text, aiMode);
            setText("");
        }
    };

    const handleClose = () => setShowActionsheet(false);

    const handleThinkingMode = (mode: "deep" | "fast") => {
        setAiMode(mode);
        handleClose();
    };

    return (
        <View style={{backgroundColor: "transparent"}}>
            <Box
                style={{
                    marginBottom: 20,
                    marginHorizontal: 10,
                    backgroundColor: theme.card,
                    borderRadius: theme.borderRadius,
                    shadowColor: theme.shadowColor,
                    shadowOffset: theme.shadowOffset,
                    shadowOpacity: theme.shadowOpacity,
                    shadowRadius: theme.shadowRadius,
                    elevation: theme.elevation,
                }}
            >
                <HStack className="items-center">
                    <Input
                        className="flex-1 px-4 py-2"
                        style={{
                            height: 50,
                            borderRadius: theme.borderRadius
                        }}
                    >
                        <Box
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                marginRight: 8,
                            }}
                        >
                            <TouchableOpacity
                                onPress={() => setShowActionsheet(true)}
                                style={{
                                    flexDirection: "column",
                                    alignItems: "center",
                                }}
                            >
                                <Feather name="plus" size={22} color={theme.alert} />
                                <Text
                                    style={{
                                        color: theme.tint,
                                        fontSize: 9,
                                        marginTop: 2,
                                        textTransform: "capitalize",
                                    }}
                                >
                                    {aiMode.replace("-", " ")}
                                </Text>
                            </TouchableOpacity>
                        </Box>

                        <InputField
                            placeholder=" Ask anything..."
                            placeholderTextColor={theme.textSecondary}
                            value={text}
                            onChangeText={setText}
                            onSubmitEditing={handleSend}
                            returnKeyType="send"
                            style={{
                                backgroundColor: theme.background,
                                // marginHorizontal:5

                            }}
                        />

                        <TouchableOpacity onPress={handleSend} disabled={isLoading} style={{ marginLeft: 5 }}>
                            {isLoading ? (
                               <MaterialCommunityIcons name="record-circle-outline" size={22} color={theme.alert} />
                            ) : (
                                <Feather
                                    name="send"
                                    size={22}
                                    // color={isLoading ? theme.textSecondary : theme.alert}
                                    color={theme.alert}
                                />
                            )}
                        </TouchableOpacity>
                    </Input>
                </HStack>
            </Box>

            {/* ActionSheet for AI mode selection */}
            <Actionsheet isOpen={showActionsheet} onClose={handleClose}>
                <ActionsheetBackdrop />
                <ActionsheetContent>
                    <ActionsheetDragIndicatorWrapper>
                        <ActionsheetDragIndicator />
                    </ActionsheetDragIndicatorWrapper>

                    <ActionsheetItem onPress={() => handleThinkingMode("deep")}>
                        <ActionsheetItemText
                            style={{
                                fontWeight: aiMode === "deep" ? "bold" : "normal",
                                color: aiMode === "deep" ? theme.alert : theme.text,
                            }}
                        >
                            Reasoning (Deep)
                        </ActionsheetItemText>
                    </ActionsheetItem>

                    <ActionsheetItem onPress={() => handleThinkingMode("fast")}>
                        <ActionsheetItemText
                            style={{
                                fontWeight: aiMode === "fast" ? "bold" : "normal",
                                color: aiMode === "fast" ? theme.alert : theme.text,
                            }}
                        >
                            Non-Reasoning (Fast)
                        </ActionsheetItemText>
                    </ActionsheetItem>

                    <ActionsheetItem onPress={handleClose}>
                        <ActionsheetItemText>Cancel</ActionsheetItemText>
                    </ActionsheetItem>
                </ActionsheetContent>
            </Actionsheet>
        </View>
    );
};