// components/sos/SafetyCheckInButton.tsx
import { TouchableOpacity, Text } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface SafetyCheckInButtonProps {
  onPress: () => void;
}

export default function SafetyCheckInButton({ onPress }: SafetyCheckInButtonProps) {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center justify-center p-3 rounded-lg"
      style={{ backgroundColor: theme.success }}
    >
      <MaterialCommunityIcons name="check-circle-outline" size={24} color={theme.background} />
      <Text className="ml-2 text-base font-semibold" style={{ color: theme.background }}>
        I'm Safe - Notify Contacts
      </Text>
    </TouchableOpacity>
  );
}