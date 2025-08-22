import React from "react";
import { View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

export default function AnimatedSplash() {
    return (
        // <View style={styles.container}>
            <LottieView
                source={require("../assets/images/app/animation.json")}
                autoPlay
                loop
                resizeMode="contain"
                style={{ width: "100%", height: "100%" }}
            />

        // </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff", // match your theme
    },
});
