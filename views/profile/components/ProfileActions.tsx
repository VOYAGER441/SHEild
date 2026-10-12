// components/ProfileActions.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/utils/constants/Colors';
import { RelativePathString, useRouter } from 'expo-router';
import authService from '@/services/auth.service';

export default function ProfileActions() {
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme ?? 'light'];

    const router = useRouter();

    const handleLogout = async () => {
        try {
            // Sign out of Google on the device and clear the secure token store
            await authService.logout();
        } catch (error) {
            console.warn('Logout error:', error);
        }
        router.replace('/login' as RelativePathString);
    };

    return (
        <View
            style={{
                marginBottom: 5,
                backgroundColor: theme.alert,
                borderRadius: theme.borderRadius,
                shadowColor: theme.shadowColor,
                shadowOffset: theme.shadowOffset,
                shadowOpacity: theme.shadowOpacity,
                shadowRadius: theme.shadowRadius,
                elevation: theme.elevation,
                padding: 5,

            }}
        >
            <TouchableOpacity
                onPress={handleLogout}
                className="flex-row items-center justify-center py-5 px-4 "
                style={{ backgroundColor: theme.card, height: 50, borderRadius: theme.borderRadius }}
            >
                <MaterialCommunityIcons name="logout" size={24} color="red" style={{ marginRight: 5 }} />
                <Text style={{ color: theme.text, fontSize: 16 }}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
}