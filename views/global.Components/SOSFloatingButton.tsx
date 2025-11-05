import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { useColorScheme } from "@/components/useColorScheme";
import Colors from "@/constants/Colors";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function SOSFloatingButton() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? `light`];
  const router = useRouter();

  const handlePress = () => {
    router.push("/(tabs)/sos");
  };

  return (
    <Box style={styles.container}>
      <Button
        style={[
          styles.button,
          {
            backgroundColor: theme.alert,
            shadowColor: theme.shadowColor,
            shadowOffset: theme.shadowOffset,
            shadowOpacity: theme.shadowOpacity,
            shadowRadius: theme.shadowRadius,
            elevation: theme.elevation,
          }
        ]}
        onPress={handlePress}
      >
        <MaterialIcons name="sos" size={24} color="white" />
      </Button>
    </Box>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 150,
    right: 20,
    zIndex: 999,
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
