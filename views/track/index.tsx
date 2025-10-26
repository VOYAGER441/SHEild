import { View, Text, ScrollView } from "react-native";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import {
  Actionsheet,
  ActionsheetContent,
  ActionsheetItem,
  ActionsheetItemText,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetBackdrop,
} from "@/components/ui/actionsheet"
import { Button, ButtonText } from "@/components/ui/button"
import React from "react";
import { Box } from "@/components/ui/box";
import OnlineMap from "./components/OnlineMap";
import OfflineMap from "./components/OfflineMap";

export default function Track() {

  const [showActionsheet, setShowActionsheet] = React.useState(false)


  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? `light`];

  const handleClose = () => setShowActionsheet(false)
  return (
    <ScrollView className="flex-1 px-4 pt-8" style={{ backgroundColor: theme.background }}>

      {/*Box for toggle the map between offline and google  */}
      <Box style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999,
        position: "relative"
      }}>
        <Box
          style={{
            backgroundColor: theme.background,
            borderRadius: theme.borderRadius,
            shadowColor: theme.shadowColor,
            shadowOffset: theme.shadowOffset,
            shadowOpacity: theme.shadowOpacity,
            shadowRadius: theme.shadowRadius,
            elevation: theme.elevation,
            marginTop: 60,
            position: "absolute"
          }}

        >
          <Button
            size="md"
            variant="outline"
            onPress={() => setShowActionsheet(true)}
            style={{
              backgroundColor: theme.tint,
              borderRadius: theme.borderRadius,
              shadowColor: theme.shadowColor,
              shadowOffset: theme.shadowOffset,
              shadowOpacity: theme.shadowOpacity,
              shadowRadius: theme.shadowRadius,
              elevation: theme.elevation,

            }}

          >
            <ButtonText
              style={{
                color: theme.textSecondary,
                fontSize: 15
              }}
            >Change Map Mode</ButtonText>
          </Button>
          <Actionsheet isOpen={showActionsheet} onClose={handleClose}>
            <ActionsheetBackdrop />
            <ActionsheetContent>
              <ActionsheetDragIndicatorWrapper>
                <ActionsheetDragIndicator />
              </ActionsheetDragIndicatorWrapper>

              <ActionsheetItem onPress={handleClose}>
                <ActionsheetItemText>Offline Map (Downloaded Map)</ActionsheetItemText>
              </ActionsheetItem>
              <ActionsheetItem onPress={handleClose}>
                <ActionsheetItemText>Online Map (Google Map)</ActionsheetItemText>
              </ActionsheetItem>
              <ActionsheetItem onPress={handleClose}>
                <ActionsheetItemText>Cancel</ActionsheetItemText>
              </ActionsheetItem>
            </ActionsheetContent>
          </Actionsheet>
        </Box>
      </Box>
      <Box>

        <OnlineMap />
        <OfflineMap />
      </Box>

    </ScrollView >
  );
}
