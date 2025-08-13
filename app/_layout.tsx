'use client';
import { useColorScheme } from '@/components/useColorScheme';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { defaultConfig } from '@tamagui/config/v4';
import { useFonts } from 'expo-font';
import { RelativePathString, Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { createTamagui } from 'tamagui';
import "./global.css";
const config = createTamagui(defaultConfig);

export { ErrorBoundary } from 'expo-router';

// Prevent splash screen from auto-hiding before we're ready
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [initialRoute, setInitialRoute] = useState<string | null>(null);
  const router = useRouter();

  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  useEffect(() => {
    async function prepare() {
      try {
        const token = await AsyncStorage.getItem('sessionToken');
        setInitialRoute(token ? '/(tabs)' : '/login');
      } catch (error) {
        console.error('Auth check error:', error);
        setInitialRoute('/login');
      }
    }
    prepare();
  }, []);

  useEffect(() => {
    if (loaded && initialRoute) {
      SplashScreen.hideAsync();
      router.replace(initialRoute as RelativePathString);
    }
  }, [loaded, initialRoute]);

  if (error) return null;
  if (!loaded || !initialRoute) return null;

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    // TODO: change to fix the theme type
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DarkTheme}>
      <Stack screenOptions={{
        headerShown: false,
        animation: 'none',
        gestureEnabled: false
      }}>
        <Stack.Screen 
          name="login/index"
        />
        <Stack.Screen 
          name="sign_up/index"
        />
        <Stack.Screen 
          name="(tabs)"
        />
        <Stack.Screen 
          name="modal" 
          options={{ 
            presentation: 'modal',
            headerShown: true,
            animation: 'slide_from_bottom'
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}
