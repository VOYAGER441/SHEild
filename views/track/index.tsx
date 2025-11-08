import React from "react";
import { ScrollView, View } from "react-native";
import Colors from "@/utils/constants/Colors";
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
    <View style={{ flex: 1, backgroundColor: theme.background, marginBottom: 100 }}>



      {/* === Floating Map Mode Button === */}
      <View
        pointerEvents="box-none" // 👈 allows map below to stay interactive
        style={{
          position: 'absolute',
          top: 11,
          left: 0,
          right: 0,
          alignItems: 'center',
          zIndex: 999,
        }}
      >
        <View pointerEvents="auto">
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
                fontWeight: '600',
              }}
            >
              {isOnlineMode ? "Online Map" : "Offline Map"}
            </ButtonText>
          </Button>
        </View>
      </View>

      {/* Map view */}
      <View style={{ flex: 1 }}>
        {isOnlineMode ? <OnlineMap /> : <OfflineMap />}
      </View>

      {/* Action sheet */}
      <Actionsheet isOpen={showActionsheet} onClose={handleClose}>
        <ActionsheetBackdrop />
        <ActionsheetContent>
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>

          <ActionsheetItem onPress={() => handleSelectMapMode('offline')}>
            <ActionsheetItemText>Offline Map (Downloaded Map)</ActionsheetItemText>
          </ActionsheetItem>
          <ActionsheetItem onPress={() => handleSelectMapMode('online')}>
            <ActionsheetItemText>Online Map (MapTiler)</ActionsheetItemText>
          </ActionsheetItem>
          <ActionsheetItem onPress={handleClose}>
            <ActionsheetItemText>Cancel</ActionsheetItemText>
          </ActionsheetItem>
        </ActionsheetContent>
      </Actionsheet>
    </View>

  );
}
