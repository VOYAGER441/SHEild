// components/sos/SafetyTipsSection.tsx
import { View, Text, TouchableOpacity, LayoutAnimation, Platform, UIManager } from "react-native";
import React, { useState } from "react";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { MaterialCommunityIcons } from '@expo/vector-icons';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

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
    <View className="w-full px-4 mt-4">
      <TouchableOpacity onPress={toggleExpand} className="flex-row items-center justify-between p-3 rounded-lg" style={{ backgroundColor: theme.card }}>
        <Text className="text-lg font-bold" style={{ color: theme.text }}>Safety Tips</Text>
        <MaterialCommunityIcons 
          name={isExpanded ? "chevron-up" : "chevron-down"} 
          size={24} 
          color={theme.text} 
        />
      </TouchableOpacity>

      {isExpanded && (
        <View className="mt-2 p-3 rounded-lg" style={{ backgroundColor: theme.card }}>
          {safetyTips.map((tip, index) => (
            <View key={index} className="flex-row items-start mb-2">
              <Text className="text-base mr-2" style={{ color: theme.text }}>•</Text>
              <Text className="flex-1 text-base" style={{ color: theme.textSecondary }}>{tip}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}