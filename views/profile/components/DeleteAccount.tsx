// components/ProfileActions.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function DeleteAccount() {
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme ?? 'light'];

    return (
        <View
            style={{
                // marginBottom: 20,
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
                onPress={() => console.log('Logout')}
                className="flex-row items-center justify-center py-5 px-4 "
                style={{ backgroundColor: theme.card, height: 50, borderRadius: theme.borderRadius }}
            >
                <MaterialCommunityIcons name="account-cancel-outline" size={24} color="red" style={{ marginRight: 5 }} />
                {/* <AntDesign name="user-delete" size={24} color="red" style={{ marginRight: 5 }} /> */}
                <Text style={{ color: theme.text, fontSize: 16 }} >Delete Account</Text>
            </TouchableOpacity>
        </View>
    );
}