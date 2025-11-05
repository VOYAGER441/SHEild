// components/sos/EmergencyContactsList.tsx
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface Contact {
  id: string;
  name: string;
  avatar: string; // URL or local image path
  isGuardian?: boolean;
}

interface EmergencyContactsListProps {
  contacts: Contact[];
  onCallContact?: (contactId: string) => void;
}

export default function EmergencyContactsList({ contacts, onCallContact }: EmergencyContactsListProps) {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  const renderContactItem = ({ item }: { item: Contact }) => (
    <View
      className="flex-row items-center p-3 mb-2 rounded-lg"
      style={{ backgroundColor: theme.card }}
    >
      <Image
        source={{ uri: item.avatar }}
        className="w-10 h-10 rounded-full mr-3"
      />
      <View className="flex-1">
        <Text className="text-base font-semibold" style={{ color: theme.text }}>
          {item.name}
        </Text>
        {item.isGuardian && (
          <Text className="text-sm" style={{ color: theme.textSecondary }}>
            Guardian
          </Text>
        )}
      </View>
      {onCallContact && (
        <TouchableOpacity onPress={() => onCallContact(item.id)} className="p-2 ml-2">
          <MaterialCommunityIcons name="phone" size={20} color={theme.tint} />
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View className="w-full px-4 mt-4">
      <Text className="text-lg font-bold mb-3" style={{ color: theme.text }}>
        Emergency Contacts
      </Text>
      <FlatList
        data={contacts}
        renderItem={renderContactItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 5 }}
      />
    </View>
  );
}