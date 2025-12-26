// components/sos/SafetyTipsSection.tsx
import { View, Text, TouchableOpacity, LayoutAnimation, Platform, UIManager } from "react-native";
import React, { useState } from "react";
import Colors from "@/utils/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import utils from "@/utils";



const safetyTips = [
  "Stay calm and assess the situation.",
  "Make eye contact with potential threats.",
  "Know your surroundings and exit routes.",
  "Trust your instincts and avoid risky situations.",
  "If in danger, shout for help loudly.",
  "Consider self-defense classes.",
];

export default function SafetyTipsSection() {
  const [isExpanded, setIsExpanded] = useState(false);
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsExpanded(!isExpanded);
  };

  return (
    <View className="w-full"
      style={{
        borderRadius: theme.borderRadius,
        shadowColor: theme.shadowColor,
        shadowOffset: theme.shadowOffset,
        shadowOpacity: theme.shadowOpacity,
        shadowRadius: theme.shadowRadius,
        elevation: theme.elevation,
      }}
    >
      <TouchableOpacity onPress={toggleExpand} className="flex-row items-center justify-center p-3 "
        style={{
          backgroundColor: theme.card,
          borderRadius: theme.borderRadius,

        }}>
        <Text className="text-lg font-bold" style={{ color: theme.text, textAlign: "center" }}>Safety Tips</Text>
        <MaterialCommunityIcons
          name={isExpanded ? "chevron-up" : "chevron-down"}
          size={24}
          color={theme.text}
        />
      </TouchableOpacity>

      {isExpanded && (
        <View className="mt-2 p-3 " style={{ backgroundColor: theme.card, borderRadius: theme.borderRadius }}>
          {safetyTips.map((tip, index) => (
            <View key={index} className="flex-row items-start mb-2">
              <Text className="text-base " style={{ color: theme.text, marginRight: 10 }}>•</Text>
              <Text className="flex-1 text-base" style={{ color: utils.commonFunction.adjustColorBrightness(theme.text, 0.2) }}>{tip}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}