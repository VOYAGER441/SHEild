'use client';
import { useFonts } from 'expo-font';
// ThemeProvider/DefaultTheme come from expo-router's own react-navigation
// fork — importing @react-navigation/native directly is banned as of SDK 56.
import { Stack, ThemeProvider, DefaultTheme } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { LogBox } from 'react-native';
import "./global.css";
import * as WebBrowser from 'expo-web-browser';
import { configureGoogleSignIn } from '@/services/googleSignin';

// Lets expo-web-browser resolve auth sessions opened via openAuthSessionAsync
// (used by the browser OAuth fallback in Expo Go).
WebBrowser.maybeCompleteAuthSession();

// Native Google Sign-In is configured once at app startup. webClientId here
// must match GOOGLE_CLIENT_ID_WEB on the backend so the ID token audience
// verifies server-side.
configureGoogleSignIn();

// These still print in the Metro terminal (LogBox.ignoreLogs only affects the
// on-screen LogBox); keeping the on-screen notification quiet is intentional.
LogBox.ignoreLogs([
  "SafeAreaView has been deprecated",
  "Reduced motion setting is enabled on this device",
]);
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { StatusBar } from 'expo-status-bar';

export { ErrorBoundary } from 'expo-router';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (loaded && !error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (error) return null;
  if (!loaded) return null;

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  // App is light-only by design (app.json userInterfaceStyle: "light").
  // Following the system dark-mode toggle broke the mixed theming (Gluestack
  // dark + custom Colors.ts + hardcoded bg-white classes), so the provider is
  // pinned to light until a real dark theme is designed.
  return (
    <GluestackUIProvider mode="light">
      {/* react-navigation has its own theme that follows the system scheme —
          pin it to DefaultTheme (light) so screens/headers stay light. */}
      <ThemeProvider value={DefaultTheme}>
        <StatusBar style="dark" />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="login/index" />
          <Stack.Screen name="sign_up/index" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen
            name="modal"
            options={{
              presentation: 'modal',
              headerShown: true,
            }}
          />
        </Stack>
      </ThemeProvider>
    </GluestackUIProvider>
  );
}
