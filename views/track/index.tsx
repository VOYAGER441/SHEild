import { View, Text, ScrollView } from "react-native";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";

export default function Track() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? `light`];
  return (
    <ScrollView className="flex-1 px-4 pt-8" style={{ backgroundColor: theme.background }}>


    </ScrollView>
  );
}
