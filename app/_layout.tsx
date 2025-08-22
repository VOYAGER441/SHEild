//_layout.tsx
'use client';
import { useFonts } from 'expo-font';
import { RelativePathString, Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import "./global.css";
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';
import { useColorScheme } from '@/components/useColorScheme';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import AnimatedSplash from './AnimatedSplash';

export { ErrorBoundary } from 'expo-router';

// Prevent the splash screen from auto-hiding before asset loading is complete
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const [showAnimatedSplash, setShowAnimatedSplash] = useState(true);
  const router = useRouter();
  const segments = useSegments();
  
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    ...FontAwesome.font,
  });

  // Check authentication status
  useEffect(() => {
    async function checkAuth() {
      try {
        await SplashScreen.hideAsync();
        const token = await AsyncStorage.getItem('sessionToken');
        setIsAuthenticated(!!token);
      } catch (error) {
        console.error('Auth check error:', error);
        setIsAuthenticated(false);
      } finally {
        setIsInitializing(false);
      }
    }

    if (loaded) {
      checkAuth();
    }
  }, [loaded]);

  // Handle navigation based on auth status
  useEffect(() => {
    if (!isInitializing && isAuthenticated !== null && !showAnimatedSplash) {
      const inAuthGroup = segments[0] === '(tabs)';
      const inLoginFlow = segments[0] === 'login' || segments[0] === 'sign_up';
      
      if (isAuthenticated && !inAuthGroup) {
        // User is authenticated but not in protected routes
        router.replace('/(tabs)' as RelativePathString);
      } else if (!isAuthenticated && !inLoginFlow) {
        // User is not authenticated and not in login flow
        router.replace('/login' as RelativePathString);
      }
    }
  }, [isAuthenticated, isInitializing, showAnimatedSplash, segments]);

  // Handle animation finish
  const handleAnimationFinish = () => {
    setShowAnimatedSplash(false);
  };

  // Show error state
  if (error) {
    return null;
  }

  // Show animated splash while loading fonts or initializing
  if (!loaded || isInitializing || showAnimatedSplash) {
    return (
      <AnimatedSplash 
        onAnimationFinish={handleAnimationFinish}
        duration={2500} // 2.5 seconds
      />
    );
  }

  // Once everything is ready, show the main layout
  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <GluestackUIProvider mode={colorScheme === 'dark' ? 'dark' : 'light'}>
      <Stack screenOptions={{
        headerShown: false,
        animation: 'none',
        gestureEnabled: false
      }}>
        <Stack.Screen name="login/index" />
        <Stack.Screen name="sign_up/index" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="modal"
          options={{
            presentation: 'modal',
            headerShown: true,
            animation: 'flip'
          }}
        />
      </Stack>
    </GluestackUIProvider>
  );
}