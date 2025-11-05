// components/ProfileHeader.tsx
import React from 'react';
import { View, Text, Image } from 'react-native';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import { Button, ButtonText } from '@/components/ui/button';
import { Avatar, AvatarBadge, AvatarImage } from '@/components/ui/avatar';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Box } from '@/components/ui/box';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';

export default function ProfileHeader() {
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme ?? 'light'];

    return (
        <View className="items-left"
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
            }}>

            <HStack className="justify-between items-center mb-4">
                {/* Profile Picture */}
                <Avatar size="xl"  >
                    <AvatarImage
                        source={{
                            uri: "https://images.unsplash.com/photo-1506863530036-1efeddceb993",
                        }}
                    />
                    <AvatarBadge />
                </Avatar>

                {/* Stats */}
                <HStack className="flex-1 justify-center gap-8">
                    <VStack className="items-center">
                        <Text className="text-clip" style={{ color: theme.text }}>Total Posts</Text>
                        <Text className="text-clip font-semibold" style={{ color: theme.text }}>480</Text>
                    </VStack>
                    <VStack className="items-center">
                        <Text className="text-clip" style={{ color: theme.text }}>SOS Triggered</Text>
                        <Text className="text-clip font-semibold" style={{ color: theme.text }}>4</Text>
                    </VStack>
                </HStack>
            </HStack>

            <Text className="text-2xl font-semibold mb-1" style={{ color: theme.text }}>
                Coffeestories
            </Text>
            <HStack className="items-center"> 
                <Text className="text-clip" style={{ color: theme.text }}>Email: </Text>
                <Text style={{ color: theme.text, marginBottom: 5 }} >mark.brock@icloud.com</Text>
            </HStack>
            <HStack className="items-center"> 
                <Text className="text-clip" style={{ color: theme.text }}>Phone: </Text>
                <Text style={{ color: theme.text, marginBottom: 5 }} >9876543210</Text>
            </HStack>

            <Button
                size="md"
                variant="outline"
                onPress={() => console.log('Edit Profile')}
                style={{
                    borderRadius: theme.borderRadius,
                    borderColor: theme.tint,
                    backgroundColor: theme.tint,
                    marginTop:3
                }}
            >
                <ButtonText style={{color:theme.textSecondary}} >Edit profile</ButtonText>
                <FontAwesome6 name="edit" size={16} color={theme.background} />
            </Button>
        </View>
    );
}
