// components/sos/LocationSharingStatus.tsx
import { View, Text } from "react-native";
import React from "react";
import Colors from "@/utils/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import utils from "@/utils";

interface LocationSharingStatusProps {
  isActive: boolean;
  contactsCount: number;
}

export default function LocationSharingStatus({ isActive, contactsCount }: LocationSharingStatusProps) {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  return (
    <View
      className="flex-row items-center p-3 rounded-lg "
      style={{
        marginTop:10,
        backgroundColor: theme.card,
        borderRadius: theme.borderRadius,
        shadowColor: theme.shadowColor,
        shadowOffset: theme.shadowOffset,
        shadowOpacity: theme.shadowOpacity,
        shadowRadius: theme.shadowRadius,
        elevation: theme.elevation,
        paddingHorizontal:20,
      }}
    >
      <MaterialCommunityIcons
        name={isActive ? "map-marker-radius" : "map-marker-off"}
        size={24}
        color={isActive ? theme.success : theme.alert}
      />
      <View className="ml-3 px-3">
        <Text className="text-base font-semibold" style={{ color: theme.text }}>
          Location Sharing: {isActive ? "ACTIVE" : "INACTIVE"}
        </Text>
        {isActive && (
          <Text className="text-sm" style={{ color: utils.commonFunction.default.adjustColorBrightness(theme.text, 0.2) }}>
            With {contactsCount} contacts
          </Text>
        )}
      </View>
    </View>
  );
}