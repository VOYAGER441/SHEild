import React, { useEffect, useState } from "react";
import { Link, Tabs } from "expo-router";
import { Pressable, View, StyleSheet, AppState } from "react-native";
import "../global.css";

import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import Colors from "@/constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// icons
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import {
  Avatar,
  AvatarBadge,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { Box } from "@/components/ui/box";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? `light`];
  const insets = useSafeAreaInsets();

  // 👇 Fix: re-render when app resumes (prevents bar shifting)
  const [key, setKey] = useState(0);
  useEffect(() => {
    const sub = AppState.addEventListener("change", (state) => {
      if (state === "active") {
        setKey((prev) => prev + 1);
      }
    });

    // 👇 additional safety: fix misaligned tab icon labels
    const timeout = setTimeout(() => {
      setKey((prev) => prev + 1);
    }, 500);

    return () => {
      sub.remove();
      clearTimeout(timeout);
    };
  }, []);


  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <Tabs
        key={key} // 🔧 Re-render fix
        screenOptions={{
          tabBarActiveTintColor: theme.tabIconSelected,
          tabBarInactiveTintColor: theme.tabIconDefault,
          tabBarStyle: {
            position: "absolute",
            left: 10,
            right: 10,
            marginLeft: 10,
            marginRight: 10,
            // margin:10,
            bottom: insets.bottom + 10, // ✅ floating correctly
            backgroundColor: theme.card,
            borderTopWidth: 0,
            elevation: theme.elevation,
            shadowOpacity: theme.shadowOpacity,
            shadowColor: theme.shadowColor,
            height: 75, // fixed height (no auto shift)
            paddingTop: 5,
            paddingBottom: 10, // ✅ keeps icon+text centered
            borderRadius: 30,
            transform: [{ translateY: 0 }], // ✅ ensures reset transform after resume
          },
          headerStyle: {
            backgroundColor: theme.tint,
          },
          headerTintColor: theme.textSecondary,
          headerShown: useClientOnlyValue(false, true),
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "500",
            marginTop: 4,
          },
          tabBarIconStyle: {
            marginBottom: 2,
          },
        }}
      >

        {/* Home */}
        <Tabs.Screen
          name="index"
          options={{
            tabBarLabel: "Home",
            headerTitle: "",
            headerLeft: () => (
              <>
                <Link href="/profile" asChild>
                  <Pressable>
                    {({ pressed }) => (
                      <Avatar size="md" className="m-3">
                        <AvatarFallbackText>Jane Doe</AvatarFallbackText>
                        <AvatarImage
                          source={{
                            uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80",
                          }}
                        />
                        <AvatarBadge />
                      </Avatar>
                    )}
                  </Pressable>
                </Link>
                <Box>
                  <Heading size="lg" style={{ color: theme.textSecondary }}>
                    Hello, Mainak !
                  </Heading>
                  <Text
                    size="md"
                    style={{ color: theme.textSecondary, fontWeight: 500 }}
                  >
                    Welcome to SHEild
                  </Text>
                </Box>
              </>
            ),
            tabBarIcon: ({ focused }) => (
              <AntDesign
                name="home"
                size={24}
                color={
                  focused ? theme.tabIconSelected : theme.tabIconDefault
                }
              />
            ),
            headerRight: () => (
              <Link href="/appComponent/notification" asChild>
                <Pressable>
                  {({ pressed }) => (
                    <Feather
                      name="bell"
                      size={25}
                      color={theme.tabIconDefault}
                      style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
              </Link>
            ),
          }}
        />

        {/* Map */}
        <Tabs.Screen
          name="track"
          options={{
            title: "Location",
            headerRight: () => (
              <Link href="/appComponent/download" asChild>
                <Pressable>
                  {({ pressed }) => (
                    <Feather
                      name="download"
                      size={25}
                      color={theme.tabIconDefault}
                      style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
              </Link>
            ),
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="location-outline"
                size={24}
                color={
                  focused ? theme.tabIconSelected : theme.tabIconDefault
                }
              />
            ),
          }}
        />

        {/* SOS */}
        <Tabs.Screen
          name="sos"
          options={{
            title: "",
            tabBarIcon: ({ focused }) => (
              <View
                style={[
                  styles.sosButton,
                  {
                    backgroundColor: theme.alert,
                    shadowColor: theme.shadowColor,
                    elevation: theme.elevation,
                    shadowOpacity: theme.shadowOpacity,
                    shadowOffset: theme.shadowOffset,
                    shadowRadius: theme.shadowRadius,
                  },
                ]}
              >
                <MaterialCommunityIcons
                  name="bell-alert"
                  size={28}
                  color={theme.background}
                />
                <Text
                  style={[styles.sosText, { color: theme.textSecondary }]}
                >
                  SOS
                </Text>
              </View>
            ),
            tabBarButton: (props) => (
              <Pressable
                onPress={props.onPress}
                style={[props.style, styles.sosButtonContainer]}
              >
                {props.children}
              </Pressable>
            ),
          }}
        />

        {/* Community */}
        <Tabs.Screen
          name="community"
          options={{
            title: "Community",
            tabBarIcon: ({ focused }) => (
              <MaterialCommunityIcons
                name="account-group-outline"
                size={24}
                color={
                  focused ? theme.tabIconSelected : theme.tabIconDefault
                }
              />
            ),
            headerRight: () => (
              <Link href="/appComponent/sheildAi" asChild>
                <Text style={{ marginRight: 15, fontSize: 20, fontWeight: '600', color: theme.textSecondary }}>
                  SHEild Ai
                </Text>
              </Link>
            )
          }}
        />

        {/* Profile */}
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ focused }) => (
              <MaterialCommunityIcons
                name="account-outline"
                size={24}
                color={
                  focused ? theme.tabIconSelected : theme.tabIconDefault
                }
              />
            ),
          }}
        />
      </Tabs>
    </View >
  );
}

const styles = StyleSheet.create({
  sosButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    marginTop: -20, // Move up to overlap the tab bar
  },
  sosButtonContainer: {
    marginTop: -10,
  },
  sosText: {
    fontSize: 10,
    fontWeight: "bold",
    marginTop: 2,
  },
});
