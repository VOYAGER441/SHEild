import React, { useEffect, useRef } from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import LottieView from "lottie-react-native";

interface AnimatedSplashProps {
  onAnimationFinish?: () => void;
  duration?: number; // in milliseconds
}

export default function AnimatedSplash({ 
  onAnimationFinish, 
  duration = 3000 
}: AnimatedSplashProps) {
  const animationRef = useRef<LottieView>(null);

  useEffect(() => {
    // Auto-finish after duration if no onAnimationFinish callback
    const timer = setTimeout(() => {
      if (onAnimationFinish) {
        onAnimationFinish();
      }
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onAnimationFinish]);

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <LottieView
        ref={animationRef}
        source={require("../assets/images/app/animation.json")}
        autoPlay
        loop={false} // Set to false for splash screen
        resizeMode="contain"
        style={styles.animation}
        onAnimationFinish={onAnimationFinish}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff", // Match your app's theme
  },
  animation: {
    width: "100%",
    height: "100%",
  },
});