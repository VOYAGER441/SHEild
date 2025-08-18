import { Button, ButtonText } from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Icon, CloseIcon } from "@/components/ui/icon";
import React, { useEffect, useRef } from "react";
import { useColorScheme } from "@/components/useColorScheme";
import Colors from "@/constants/Colors";
import { Stack, useRouter } from "expo-router";
import { Box } from "@/components/ui/box";
import { Animated, Easing } from "react-native";

export default function FakeCallModal() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? `light`];
  const router = useRouter();
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    // Start the entrance animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }),
    ]).start();
  }, []);

  const handleBack = () => {
    // Exit animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 50,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      router.back();
    });
  };

  return (
    <Box
      className="flex-1 items-center justify-center"
      style={{ backgroundColor: theme.background }}
    >
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
          width: "100%",
          alignItems: "center",
        }}
      >
        <Button
          onPress={handleBack}
          size="lg"
          action="primary"
          style={{ marginBottom: 20 }}
        >
          <ButtonText>Go Back</ButtonText>
        </Button>
        <Text className="text-red-500 text-lg" style={{ color: theme.text }}>
          Hello NativeWind
        </Text>
      </Animated.View>
    </Box>
  );
}
