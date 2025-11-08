// components/sos/RecordEvidenceButton.tsx
import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from "react";
import Colors from "@/utils/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";

interface RecordEvidenceButtonProps {
  onPress: () => void;
  isRecording?: boolean; // Optional prop to show recording state
}

export default function RecordEvidenceButton({ onPress, isRecording = false }: RecordEvidenceButtonProps) {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center justify-center px-4 py-2 rounded-full"
      style={{ backgroundColor: isRecording ? theme.alert : theme.tabIconDefault }}
    >
      <MaterialCommunityIcons 
        name={isRecording ? "stop-circle" : "video-outline"} 
        size={24} 
        color={isRecording ? theme.background : theme.text} 
      />
      {/* <Text className="ml-2 text-base" style={{ color: isRecording ? theme.background : theme.text }}>
        {isRecording ? "Recording..." : "Record Evidence"}
      </Text> */}
    </TouchableOpacity>
  );
}