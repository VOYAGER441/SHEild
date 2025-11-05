// components/sos/LocationSharingStatus.tsx
import { View, Text } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface LocationSharingStatusProps {
  isActive: boolean;
  contactsCount: number;
}

export default function LocationSharingStatus({ isActive, contactsCount }: LocationSharingStatusProps) {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  return (
    <View
      className="flex-row items-center p-3 rounded-lg"
      style={{ backgroundColor: theme.card }}
    >
      <MaterialCommunityIcons
        name={isActive ? "map-marker-radius" : "map-marker-off"}
        size={24}
        color={isActive ? theme.success : theme.alert}
      />
      <View className="ml-3">
        <Text className="text-base font-semibold" style={{ color: theme.text }}>
          Location Sharing: {isActive ? "ACTIVE" : "INACTIVE"}
        </Text>
        {isActive && (
          <Text className="text-sm" style={{ color: theme.textSecondary }}>
            With {contactsCount} contacts
          </Text>
        )}
      </View>
    </View>
  );
}