import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useColorScheme } from "@/components/useColorScheme";
import Colors from "@/constants/Colors";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView } from "react-native";
import ShareLocation from "./components/ShareLocation";

// Icons
import { Divider } from "@/components/ui/divider";
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import DownloadedMapsModal from "./components/DownloadedMapsModal";
import EmergencyPlaces from "./components/EmergencyPlaces";
import SheildAiModal from "./components/SheildAiModal";

export default function Home() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? `light`];
  const router = useRouter();

  return (
    <ScrollView style={{ backgroundColor: theme.background }}>
      {/* fake call and location*/}
      {/* <Center> */}
      <VStack>
        <HStack className="flex-1 " style={{ marginTop: 20, justifyContent: "space-around" }}>
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
                router.push("/appComponent/fakecall");
              }}
            >
              <VStack space="md" className="   items-center">


                <Feather name="phone-call" size={50} color={theme.tintSecondary} />
                <Heading size="lg" className="mb-1">Fake Call</Heading>
              </VStack>
            </Button>
          </Box>

          {/* share location */}
          <ShareLocation />
        </HStack>
        <Box style={{ marginTop: 20, flexDirection: "row", justifyContent: "space-around" }} >

          <SheildAiModal />
          <DownloadedMapsModal />
        </Box>
      </VStack>
      {/* </Center> */}

      {/* list items */}
      <VStack reversed={false} style={{ marginTop: 20 }} className="gap-5">
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
                  <Box style={{ flexDirection: "row", alignItems: "center" }}>
                    <AntDesign name="adduser" size={16}
                      color={theme.textSecondary}
                      style={{ marginRight: 6 }}
                    />
                    <ButtonText style={{ color: theme.textSecondary, fontSize: 15 }}>
                      Add Close People
                    </ButtonText>
                  </Box>

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
            <HStack className="gap-4">

              <Box className="justify-center">
                <FontAwesome6 name="person-walking" size={24} color={theme.tint} />
              </Box>

              <Box className="flex-1 justify-center">

                <Heading size="lg" className="mb-1">
                  Start Your journey
                </Heading>
                <Text size="sm">Via Maps</Text>
              </Box>
              <Box className="justify-center">
                <Button style={{
                  backgroundColor: theme.background,
                  borderRadius: theme.borderRadius,
                  shadowColor: theme.shadowColor,
                  shadowOffset: theme.shadowOffset,
                  shadowOpacity: theme.shadowOpacity,
                  shadowRadius: theme.shadowRadius,
                  elevation: theme.elevation,
                }}
                  onPress={() => {
                    router.push("/appComponent/shareLocation");
                  }}
                >
                  <Feather name="arrow-right-circle" size={24} color={theme.tint} />
                </Button>
              </Box>
            </HStack>
          </Card>
        </Box>
      </VStack>


      {/* Emergency Number open a modal */}



      <Box>
        <Card
          size="lg"
          variant="elevated"
          className="m-3"
          style={{
            backgroundColor: theme.card,
            borderRadius: theme.borderRadius * 1.5,
            padding: 16,
            shadowColor: theme.shadowColor,
            shadowOffset: theme.shadowOffset,
            shadowOpacity: theme.shadowOpacity,
            shadowRadius: theme.shadowRadius,
            elevation: theme.elevation,
          }}
        >
          {/* Header Row */}
          <Box style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}>
            <MaterialCommunityIcons
              name="car-emergency"
              size={28}
              color={theme.tint}
              style={{ marginRight: 8 }}
            />
            <Heading size="lg" style={{ color: theme.text }}>
              Emergency Numbers
            </Heading>
          </Box>

          {/* Description */}
          <Text size="sm" style={{ color: theme.text, marginBottom: 16 }}>
            Quickly access and call important emergency contacts when needed.
          </Text>

          {/* Button */}
          <Button
            style={{
              backgroundColor: theme.tint,
              borderRadius: theme.borderRadius,
              // paddingVertical: 12,
              // paddingHorizontal: 16,
              // justifyContent: "center",
              // alignItems: "center",
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
            <Box style={{ flexDirection: "row", alignItems: "center" }}>
              <Feather
                name="phone-call"
                size={16}
                color={theme.textSecondary}
                style={{ marginRight: 6 }} // spacing between icon and text
              />
              <ButtonText style={{ color: theme.textSecondary, fontSize: 15 }}>
                Open The Dialer
              </ButtonText>
            </Box>

          </Button>
        </Card>
      </Box>



      {/* Emergency places */}
      <Box style={{ marginBottom: 100 }}>
        <VStack>
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
            <Box style={{ marginBottom: 10, alignItems: "center" }}>
              <Heading size="xl">Emergency Place</Heading>
              {/* <Divider/> */}
            </Box>

            {/* police station */}
            <EmergencyPlaces iconName={"police-badge-outline"} heading={"Near Police Station"} place={"/emergencyPlaces"} />

            <Box style={{ alignItems: "center", }}>
              <Divider style={{ margin: 10, backgroundColor: theme.tint, width: 250, }} />
            </Box>

            {/* hospital */}
            <EmergencyPlaces iconName={"hospital"} heading={"Near Hospital"} place={"/emergencyPlaces"} />

            <Box style={{ alignItems: "center", }}>
              <Divider style={{ margin: 10, backgroundColor: theme.tint, width: 250, }} />
            </Box>

            {/* fire station */}
            {/* <EmergencyPlaces iconName={"fire-truck"} heading={"Near Fire Station"} place={"/emergencyPlaces"} /> */}

            {/* <Box style={{ alignItems: "center",  }}>
              <Divider style={{ margin: 10, backgroundColor: theme.tint, width: 250, }} />
            </Box> */}

            {/* ambulance */}
            <EmergencyPlaces iconName={"ambulance"} heading={"Near Ambulance"} place={"/emergencyPlaces"} />

            <Box style={{ alignItems: "center", }}>
              <Divider style={{ margin: 10, backgroundColor: theme.tint, width: 250, }} />
            </Box>

            {/* Public Toilet */}
            <EmergencyPlaces iconName={"toilet"} heading={"Near Public Toilet"} place={"/emergencyPlaces"} />
          </Card>

        </VStack>
      </Box>

    </ScrollView >
  );
}
