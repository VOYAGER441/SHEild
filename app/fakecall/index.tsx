import { View, Text } from "react-native";
import React from "react";
import FakeCallModal from "@/views/home/components/fakeCall";
import { Stack } from "expo-router";

const index = () => {
  return (
    <>
      <Stack.Screen
        options={{
          animation: "fade",
          presentation: "modal",
          headerShown: false,
          gestureEnabled: true,
          gestureDirection: "vertical",
          animationDuration: 300,
        }}
      />
      <FakeCallModal />
    </>
  );
};

export default index;