// components/sos/EmergencyContactsList.tsx
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "@/utils/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import utils from "@/utils";

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
      style={{
        backgroundColor: theme.background,
        borderRadius: theme.borderRadius,
        shadowColor: theme.shadowColor,
        shadowOffset: theme.shadowOffset,
        shadowOpacity: theme.shadowOpacity,
        shadowRadius: theme.shadowRadius,
        elevation: theme.elevation,
        margin: 5
      }}
    >
      <Avatar
        className="w-10 h-10 rounded-full mr-3"
      >
        <AvatarImage source={{ uri: item.avatar }} />
      </Avatar>
      <View className="flex-1">
        <Text className="text-base font-semibold px-3" style={{ color: theme.text }}>
          {item.name}
        </Text>
        {item.isGuardian && (
          <Text className="text-sm px-3" style={{ color: utils.commonFunction.adjustColorBrightness(theme.text, 0.2) }}>
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
    <View className="w-full px-4">
      <Text className="text-xl font-bold" style={{ color: theme.text, textAlign: "center", marginBottom: 5 }}>
        Emergency Contacts
      </Text>
      <View
        style={{
          padding: 10,
          backgroundColor: theme.card,
          borderRadius: theme.borderRadius,
          shadowColor: theme.shadowColor,
          shadowOffset: theme.shadowOffset,
          shadowOpacity: theme.shadowOpacity,
          shadowRadius: theme.shadowRadius,
          elevation: theme.elevation,
        }}>

        {contacts.map((item) => (
          <View key={item.id}>
            {renderContactItem({ item })}
          </View>
        ))}
      </View>
    </View>
  );
}