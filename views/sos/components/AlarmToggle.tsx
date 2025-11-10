// components/sos/AlarmToggle.tsx
import { TouchableOpacity, Text, View } from "react-native";
import React, { useState } from "react";
import Colors from "@/utils/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface AlarmToggleProps {
  onToggle: (isActive: boolean) => void;
  initialState?: boolean;
}

export default function AlarmToggle({ onToggle, initialState = false }: AlarmToggleProps) {
  const [isAlarmActive, setIsAlarmActive] = useState(initialState);
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  const handleToggle = () => {
    const newState = !isAlarmActive;
    setIsAlarmActive(newState);
    onToggle(newState);
  };

  return (
    <View
      style={{
        padding: 10,
        backgroundColor: theme.card,
        borderRadius: theme.borderRadius,
        shadowColor: theme.shadowColor,
        shadowOffset: theme.shadowOffset,
        shadowOpacity: theme.shadowOpacity,
        shadowRadius: theme.shadowRadius,
        elevation: theme.elevation,
      }}
    >
      <TouchableOpacity
        onPress={handleToggle}
        className="flex-row items-center justify-center p-3 rounded-lg"
        style={{ backgroundColor: isAlarmActive ? theme.alert : theme.tabIconDefault, borderRadius: theme.borderRadius }}
      >
        <MaterialCommunityIcons
          name={isAlarmActive ? "bell-off" : "bell"}
          size={24}
          color={isAlarmActive ? theme.background : theme.text}
        />
        <Text className="ml-2 text-base font-semibold" style={{ color: isAlarmActive ? theme.background : theme.text }}>
          {isAlarmActive ? "Deactivate Alarm" : "Activate Alarm"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}