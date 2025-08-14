import { Button, ButtonText } from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";
import { Modal, ModalBackdrop, ModalContent, ModalCloseButton, ModalHeader, ModalBody, ModalFooter } from "@/components/ui/modal";
import { Text } from "@/components/ui/text";
import { Icon, CloseIcon } from "@/components/ui/icon";
import React from "react";
import { useColorScheme } from "@/components/useColorScheme";
import Colors from "@/constants/Colors";
	
export default function Home() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? `light`]
          const [showModal, setShowModal] = React.useState(false);
          return (
            <Center className='h-[300px]'>
              <Button onPress={() => setShowModal(true)}>
                <ButtonText>Show Modal</ButtonText>
              </Button>
              <Modal
                isOpen={showModal}
                onClose={() => {
                  setShowModal(false);
                }}
                size="md" 
              >
                <ModalBackdrop />
                <ModalContent>
                  <ModalHeader>
                    <Heading size="md" className="text-typography-950">
                      Invite your team
                    </Heading>
                    <ModalCloseButton >
                      <Icon as={CloseIcon} size="md"
                className="stroke-background-400 group-[:hover]/modal-close-button:stroke-background-700 group-[:active]/modal-close-button:stroke-background-900 group-[:focus-visible]/modal-close-button:stroke-background-900"/>
                    </ModalCloseButton>
                  </ModalHeader>
                  <ModalBody>
                    <Text size="sm" className="text-typography-500">
                      Elevate user interactions with our versatile modals. Seamlessly
                      integrate notifications, forms, and media displays. Make an impact
                      effortlessly.
                    </Text>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      variant="outline"
                      action="secondary"
                      onPress={() => {
                        setShowModal(false);
                      }}
                    >
                      <ButtonText>Cancel</ButtonText>
                    </Button>
                    <Button
                      onPress={() => {
                        setShowModal(false);
                      }}
                    >
                      <ButtonText>Explore</ButtonText>
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </Center>
          );
        }