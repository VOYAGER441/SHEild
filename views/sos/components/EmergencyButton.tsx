// components/sos/EmergencyButton.tsx
import { TouchableOpacity, Text } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";

interface EmergencyButtonProps {
  onPress: () => void;
}

export default function EmergencyButton({ onPress }: EmergencyButtonProps) {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  return (
    <TouchableOpacity
      onPress={onPress}
      className="w-40 h-40 rounded-full items-center justify-center shadow-lg"
      style={{ backgroundColor: theme.tint, borderColor: theme.text, borderWidth: 2 }} // Using tint for SOS color
    >
      <Text className="text-white text-4xl font-bold">SOS</Text>
    </TouchableOpacity>
  );
}