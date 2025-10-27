import { View, Text, Animated, Easing, useColorScheme, ScrollView, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Box } from '@/components/ui/box';
import { ButtonText, Button } from '@/components/ui/button';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
// Assuming 'Colors' comes from a global theme context or similar, as it's not standard React Native
// For NativeWind, typically you'd just use tailwind classes directly, or configure theme.
// If Colors is essential for dynamic theme, ensure it's properly imported or defined.
// For simplicity, I'll primarily rely on NativeWind classes for colors here.
// import { Colors } from 'react-native/Libraries/NewAppScreen'; // This might not be directly compatible with gluestack/nativewind

// Define a type for a downloaded map item
interface DownloadedMap {
    id: string;
    name: string;
    sizeMB: number;
    downloadedDate: string; // Or a Date object
    isUpdateAvailable: boolean;
}

const DownloadedMapsScreen = () => {
    const colorScheme = useColorScheme();
    // In a real app, you'd define your theme colors, e.g., via NativeWind config or a custom context.
    // For this example, we'll use generic dark/light classes.
    const isDarkMode = colorScheme === 'dark';
    const router = useRouter();

    // --- State for Downloaded Maps Data ---
    const [downloadedMaps, setDownloadedMaps] = useState<DownloadedMap[]>([
        { id: '1', name: 'My Home City', sizeMB: 180, downloadedDate: 'Oct 20, 2023', isUpdateAvailable: false },
        { id: '2', name: 'Vacation USA (California Coast)', sizeMB: 650, downloadedDate: 'Nov 5, 2023', isUpdateAvailable: true },
        { id: '3', name: 'London & South East', sizeMB: 300, downloadedDate: 'Nov 18, 2023', isUpdateAvailable: false },
        { id: '4', name: 'Europe (Germany & France)', sizeMB: 1200, downloadedDate: 'Dec 1, 2023', isUpdateAvailable: true },
    ]);

    const totalStorageUsedMB = downloadedMaps.reduce((sum, map) => sum + map.sizeMB, 0);
    const totalStorageUsedGB = (totalStorageUsedMB / 1024).toFixed(1);

    // Simulate device total storage and free storage
    const totalDeviceStorageGB = 128; // Example total storage
    const availableStorageMB = 20 * 1024 - totalStorageUsedMB; // Example, assume 20GB free initially
    const availableStorageGB = (availableStorageMB / 1024).toFixed(1);

    // --- Animation values ---
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(50)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
                easing: Easing.out(Easing.ease),
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
                easing: Easing.out(Easing.ease),
            }),
        ]).start();
    }, []);

    const handleBack = () => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 50,
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start(() => {
            router.back();
        });
    };

    const handleViewMap = (mapId: string) => {
        console.log(`Viewing map: ${mapId}`);
        // In a real app, navigate to your map screen and pass the mapId to load the specific offline map
        // router.push({ pathname: '/map', params: { offlineMapId: mapId } });
        Alert.alert("View Map", `Navigating to view ${mapId}`);
    };

    const handleUpdateMap = (mapId: string) => {
        console.log(`Updating map: ${mapId}`);
        // Simulate update logic
        setDownloadedMaps(prevMaps =>
            prevMaps.map(map =>
                map.id === mapId ? { ...map, isUpdateAvailable: false, downloadedDate: 'Just Updated' } : map
            )
        );
        Alert.alert("Update Map", `Map ${mapId} is being updated.`);
    };

    const handleDeleteMap = (mapId: string) => {
        Alert.alert(
            "Delete Map",
            "Are you sure you want to delete this map? This action cannot be undone.",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: () => {
                        console.log(`Deleting map: ${mapId}`);
                        setDownloadedMaps(prevMaps => prevMaps.filter(map => map.id !== mapId));
                        Alert.alert("Deleted", `Map ${mapId} has been deleted.`);
                    },
                },
            ],
            { cancelable: true }
        );
    };

    const handleDownloadNewArea = () => {
        console.log("Navigating to Download New Area screen");
        // In a real app, navigate to the screen where users select an area to download
        // router.push('/track/download-new-map');
        Alert.alert("Download New Area", "Navigating to map selection for download.");
    };

    return (
        <Box className={`flex-1 ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
            <Animated.View
                style={{
                    opacity: fadeAnim,
                    transform: [{ translateY: slideAnim }],
                    flex: 1, // Allow content to take full height
                }}
                className="w-full h-full"
            >
                {/* Header */}
                <View className={`p-4 gap-2 flex-row items-center ${isDarkMode ? 'bg-gray-800' : 'bg-green-700'}`}>
                    <TouchableOpacity onPress={handleBack} className="p-2 -ml-2">
                        <Ionicons name="arrow-back-circle-outline" size={40} color="black" />
                    </TouchableOpacity>
                    <Text className="text-white text-xl font-bold ml-4 flex-1">Downloaded Maps</Text>
                    
                </View>

                {/* Storage Info */}
                <Box className={`p-4 flex-row justify-between items-center border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    <View>
                        <Text className={`text-base font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                            {totalStorageUsedGB} GB used Maps
                        </Text>
                    </View>
                    <Text className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {availableStorageGB} GB Free
                    </Text>
                </Box>

                {/* List of Downloaded Maps */}
                <ScrollView className="flex-1 p-4">
                    {downloadedMaps.length > 0 ? (
                        downloadedMaps.map((map) => (
                            <Box
                                key={map.id}
                                className={`flex-row items-center justify-between p-4 mb-3 rounded-lg shadow-sm ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
                            >
                                <View className="flex-1 mr-4">
                                    <Text className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{map.name}</Text>
                                    <Text className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{map.sizeMB} MB</Text>
                                    <Text className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Downloaded: {map.downloadedDate}</Text>
                                </View>
                                <View className="flex-row items-center gap-2">
                                    <Button
                                        onPress={() => handleViewMap(map.id)}
                                        size="sm"
                                        action="primary"
                                        className="mr-2"
                                    >
                                        <ButtonText>View Map</ButtonText>
                                    </Button>
                                    {/* {map.isUpdateAvailable && (
                                        <Button
                                            onPress={() => handleUpdateMap(map.id)}
                                            size="sm"
                                            action="secondary" // Or a custom update style
                                            className="mr-2"
                                        >
                                            <ButtonText>Update</ButtonText>
                                        </Button>
                                    )} */}
                                    <Button onPress={() => handleDeleteMap(map.id)} size="sm" className="mr-2">
                                        {/* Using a simple text icon for delete, consider an actual icon component */}
                                        <ButtonText>Delete Map</ButtonText>
                                    </Button>
                                </View>
                            </Box>
                        ))
                    ) : (
                        <Box className="flex-1 items-center justify-center p-8">
                            <Text className={`text-lg text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                No offline maps downloaded yet.
                            </Text>
                        </Box>
                    )}

                    {/* Spacer for bottom button */}
                    <View className="h-20" />
                </ScrollView>

                {/* Download New Area Button (Fixed at bottom) */}
                <Box
                    className={`absolute bottom-0 left-0 right-0 p-4 ${isDarkMode ? 'bg-gray-900' : 'bg-white'} border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}
                >
                    <Button
                        onPress={handleDownloadNewArea}
                        size="lg"
                        action="primary"
                    >
                        <ButtonText>Download New Area</ButtonText>
                    </Button>
                </Box>
            </Animated.View>
        </Box>
    );
};

export default DownloadedMapsScreen;