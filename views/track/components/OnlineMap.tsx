import Colors from "@/utils/constants/Colors";
import * as Location from "expo-location";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  useColorScheme,
  View
} from "react-native";
import MapView, {
  Marker,
  Polyline,
  PROVIDER_DEFAULT,
  UrlTile,
} from "react-native-maps";

interface LocationState {
  latitude: number;
  longitude: number;
}

const OnlineMap = () => {
  const [location, setLocation] = useState<LocationState | null>(null);
  const [destination, setDestination] = useState<LocationState | null>(null);
  const [loading, setLoading] = useState(true);
  const [routeCoords, setRouteCoords] = useState<any[]>([]);
  const mapRef = useRef<MapView>(null);

  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  // Get current location
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission denied", "Location access is required.");
        return;
      }
      let loc = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });
      setLoading(false);
    })();
  }, []);

  // Fetch route from current location → destination
  const fetchRoute = async () => {
    if (!location || !destination) return;
    try {
      const res = await fetch(
        `https://router.project-osrm.org/route/v1/driving/${location.longitude},${location.latitude};${destination.longitude},${destination.latitude}?overview=full&geometries=geojson`
      );
      const data = await res.json();
      const coords = data.routes[0].geometry.coordinates.map(([lon, lat]: [number, number]) => ({
        latitude: lat,
        longitude: lon,
      }));
      setRouteCoords(coords);
    } catch (err) {
      Alert.alert("Routing Error", "Failed to fetch route");
    }
  };

  // SOS alert function (send to server or trigger alert)
  const handleSOS = async () => {
    if (!location) return;
    Alert.alert("🚨 SOS Triggered", `Location: ${location.latitude}, ${location.longitude}`);
    // Example POST (replace with your endpoint)
    // await fetch('https://your-api/sos', { method: 'POST', body: JSON.stringify(location) })
  };

  const handleLongPress = (e: any) => {
    const coord = e.nativeEvent.coordinate;
    setDestination(coord);
    fetchRoute();
  };


  const recenter = () => {
    if (location) {
      mapRef.current?.animateToRegion({
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }
  };

  if (loading || !location) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_DEFAULT}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        showsUserLocation
        onLongPress={handleLongPress}
      >
        <UrlTile
          // urlTemplate="https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=jDgfJYvIrKEVpUffNXOZ"
          urlTemplate="https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png"
          maximumZ={19}
        />
        {destination && <Marker coordinate={destination} title="Destination" />}
        {routeCoords.length > 0 && (
          <Polyline coordinates={routeCoords} strokeWidth={5} strokeColor={`${theme.alert}`} />
        )}
      </MapView>

      {/* Floating Controls */}
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  centered: { justifyContent: "center", alignItems: "center" },
  map: { width: "100%", height: "100%" },
  controls: {
    position: "absolute",
    right: 20,
    bottom: 100,
    gap: 15,
  },
  controlButton: {
    backgroundColor: "#2196F3",
    width: 55,
    height: 55,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
  },
});

export default OnlineMap;
