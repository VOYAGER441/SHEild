import { View, Text, ScrollView, Alert, StyleSheet } from "react-native"; // Import StyleSheet
import React, { useState } from "react";
import Colors from "@/utils/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";

// Import your new components
import EmergencyButton from "./components/EmergencyButton";
import RecordEvidenceButton from "./components/RecordEvidenceButton";
import EmergencyContactsList from "./components/EmergencyContactsList";
import LocationSharingStatus from "./components/LocationSharingStatus";
import SafetyCheckInButton from "./components/SafetyCheckInButton";
import AlarmToggle from "./components/AlarmToggle";
import SafetyTipsSection from "./components/SafetyTipsSection";

export default function SOS() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  const [isRecording, setIsRecording] = useState(false);
  const [isLocationActive, setIsLocationActive] = useState(true);
  const [alarmActive, setAlarmActive] = useState(false);

  // Dummy data for contacts
  const dummyContacts = [
    { id: "1", name: "Mom", avatar: "https://randomuser.me/api/portraits/women/1.jpg", isGuardian: true },
    { id: "2", name: "Best Friend", avatar: "https://randomuser.me/api/portraits/women/2.jpg" },
    { id: "3", name: "John", avatar: "https://randomuser.me/api/portraits/men/3.jpg" },
  ];

  const handleSOSPress = () => {
    Alert.alert(
      "SOS Activated!",
      "Emergency contacts have been notified with your location.",
      [{ text: "OK", onPress: () => console.log("SOS alert acknowledged") }]
    );
    // In a real app, this would trigger API calls to send alerts
  };

  const handleRecordEvidence = () => {
    setIsRecording(!isRecording);
    Alert.alert(
      "Recording",
      isRecording ? "Video recording stopped." : "Video recording started. This will be sent to your contacts.",
      [{ text: "OK" }]
    );
    // Logic for starting/stopping video/audio recording
  };

  const handleCallContact = (contactId: string) => {
    const contact = dummyContacts.find(c => c.id === contactId);
    if (contact) {
      Alert.alert(`Calling ${contact.name}...`);
      // In a real app, use Linking.openURL(`tel:${contact.phoneNumber}`)
    }
  };

  const handleCheckInSafe = () => {
    Alert.alert(
      "Checked In Safe",
      "Your emergency contacts have been notified that you are safe.",
      [{ text: "OK" }]
    );
    // Logic to send "I'm Safe" notification
  };

  const handleAlarmToggle = (isActive: boolean) => {
    setAlarmActive(isActive);
    Alert.alert(
      "Alarm Status",
      isActive ? "Loud alarm activated!" : "Alarm deactivated.",
      [{ text: "OK" }]
    );
    // Logic to play/stop alarm sound
  };

  return (
    <ScrollView
      className="flex-1"
      style={{ backgroundColor: theme.background }}
    // contentContainerStyle={styles.scrollViewContent} // Use StyleSheet for contentContainerStyle
    >
      <View style={{ paddingHorizontal: 2, paddingVertical: 5, gap: 5, marginBottom: 150 }}>
        {/* Main SOS Button Container */}
        <View className="relative items-center justify-center">
          <EmergencyButton onPress={handleSOSPress} />

          <View  style={{ marginTop: 15 }}>
            <AlarmToggle onToggle={handleAlarmToggle} initialState={alarmActive} />
          </View>
        </View>

        {/* don't need this components it automatically trigger */}
        {/* Record Evidence Button positioned relative to SOS button
          <View className="relative "> 
            <RecordEvidenceButton onPress={handleRecordEvidence} isRecording={isRecording} />
          </View> */}

        <View className="w-full" style={{ marginTop: 15 }}>
          <EmergencyContactsList contacts={dummyContacts} onCallContact={handleCallContact} />
        </View>

        <View className="w-full px-3 mt-6">
          <LocationSharingStatus isActive={isLocationActive} contactsCount={dummyContacts.length} />
        </View>

        <View className="w-full px-3 " style={{ marginTop: 10 }}>
          <SafetyCheckInButton onPress={handleCheckInSafe} />
        </View>


        <View className="w-full px-3 " style={{ marginTop: 10 }}>
          <SafetyTipsSection />
        </View>



      </View>
    </ScrollView>
  );
}

