import { Box } from "@/components/ui/box";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import { HStack } from "@/components/ui/hstack";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useColorScheme } from "@/components/useColorScheme";
import Colors from "@/constants/Colors";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, View } from "react-native";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Divider } from "@/components/ui/divider";


export default function ShareLocation() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? `light`];
  const router = useRouter();
  return (
    <Box style={{ minHeight: 150, minWidth: 170 }} className="">
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
          <Image
            source={require("../../.././assets/images/app/map.png")}
            alt="phone"
            width={200}
            height={200}
          />
          <Box style={{ alignItems: "center" }}>

             <Heading size="lg" className="mb-1">Share Your</Heading>
            <Heading size="lg" className="mb-1">Live Location</Heading>
          </Box>
        </VStack>
      </Button>
    </Box>
  )
}