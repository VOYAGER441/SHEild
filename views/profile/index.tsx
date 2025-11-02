// app/profile.tsx
import React from 'react';
import { ScrollView, View } from 'react-native';
import { useColorScheme } from '@/components/useColorScheme'; // Assuming this provides 'light' or 'dark'
import Colors from '@/constants/Colors';
import ProfileHeader from './components/ProfileHeader';
import ProfileInventories from './components/ProfileInventories';
import ProfilePreferences from './components/ProfilePreferences';
import ProfileActions from './components/ProfileActions';

// Import your custom components
// import ProfileHeader from '@/components/ProfileHeader';
// import ProfileInventories from '@/components/ProfileInventories';
// import ProfilePreferences from '@/components/ProfilePreferences';
// import ProfileActions from '@/components/ProfileActions';

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  return (
    <ScrollView className="flex-1 " style={{ backgroundColor: theme.background }}>
      <View style={{ marginTop: 20, paddingHorizontal: 10, paddingVertical: 5, gap: 5 }}>
        {/* Header Section */}
        <ProfileHeader />

        {/* Inventories Section */}
        <ProfileInventories />

        {/* Preferences Section */}
        <ProfilePreferences />

        {/* Actions Section (Logout) */}
        <ProfileActions />
      </View>
    </ScrollView>
  );
}