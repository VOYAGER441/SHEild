'use client';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
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
import { useColorScheme } from '@/components/useColorScheme';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";

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
  const colorScheme = useColorScheme();

  return (
    <GluestackUIProvider mode={colorScheme === 'dark' ? 'dark' : 'light'}>
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
    </GluestackUIProvider>
  );
}
