import { View, Text } from "react-native";
import React from "react";
import FakeCallModal from "@/views/home/components/FakeCall";
import { Stack } from "expo-router";
import ShareLocationModal from "@/views/home/components/shareLocationModal";

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
      <ShareLocationModal />
    </>
  );
};

export default index;