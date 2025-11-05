import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { useColorScheme } from "@/components/useColorScheme";
import Colors from "@/constants/Colors";
import { useRouter } from "expo-router";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Feather from '@expo/vector-icons/Feather';

export default function EmergencyPlaces({ iconName, heading, place }: { iconName: any, heading: string, place: string }) {
    const router = useRouter();
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme ?? `light`];
    return (


        <Card
            size="sm"
            variant="outline"
            style={{
                borderRadius: theme.borderRadius,
                borderColor: theme.tintSecondary,
                backgroundColor: theme.background,
                shadowColor: theme.shadowColor,
                shadowOffset: theme.shadowOffset,
                shadowOpacity: theme.shadowOpacity,
                shadowRadius: theme.shadowRadius,
                elevation: theme.elevation,
            }}
        >
            <TouchableOpacity onPress={() => { router.push('/appComponent/download') }} >
                <HStack className="gap-4">

                    <Box className="justify-center">
                        <MaterialCommunityIcons name={iconName} size={24} color="black" />
                    </Box>

                    <Box className="flex-1 justify-center">

                        <Heading size="lg" className="mb-1">
                            {heading}
                        </Heading>
                    </Box>
                    <Box className="justify-center">
                        {/* <Button style={{
                            backgroundColor: theme.background,
                        }}
                        > */}
                            <Feather name="arrow-right-circle" size={24} color={theme.tint} />
                        {/* </Button> */}
                    </Box>
                </HStack>
            </TouchableOpacity >
        </Card>
    )
}