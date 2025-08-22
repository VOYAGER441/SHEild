import React, { useEffect } from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import LottieView from "lottie-react-native";

interface AnimatedSplashProps {
  onAnimationFinish?: () => void;
  duration?: number;
}

export default function AnimatedSplash({ 
  onAnimationFinish, 
  duration = 2500 
}: AnimatedSplashProps) {

  useEffect(() => {
    // Ensure callback is called after duration
    const timer = setTimeout(() => {
      onAnimationFinish?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onAnimationFinish]);

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <LottieView
        source={require("../assets/images/app/animation.json")}
        autoPlay
        loop={false}
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
    // backgroundColor: "#ffffff",
  },
  animation: {
    width: "100%",
    height: "100%",
  },
});