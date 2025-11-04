// components/ProfilePreferences.tsx
import React from 'react';
import { View, Text, TouchableOpacity, Switch } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import { ChevronRightIcon, Icon } from '@/components/ui/icon';

interface PreferenceItemProps {
    iconName: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
    title: string;
    type: 'toggle' | 'link';
    initialValue?: boolean;
    onValueChange?: (value: boolean) => void;
    onPress?: () => void;
}

const PreferenceItem: React.FC<PreferenceItemProps> = ({
    iconName,
    title,
    type,
    initialValue,
    onValueChange,
    onPress,
}) => {
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme ?? 'light'];
    const [value, setValue] = React.useState(initialValue || false);

    const handleToggle = (newValue: boolean) => {
        setValue(newValue);
        onValueChange?.(newValue);
    };

    return (
        <TouchableOpacity
            onPress={type === 'link' ? onPress : undefined}
            activeOpacity={type === 'link' ? 0.7 : 1}
            className="flex-row items-center justify-between rounded-xl "
            style={{ backgroundColor: theme.card, paddingVertical: 5 }}
        >
            <View className="flex-row items-center">
                <MaterialCommunityIcons name={iconName} size={24} color={theme.text} style={{ marginRight: 5 }} />
                <Text className="text-base" style={{ color: theme.text }}>
                    {title}
                </Text>
            </View>
            {type === 'toggle' ? (
                <Switch
                    value={value}
                    onValueChange={handleToggle}
                    trackColor={{ false: theme.alert, true: theme.tint }} // Adjust based on your theme
                    thumbColor={value ? theme.background : theme.background}
                />
            ) : (
                <Icon as={ChevronRightIcon} size="md" color={theme.text} />
            )}
        </TouchableOpacity>
    );
};

export default function ProfilePreferences() {
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme ?? 'light'];

    return (
        <View className=""
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
            <Text className="uppercase text-clip font-medium">Preferences</Text>
            <PreferenceItem
                iconName="bell-outline"
                title="Push notifications"
                type="toggle"
                initialValue={true}
                onValueChange={(val) => console.log('Push notifications:', val)}
            />
            <PreferenceItem
                iconName="form-textbox-password"
                title="Change Password"
                type="link"
                // initialValue={true}
                // onValueChange={(val) => console.log('Face ID:', val)}
                onPress={() => console.log("Change Password")}
            />
            <PreferenceItem
                iconName="cached"
                title="Clear Cache"
                type="link"
                onPress={() => console.log('Go to PIN Code settings')}
            />
        </View>
    );
}