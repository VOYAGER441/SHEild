import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { VStack } from "@/components/ui/vstack";
import { useColorScheme } from "@/components/useColorScheme";
import Colors from "@/utils/constants/Colors";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useRouter } from "expo-router";
import React from "react";


export default function ShareLocation() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? `light`];
  const router = useRouter();
  return (
    <Box style={{ minHeight: 150, minWidth: 180 }} className="">
      <Button
        className="flex-1 items-center justify-center  p-4"
        style={{
          backgroundColor: theme.card,
          borderRadius: theme.borderRadius,
          shadowColor: theme.shadowColor,
          shadowOffset: theme.shadowOffset,
          shadowOpacity: theme.shadowOpacity,
          shadowRadius: theme.shadowRadius,
          elevation: theme.elevation,
        }}
        onPress={() => {
          // Navigate to the share location screen
          router.push("/appComponent/shareLocation");
          // alert("Share Location feature is not implemented yet.");
        }}
      >
        <VStack space="md" className="   items-center">
          {/* <Image
            source={require("../../.././assets/images/app/map.svg")}
            alt="phone"
            width={200}
            height={200}
          /> */}
          <FontAwesome6 name="map-location-dot" size={50} color={theme.alert} />

          <Box style={{ alignItems: "center" }}>

            <Heading size="lg" className="mb-1">Share Your</Heading>
            <Heading size="lg" className="mb-1">Live Location</Heading>
          </Box>
        </VStack>
      </Button>
    </Box>
  )
}