import { useColorScheme } from "@/components/useColorScheme";
import Colors from "@/constants/Colors";
import React from "react";
import { ScrollView } from "react-native";
import FakeCall from "./components/fakeCall";
import { Stack } from "expo-router";

export default function Home() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? `light`];

  return (
    <ScrollView style={{ backgroundColor: theme.tint }}>
      {/* <FakeCall /> */}
      <Stack>
        <Stack.Screen name="fakeCall" />
        <Stack.Screen
          name="fakeCallModal"
          options={{
            presentation: "modal",
          }}
        />
      </Stack>
    </ScrollView>
  );
}
