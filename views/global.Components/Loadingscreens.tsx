import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef, useState } from 'react';
import {
    ActivityIndicator,
    Animated,
    Dimensions,
    Text,
    View
} from 'react-native';

const { width } = Dimensions.get('window');

// ============================================
// TYPE DEFINITIONS
// ============================================
interface LoadingScreenProps {
    message?: string;
    submessage?: string;
}

interface AnimatedValue extends Animated.Value {
    _value: number;
}

// ============================================
// 1. ELEGANT MINIMAL LOADING SCREEN
// ============================================
export const ElegantLoadingScreen: React.FC<LoadingScreenProps> = ({
    message,
    submessage
}) => {
    const opacity = useRef(new Animated.Value(0.4)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(opacity, {
                    toValue: 0.4,
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, [opacity]);

    return (
        <LinearGradient
            colors={['#ffffff', '#f8f9ff']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            className="flex-1 items-center justify-center"
        >
            <Animated.View style={{ opacity }}>
                <View className="items-center">
                    <ActivityIndicator size="large" color="#3b82f6" />
                    <Text className="mt-6 text-lg font-semibold text-gray-900">
                        {message}
                    </Text>
                    <Text className="mt-2 text-sm text-gray-500">
                        {submessage}
                    </Text>
                </View>
            </Animated.View>
        </LinearGradient>
    );
};

// ============================================
// 2. ANIMATED DOTS LOADING SCREEN
// ============================================
export const DotsLoadingScreen: React.FC<LoadingScreenProps> = ({
    message = 'Loading',
    submessage = 'Authenticating your session',
}) => {
    const [dots, setDots] = useState<string>('');

    useEffect(() => {
        const interval = setInterval(() => {
            setDots((prev) => (prev.length < 3 ? prev + '.' : ''));
        }, 600);
        return () => clearInterval(interval);
    }, []);

    return (
        <LinearGradient
            colors={['#0f172a', '#1e293b']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="flex-1 items-center justify-center"
        >
            <View className="items-center">
                <View className="w-16 h-16 rounded-full border-4 border-slate-600 border-t-blue-500 animate-spin" />
                <Text className="mt-8 text-xl font-light text-white tracking-wide">
                    {message}
                    {dots}
                </Text>
                <Text className="mt-3 text-sm text-slate-400">
                    {submessage}
                </Text>
            </View>
        </LinearGradient>
    );
};

// ============================================
// 3. PULSING CIRCLE LOADING SCREEN
// ============================================
export const PulsingCircleLoadingScreen: React.FC<LoadingScreenProps> = ({
    message = 'Welcome',
    submessage = 'Securing your connection',
}) => {
    const scaleAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(scaleAnim, {
                    toValue: 1.3,
                    duration: 1200,
                    useNativeDriver: true,
                }),
                Animated.timing(scaleAnim, {
                    toValue: 1,
                    duration: 1200,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, [scaleAnim]);

    return (
        <LinearGradient
            colors={['#fef3c7', '#fed7aa']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="flex-1 items-center justify-center"
        >
            <View className="items-center">
                <Animated.View
                    style={{
                        transform: [{ scale: scaleAnim }],
                    }}
                    className="w-20 h-20 rounded-full bg-amber-600 opacity-20"
                />
                <View className="absolute w-16 h-16 rounded-full bg-amber-500 items-center justify-center">
                    <ActivityIndicator size="large" color="#b45309" />
                </View>

                <Text className="mt-12 text-2xl font-bold text-amber-900">
                    {message}
                </Text>
                <Text className="mt-3 text-sm text-amber-800 px-8 text-center">
                    {submessage}
                </Text>
            </View>
        </LinearGradient>
    );
};

// ============================================
// 4. GRADIENT SPINNER WITH TEXT
// ============================================
export const GradientSpinnerLoading: React.FC<LoadingScreenProps> = ({
    message = 'Initializing…',
    submessage = 'STAND BY',
}) => {
    const rotateAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.timing(rotateAnim, {
                toValue: 1,
                duration: 2000,
                useNativeDriver: true,
            })
        ).start();
    }, [rotateAnim]);

    const rotate = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <LinearGradient
            colors={['#1f2937', '#111827']}
            className="flex-1 items-center justify-center"
        >
            <View className="items-center">
                <Animated.View
                    style={{
                        transform: [{ rotate }],
                    }}
                    className="w-20 h-20 rounded-full border-4 border-gray-700 border-t-emerald-500 border-r-emerald-400"
                />

                <Text className="mt-10 text-xl font-semibold text-white">
                    {message}
                </Text>
                <Text className="mt-2 text-xs text-gray-400 tracking-widest">
                    {submessage}
                </Text>
            </View>
        </LinearGradient>
    );
};

// ============================================
// 5. MINIMALIST WITH PROGRESS TEXT
// ============================================
export const MinimalistProgressLoading: React.FC<LoadingScreenProps> = ({
    message = 'Signing you in securely…',
    submessage = 'Progress',
}) => {
    const [progress, setProgress] = useState<number>(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => (prev < 90 ? prev + Math.random() * 30 : prev));
        }, 800);
        return () => clearInterval(interval);
    }, []);

    return (
        <View className="flex-1 items-center justify-center bg-white px-8">
            <ActivityIndicator size="large" color="#000" />
            <Text className="mt-6 text-base font-medium text-gray-900 text-center">
                {message}
            </Text>

            {/* Progress bar */}
            <View className="mt-8 w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                <Animated.View
                    style={{
                        width: `${Math.min(progress, 100)}%`,
                    }}
                    className="h-full bg-black transition-all duration-500"
                />
            </View>

            <Text className="mt-6 text-xs text-gray-500">
                {Math.round(Math.min(progress, 100))}%
            </Text>
        </View>
    );
};

