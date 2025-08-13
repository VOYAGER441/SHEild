import React from "react";
import { Link, Tabs } from "expo-router";
import { Pressable, View, Text, StyleSheet } from "react-native";
import "../global.css";

import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import Colors from "@/constants/Colors";

// icon
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const colorScheme = useColorScheme();
const theme = Colors[colorScheme ?? `light`];

export default function TabLayout() {
 

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.tabIconSelected, // use accent color, not background
        tabBarInactiveTintColor: theme.tabIconDefault,
        tabBarStyle: {
          backgroundColor: theme.background, // Light pink/purple background
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          height: 80,
          paddingBottom: 10,
          paddingTop: 10,
          borderRadius: 20,
          marginHorizontal: 10,
          marginBottom: 30,
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
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <AntDesign 
              name="home" 
              size={24} 
              color={focused ? theme.tabIconSelected : theme.tabIconDefault} 
            />
          ),
          headerRight: () => (
            <Link href="/modal" asChild>
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
      <Tabs.Screen
        name="track"
        options={{
          title: "Track",
          tabBarIcon: ({ focused }) => (
            <Ionicons 
              name="location-outline" 
              size={24} 
              color={focused ? theme.tabIconSelected : theme.tabIconDefault}  
            />
          ),
        }}
      />
      <Tabs.Screen
        name="sos"
        options={{
          title: "SOS",
          tabBarIcon: ({ focused }) => (
            <View style={styles.sosButton}>
              <MaterialCommunityIcons
                name="bell-alert"
                size={28}
                color="#FFFFFF"
              />
              <Text style={styles.sosText}>SOS</Text>
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
      <Tabs.Screen
        name="community"
        options={{
          title: "Community",
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="account-group-outline"
              size={24}
              color={focused ? theme.tabIconSelected : theme.tabIconDefault} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="account-outline"
              size={24}
              color={focused ? theme.tabIconSelected : theme.tabIconDefault} 
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  sosButton: {
    backgroundColor: theme.alert, // Red background
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: theme.alert,
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
    color: theme.textSecondary,
    fontSize: 10,
    fontWeight: "bold",
    marginTop: 2,
  },
});
