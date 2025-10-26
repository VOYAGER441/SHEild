import React from "react";
import { ScrollView, View } from "react-native";
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
} from "@/components/ui/actionsheet";
import { Button, ButtonText } from "@/components/ui/button";
import { Box } from "@/components/ui/box";
import OnlineMap from "./components/OnlineMap";
import OfflineMap from "./components/OfflineMap";

export default function Track() {
  const [showActionsheet, setShowActionsheet] = React.useState(false);
  const [isOnlineMode, setIsOnlineMode] = React.useState(true);

  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  const handleClose = () => setShowActionsheet(false);

  const handleSelectMapMode = (value: "offline" | "online") => {
    setIsOnlineMode(value === "online");
    handleClose();
  };

  return (
    <ScrollView
      // className="flex-1 px-4 pt-8"
      style={{ backgroundColor: theme.background }}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      {/* === Toggle Map Mode Button === */}
      <Box style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999,
        position: "relative"
      }}>
        <Box style={{
          backgroundColor: theme.background,
          borderRadius: theme.borderRadius,
          shadowColor: theme.shadowColor,
          shadowOffset: theme.shadowOffset,
          shadowOpacity: theme.shadowOpacity,
          shadowRadius: theme.shadowRadius,
          elevation: theme.elevation,
          marginTop: 60,
          position: "absolute"
        }} >


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
                fontSize: 15,
              }}
            >
              {isOnlineMode ? "Online Map" : "Offline Map"}
            </ButtonText>
          </Button>

          {/* === Action Sheet === */}
          <Actionsheet isOpen={showActionsheet} onClose={handleClose}>
            <ActionsheetBackdrop />
            <ActionsheetContent>
              <ActionsheetDragIndicatorWrapper>
                <ActionsheetDragIndicator />
              </ActionsheetDragIndicatorWrapper>

              <ActionsheetItem onPress={() => handleSelectMapMode("offline")} >
                <ActionsheetItemText>
                  Offline Map (Downloaded Map)
                </ActionsheetItemText>
              </ActionsheetItem>
              <ActionsheetItem onPress={() => handleSelectMapMode("online")}>
                <ActionsheetItemText>
                  Online Map (Google Map)
                </ActionsheetItemText>
              </ActionsheetItem>
              <ActionsheetItem onPress={handleClose}>
                <ActionsheetItemText>Cancel</ActionsheetItemText>
              </ActionsheetItem>
            </ActionsheetContent>
          </Actionsheet>
        </Box>
      </Box>

      {/* === Map View === */}
      <Box >
        {isOnlineMode ? <OnlineMap /> : <OfflineMap />}
      </Box>
    </ScrollView>
  );
}
