// components/ProfileInventories.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import { ChevronRightIcon, Icon } from '@/components/ui/icon';
import Ionicons from '@expo/vector-icons/Ionicons';

interface InventoryItemProps {
    iconName: React.ComponentProps<typeof Ionicons>['name'];
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
            className="flex-row items-center justify-between py-3 px-4 rounded-xl mb-2"
            style={{ backgroundColor: theme.card }}
        >
            <View className="flex-row items-center">
                <Ionicons name={iconName} size={24} color={theme.text} className="mr-3" />
                <Text className="text-base" style={{ color: theme.text }}>
                    {title}
                </Text>
            </View>
            <View className="flex-row items-center">
                {count !== undefined && (
                    <View className="bg-green-500 rounded-full w-6 h-6 items-center justify-center mr-2">
                        <Text className="text-white text-xs font-bold">{count}</Text>
                    </View>
                )}
                <Icon as={ChevronRightIcon} size="md" color={theme.text} />
            </View>
        </TouchableOpacity>
    );
};

export default function ProfileInventories() {
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme ?? 'light'];

    return (
        <View className="mb-8"
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
            <Text className="text-gray-500 uppercase text-xs font-medium mb-3 ml-1">Inventories</Text>
            <InventoryItem
                iconName="storefront-outline"
                title="My stores"
                count={2}
                onPress={() => console.log('Go to My Stores')}
            />
            <InventoryItem
                iconName="recording-outline"
                title="My Recordings"
                onPress={() => console.log('Go to My Recordings')}
            />
        </View>
    );
}