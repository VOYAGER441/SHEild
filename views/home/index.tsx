import { Box } from "@/components/ui/box";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useColorScheme } from "@/components/useColorScheme";
import Colors from "@/constants/Colors";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView } from "react-native";
import ShareLocation from "./components/ShareLocation";

export default function Home() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? `light`];
  const router = useRouter();

  return (
    <ScrollView style={{ backgroundColor: theme.background }}>
      {/* fake call and location*/}
      <Center>
        <HStack reversed={false} className="gap-5 " style={{ marginTop: 20 }}>
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
                router.push("/appComponent/fakecall");
              }}
            >
              <VStack space="md" className="   items-center">
                <Image
                  source={require("../../assets/images/app/phone.png")}
                  alt="phone"
                  width={30}
                  height={30}
                />

                <Heading size="lg" className="mb-1">Fake Call</Heading>
              </VStack>
            </Button>
          </Box>

          {/* share location */}
          <ShareLocation />

        </HStack>
      </Center>

      {/* list items */}
      <VStack reversed={false} style={{ marginTop: 20, padding: 10 }}>
        <Box>

          {/* add friend or save close  */}
          <Card
            size="lg"
            variant="elevated"
            className="m-3"
            style={{
              backgroundColor: theme.card,
              borderRadius: theme.borderRadius,
              shadowColor: theme.shadowColor,
              shadowOffset: theme.shadowOffset,
              shadowOpacity: theme.shadowOpacity,
              shadowRadius: theme.shadowRadius,
              elevation: theme.elevation,
            }}
          >
            <Box style={{ display: "flex", gap: 10 }}>
              <Box>
                <Heading size="lg" className="mb-1">
                  Add Close Contact
                </Heading>
                <Text size="sm">
                  Add those people who are close to you and you want to
                  share your location with them.
                </Text>
              </Box>

              <Box>
                <Button
                  className="mt-3"
                  style={{
                    backgroundColor: theme.tint,
                    borderRadius: theme.borderRadius,
                    shadowColor: theme.shadowColor,
                    shadowOffset: theme.shadowOffset,
                    shadowOpacity: theme.shadowOpacity,
                    shadowRadius: theme.shadowRadius,
                    elevation: theme.elevation,
                  }}
                  onPress={() => {
                    router.push("/");
                  }}
                >
                  <ButtonText >Add Close People</ButtonText>
                  <ButtonIcon color={theme.textSecondary} />
                </Button>
              </Box>
            </Box>
          </Card>

          {/* redirect to map */}
          <Card
            size="lg"
            variant="elevated"
            className="m-3"
            style={{
              backgroundColor: theme.card,
              borderRadius: theme.borderRadius,
              shadowColor: theme.shadowColor,
              shadowOffset: theme.shadowOffset,
              shadowOpacity: theme.shadowOpacity,
              shadowRadius: theme.shadowRadius,
              elevation: theme.elevation,
            }}
          >
            <Box>
              

              <Heading size="lg" className="mb-1">
                Quick Start
              </Heading>
              <Text size="sm">Start building your next project in minutes</Text>
            </Box>
          </Card>
        </Box>
      </VStack>
    </ScrollView>
  );
}
