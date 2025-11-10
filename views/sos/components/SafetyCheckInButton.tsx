// components/sos/SafetyCheckInButton.tsx
import { TouchableOpacity, Text } from "react-native";
import React from "react";
import Colors from "@/utils/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View } from "@/components/Themed";

interface SafetyCheckInButtonProps {
  onPress: () => void;
}

export default function SafetyCheckInButton({ onPress }: SafetyCheckInButtonProps) {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  return (
    <View 
    style={{
      borderRadius:theme.borderRadius,
      shadowColor: theme.shadowColor,
      shadowOffset: theme.shadowOffset,
      shadowOpacity: theme.shadowOpacity,
      shadowRadius: theme.shadowRadius,
      elevation: theme.elevation,
    }}
    >

      <TouchableOpacity
        onPress={onPress}
        className="flex-row items-center justify-center p-3 "
        style={{ backgroundColor: theme.success, borderRadius: theme.borderRadius }}
      >
        <MaterialCommunityIcons name="check-circle-outline" size={24} color={theme.background} />
        <Text className="ml-2 text-base font-semibold" style={{ color: theme.background }}>
          I'm Safe - Notify Contacts
        </Text>
      </TouchableOpacity>
    </View>
  );
}