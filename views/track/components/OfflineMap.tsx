import { View, Text } from 'react-native'
import { useColorScheme } from '@/components/useColorScheme'
import React from 'react'
import Colors from '@/utils/constants/Colors';

const OfflineMap = () => {
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme ?? "light"];
    return (
        <View style={{  }}>
            <Text>Offline Map</Text>
        </View>
    )
  
}

export default OfflineMap