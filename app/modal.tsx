import { View, Text } from "react-native";
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';

export default function Page() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme?? `light`];

  return (
    <View className="flex-1 items-center justify-center " style={{ backgroundColor: theme.background }}>
      <Text className="text-red-500 text-lg" style={{ color: theme.text }}>modal</Text>
    </View>
  );
}
