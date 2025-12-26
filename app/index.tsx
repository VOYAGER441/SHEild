import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import AnimatedSplash from './AnimatedSplash';
import utils from '@/utils';

export default function IndexPage() {
  const [isReady, setIsReady] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      // Check authentication
      const token = await AsyncStorage.getItem(utils.appConstant.SESSION_DATA_KEY_FOR_LOCAL_STORAGE);
      //   const token = ''
      //   console.log('Token check:', !!token);

      setIsAuthenticated(!!token);
      setIsReady(true);
    } catch (error) {
      //   console.error('Auth error:', error);
      setIsAuthenticated(false);
      setIsReady(true);
    }
  };

  const handleAnimationComplete = () => {
    if (!isReady) return;

    // Navigate based on auth status
    if (isAuthenticated) {
      //   console.log('Navigating to main app');
      router.replace('/(tabs)');
    } else {
      //   console.log('Navigating to login');
      router.replace('/login');
    }
  };

  return (
    <AnimatedSplash
      onAnimationFinish={handleAnimationComplete}
      duration={2500}
    />
  );
}