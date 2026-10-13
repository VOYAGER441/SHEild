'use client';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { router } from 'expo-router';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/utils/constants/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import utils from '@/utils';
import userService from '@/services/user.service';
import { useShowToast } from '../global.Components/ErrorToast';

const { USER_ROLE, PICKABLE_ROLES } = utils.appConstant;

const ROLE_META: Record<string, { title: string; subtitle: string; icon: keyof typeof MaterialCommunityIcons.glyphMap }> = {
    [USER_ROLE.WOMEN]: {
        title: 'Woman',
        subtitle: 'Personal safety, SOS alerts, live location & community support',
        icon: 'heart',
    },
    [USER_ROLE.PARENT]: {
        title: 'Parent',
        subtitle: 'Track your family, receive alerts & stay connected',
        icon: 'account-heart-outline',
    },
    [USER_ROLE.CHILD]: {
        title: 'Child',
        subtitle: 'Simple SOS help screen for your trusted contacts',
        icon: 'account-star-outline',
    },
    [USER_ROLE.ALZHEIMER_PATIENT]: {
        title: 'Alzheimer Patient',
        subtitle: 'Simple big-button help screen for patients & caregivers',
        icon: 'brain',
    },
};

export default function RoleScreen() {
    const colorScheme = useColorScheme();
    const showToast = useShowToast();
    const theme = Colors[colorScheme ?? 'light'];
    const [busy, setBusy] = useState<string | null>(null);

    const handlePick = async (role: string) => {
        if (busy) return;
        setBusy(role);
        try {
            await userService.updateUserRole(role);
            router.replace('/(tabs)');
        } catch (error: any) {
            const msg = error?.response?.data?.message || error?.message || 'Could not save your role';
            showToast.error(msg);
        } finally {
            setBusy(null);
        }
    };

    return (
        <ScrollView
            style={{ backgroundColor: theme.background }}
            contentContainerStyle={styles.content}
        >
            <Text style={[styles.heading, { color: theme.text }]}>Who are you using SHEild as?</Text>
            <Text style={[styles.subheading, { color: theme.text }]}>
                Pick the option that fits you best. This changes the app screens you see.
            </Text>

            {PICKABLE_ROLES.map((role: string) => {
                const meta = ROLE_META[role];
                const selected = busy === role;
                return (
                    <TouchableOpacity
                        key={role}
                        activeOpacity={0.8}
                        disabled={busy !== null}
                        onPress={() => handlePick(role)}
                        style={[
                            styles.card,
                            {
                                backgroundColor: theme.card,
                                shadowColor: theme.shadowColor,
                                opacity: busy && !selected ? 0.6 : 1,
                            },
                        ]}
                    >
                        <View style={[styles.iconWrap, { backgroundColor: theme.tint }]}>
                            <MaterialCommunityIcons name={meta.icon} size={30} color="#FFFFFF" />
                        </View>
                        <View style={styles.cardText}>
                            <Text style={[styles.cardTitle, { color: theme.text }]}>{meta.title}</Text>
                            <Text style={[styles.cardSubtitle, { color: theme.text }]}>{meta.subtitle}</Text>
                        </View>
                        {selected ? (
                            <ActivityIndicator size="small" color={theme.tint} />
                        ) : (
                            <MaterialCommunityIcons name="chevron-right" size={26} color={theme.tabIconDefault} />
                        )}
                    </TouchableOpacity>
                );
            })}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    content: {
        paddingTop: 80,
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    heading: {
        fontSize: 26,
        fontWeight: '700',
        marginBottom: 8,
    },
    subheading: {
        fontSize: 15,
        opacity: 0.7,
        marginBottom: 30,
        lineHeight: 21,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 18,
        padding: 16,
        marginBottom: 14,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.12,
        shadowRadius: 6,
        elevation: 3,
    },
    iconWrap: {
        width: 54,
        height: 54,
        borderRadius: 27,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 14,
    },
    cardText: {
        flex: 1,
    },
    cardTitle: {
        fontSize: 17,
        fontWeight: '600',
        marginBottom: 3,
    },
    cardSubtitle: {
        fontSize: 13,
        opacity: 0.65,
        lineHeight: 17,
    },
});
