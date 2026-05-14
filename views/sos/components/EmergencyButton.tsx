// components/sos/EmergencyButton.tsx
import { TouchableOpacity, Text, View } from "react-native";
import React from "react";
import Colors from "@/utils/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import utils from "@/utils";

interface EmergencyButtonProps {
  onPress: () => void;
}

export default function EmergencyButton({ onPress }: EmergencyButtonProps) {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  return (
    <TouchableOpacity
      onPress={onPress}
      className="rounded-full  items-center justify-center"
      style={{
        backgroundColor:"transparent",
        borderColor: utils.commonFunction.hexToRgba(theme.alert, 0.3),
        borderWidth: 20,
        width: 230,
        height: 230,
        marginTop: 10

      }}>
      <View
        className="rounded-full  items-center justify-center"
        style={{
          borderColor: utils.commonFunction.hexToRgba(theme.alert, 0.5),
          borderWidth: 20,
          width: 190,
          height: 190,
        }}>
        <View

          className="rounded-full items-center justify-center "
          style={{
            backgroundColor: theme.alert,
            borderColor: utils.commonFunction.hexToRgba(theme.alert, 0.7),
            borderWidth: 20,
            width: 150,
            height: 150,
          }}
        >

          <Text className="text-5xl font-bold" style={{ color: theme.background }}>SOS</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}