// ============================================
// 6. COLORFUL ANIMATED GRADIENT LOADER
// ============================================
export const ColorfulGradientLoading: React.FC<LoadingScreenProps> = ({
    message = 'Loading…',
    submessage = 'Getting things ready for you',
}) => {
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 800,
                    useNativeDriver: true,
                }),
                Animated.timing(opacity, {
                    toValue: 0.3,
                    duration: 800,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, [opacity]);

    return (
        <LinearGradient
            colors={['#ec4899', '#f43f5e', '#f97316', '#eab308']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="flex-1 items-center justify-center"
        >
            <Animated.View style={{ opacity }} className="items-center">
                <View className="w-24 h-24 rounded-2xl bg-white/20 items-center justify-center backdrop-blur-lg border border-white/30">
                    <ActivityIndicator size="large" color="#ffffff" />
                </View>

                <Text className="mt-8 text-2xl font-bold text-white text-center px-8">
                    {message}
                </Text>
                <Text className="mt-3 text-sm text-white/80">
                    {submessage}
                </Text>
            </Animated.View>
        </LinearGradient>
    );
};

// ============================================
// HOOK FOR EASY USAGE
// ============================================
export const useLoadingScreen = (
    screenType: 'elegant' | 'dots' | 'pulsing' | 'gradient' | 'progress' | 'colorful' = 'elegant',
    props?: LoadingScreenProps
): React.FC<LoadingScreenProps> => {
    const screens = {
        elegant: ElegantLoadingScreen,
        dots: DotsLoadingScreen,
        pulsing: PulsingCircleLoadingScreen,
        gradient: GradientSpinnerLoading,
        progress: MinimalistProgressLoading,
        colorful: ColorfulGradientLoading,
    };

    return screens[screenType];
};

// ============================================
// DEFAULT EXPORT - Choose your favorite!
// ============================================
const LoadingScreen: React.FC = () => {
    // Change this to any of the loading screens above
    return <ElegantLoadingScreen />;
};

export default LoadingScreen;