import React, { useEffect, useRef } from "react";
import { Animated, Easing, View, StyleSheet } from "react-native";
import { Text } from "@/components/ui/text";
import { IMessage } from "@/interface/request/shield/sheild.interface";
import { useColorScheme } from "@/components/useColorScheme";
import Colors from "@/constants/Colors";

interface MessageBubbleProps extends IMessage {
    isLoading: boolean;
}

export const MessageBubble = ({ text, isUser, isLoading }: MessageBubbleProps) => {
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme ?? `light`];
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(20)).current;
    
    // Animation for loading dots
    const dot1Anim = useRef(new Animated.Value(0)).current;
    const dot2Anim = useRef(new Animated.Value(0)).current;
    const dot3Anim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 250,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 250,
                easing: Easing.out(Easing.ease),
                useNativeDriver: true,
            }),
        ]).start();
        
        // Start dot animation if loading
        if (isLoading) {
            const animateDot = (animValue: Animated.Value) => {
                return Animated.sequence([
                    Animated.timing(animValue, {
                        toValue: 1,
                        duration: 400,
                        useNativeDriver: true,
                    }),
                    Animated.timing(animValue, {
                        toValue: 0,
                        duration: 400,
                        useNativeDriver: true,
                    })
                ]);
            };
            
            Animated.loop(
                Animated.stagger(200, [
                    animateDot(dot1Anim),
                    animateDot(dot2Anim),
                    animateDot(dot3Anim)
                ])
            ).start();
        }
    }, [isLoading]);

    const LoadingDots = () => (
        <View style={styles.loadingContainer}>
            <Animated.View 
                style={[
                    styles.dot, 
                    { 
                        backgroundColor: isUser ? theme.textSecondary : theme.text,
                        opacity: dot1Anim
                    }
                ]} 
            />
            <Animated.View 
                style={[
                    styles.dot, 
                    { 
                        backgroundColor: isUser ? theme.textSecondary : theme.text,
                        opacity: dot2Anim
                    }
                ]} 
            />
            <Animated.View 
                style={[
                    styles.dot, 
                    { 
                        backgroundColor: isUser ? theme.textSecondary : theme.text,
                        opacity: dot3Anim
                    }
                ]} 
            />
        </View>
    );

    return (
        <Animated.View
            style={{
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
                alignSelf: isUser ? "flex-end" : "flex-start",
                maxWidth: "85%",
                backgroundColor: isUser ? theme.tint : theme.card,
                paddingVertical: 10,
                paddingHorizontal: 14,
                borderRadius: 18,
                marginVertical: 4,
                borderBottomRightRadius: isUser ? 4 : 18,
                borderBottomLeftRadius: isUser ? 18 : 4,
                shadowColor: theme.shadowColor,
                shadowOpacity: theme.shadowOpacity,
                shadowRadius: theme.shadowRadius,
                shadowOffset: theme.shadowOffset,
                elevation: theme.elevation,
            }}
        >
            {isLoading ? (
                <LoadingDots />
            ) : (
                <Text
                    className="text-[15px]"
                    style={{
                        color: isUser ? theme.textSecondary : theme.text,
                        lineHeight: 20,
                    }}
                >
                    {text}
                </Text>
            )}
        </Animated.View>

        
    );
};

const styles = StyleSheet.create({
    loadingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 5,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 2,
    }
});
