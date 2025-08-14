import { View, Text } from "react-native";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";

export default function Track() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? `light`];
  return (
    <View className="flex-1 items-center justify-center " style={{ backgroundColor: theme.tint }}>
      <Text className="text-red-500 text-lg">Hello NativeWind</Text>
    </View>
  );
}
