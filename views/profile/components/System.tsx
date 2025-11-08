// components/ProfileInventories.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/utils/constants/Colors';
import { ChevronRightIcon, Icon } from '@/components/ui/icon';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

interface InventoryItemProps {
    iconName: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
    title: string;
    count?: number;
    onPress: () => void;
}

const InventoryItem: React.FC<InventoryItemProps> = ({ iconName, title, count, onPress }) => {
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme ?? 'light'];

    return (
        <TouchableOpacity
            onPress={onPress}
            className="flex-row items-center justify-between rounded-xl mb-2"
            style={{ backgroundColor: theme.card, paddingVertical: 5 }}
        >
            <View className="flex-row items-center">
                <MaterialCommunityIcons name={iconName} size={24} color={theme.text} style={{ marginRight: 5 }} />

                <Text className="text-base" style={{ color: theme.text }}>
                    {title}
                </Text>
            </View>
            <View className="flex-row items-center">
                {count !== undefined && (
                    <View className=" rounded-full w-6 h-6 items-center justify-center mr-2">
                        <Text className="text-xs font-bold">{count}</Text>
                    </View>
                )}
                <Icon as={ChevronRightIcon} size="md" color={theme.text} />
            </View>
        </TouchableOpacity>
    );
};

export default function System() {
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme ?? 'light'];

    return (
        <View
            style={{
                marginBottom: 10,
                backgroundColor: theme.card,
                borderRadius: theme.borderRadius,
                shadowColor: theme.shadowColor,
                shadowOffset: theme.shadowOffset,
                shadowOpacity: theme.shadowOpacity,
                shadowRadius: theme.shadowRadius,
                elevation: theme.elevation,
                padding: 20,
            }}
        >
            <Text className="uppercase text-clip font-medium" style={{ color: theme.text, marginBottom: 5 }}>More</Text>

            <InventoryItem
                iconName="shield-account-outline"
                title="Privacy & Policy"
                onPress={() => console.log('Go to Privacy & Policy')}
            />

            <InventoryItem
                iconName="file-document-outline"
                title="Terms & Conditions"
                onPress={() => console.log('Go to Terms & Conditions')}
            />

            <InventoryItem
                iconName="information-outline"
                title="About Us"
                onPress={() => console.log('Go to About Us')}
            />

            <InventoryItem
                iconName="email-outline"
                title="Contact Us"
                onPress={() => console.log('Go to Contact Us')}
            />

            <InventoryItem
                iconName="star-outline"
                title="Rate Us"
                onPress={() => console.log('Go to Rate Us')}
            />


        </View>
    );
}