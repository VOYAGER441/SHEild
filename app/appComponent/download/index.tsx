import { View, Text } from "react-native";
import React from "react";
// import FakeCallModal from "@/views/home/components/FakeCall"; // Keep if needed elsewhere
import { Stack } from "expo-router";
// Import the new component name
import DownloadedMapsScreen from "@/views/track/components/DownloadModal"; // Assuming you renamed the file

const index = () => {
  return (
    <>
      <Stack.Screen
        options={{
          animation: "fade",
          presentation: "modal", // Consider if 'modal' is still appropriate for a full screen management page
          headerShown: false, // We're custom-rendering the header now
          gestureEnabled: true,
          gestureDirection: "vertical",
          animationDuration: 300,
        }}
      />
      {/* Render the new screen component */}
      <DownloadedMapsScreen />
    </>
  );
};

export default index;