import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function OnlineMap() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Online maps are available on Android and iOS.</Text>
      <Text style={styles.description}>
        Open this screen in Expo Go on a mobile device to use the native map.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    textAlign: "center",
  },
  description: {
    textAlign: "center",
  },
});
