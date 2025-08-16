import { Button, ButtonText } from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";
import {
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@/components/ui/modal";
import { Text } from "@/components/ui/text";
import { Icon, CloseIcon } from "@/components/ui/icon";
import React from "react";
import { useColorScheme } from "@/components/useColorScheme";
import Colors from "@/constants/Colors";
import { Stack } from "expo-router";

export default function fakeCallModal() {
      const colorScheme = useColorScheme();
      const theme = Colors[colorScheme ?? `light`];
      const [showModal, setShowModal] = React.useState(false);
  return (
     <Center >
      <Heading style={{ color: theme.text }}>Home</Heading>
      <Text style={{ color: theme.textSecondary }}>
        This is the home page of the app.
      </Text>
      <Button
        onPress={() => setShowModal(true)}
        style={{ marginTop: 20, backgroundColor: theme.background }}
      >
        <ButtonText style={{ color: theme.text }}>Open Modal</ButtonText>
      </Button>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        // animationPreset="slide"
      >
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Heading>Modal Title</Heading>
            <ModalCloseButton onPress={() => setShowModal(false)}>
              <Icon as={CloseIcon} />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            <Text>This is a modal body.</Text>
          </ModalBody>
          <ModalFooter>
            <Button onPress={() => setShowModal(false)}>
              <ButtonText>Close</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Stack for navigation */}
      <Stack screenOptions={{ headerShown: true,animation:"slide_from_bottom" }} />
    </Center>
  )
}