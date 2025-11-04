// app/profile.tsx
import React from 'react';
import { ScrollView, View } from 'react-native';
import { useColorScheme } from '@/components/useColorScheme'; // Assuming this provides 'light' or 'dark'
import Colors from '@/constants/Colors';
import ProfileHeader from './components/ProfileHeader';
import ProfileInventories from './components/ProfileInventories';
import ProfilePreferences from './components/ProfilePreferences';
import ProfileActions from './components/ProfileActions';
import System from './components/System';
import DeleteAccount from './components/DeleteAccount';



export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  return (
    <ScrollView className="flex-1 " style={{ backgroundColor: theme.background }}>
      <View style={{  paddingHorizontal: 10, paddingVertical: 5, gap: 5,marginBottom:100 }}>
        {/* Header Section */}
        <ProfileHeader />

        {/* Inventories Section */}
        <ProfileInventories />

        {/* Preferences Section */}
        <ProfilePreferences />

        {/* more Section */}
        <System />

        {/* Actions Section (Logout) */}
        <ProfileActions />

        {/* Delete Account Section */}
        <DeleteAccount />
      </View>
    </ScrollView>
  );
}