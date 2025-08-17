import { Box } from "@/components/ui/box";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import { HStack } from "@/components/ui/hstack";
import { Image } from "@/components/ui/image";
import { useColorScheme } from "@/components/useColorScheme";
import Colors from "@/constants/Colors";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView } from "react-native";

export default function Home() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? `light`];
  const router = useRouter();

  return (
    <ScrollView style={{ backgroundColor: theme.tint }}>
      <Center>
        <HStack space="4xl" reversed={false} className=" gap-3">
          <Button
            onPress={() => router.push("/fakecall")}
            size="lg"
            action="negative"
          >
            <HStack space="md" className="border border-gray-300 rounded-lg p-4 items-center">
              <Image
               source={require('../../assets/images/app/phone.png')}
                alt="phone"
                width={100}
                height={100}
              />
            
              {/* <ButtonText>Show Fake Call Modal</ButtonText> */}
            </HStack>
          </Button>
          {/* <Box >
            <Button
              onPress={() => router.push("/fakecall")}
              size="lg"
              action="primary"
            >
              <ButtonText>Show Fake Call Modal</ButtonText>
            </Button>
          </Box> */}
        </HStack>
      </Center>
    </ScrollView>
  );
}
