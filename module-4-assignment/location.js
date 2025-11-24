import React, { useState, useEffect } from "react";
import { Text, View, ActivityIndicator } from "react-native";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import styles from "./styles";

// Displays users current location
export default function WhereAmI() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  // Get permission for location
  useEffect(() => {
    let watcher;

    async function getLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission denied");
        return;
      }

      //get current location
      let current = await Location.getCurrentPositionAsync({});
      setLocation(current.coords);

      watcher = await Location.watchPositionAsync(
        { accuracy: Location.LocationAccuracy.Highest },
        ({ coords }) => setLocation(coords)
      );
    }

    getLocation();

    return () => {
      watcher?.remove();
    };
  }, []);

  // loading screen while waiting for location
  if (!location) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
        <Text>Getting location...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapView}
        showsUserLocation
        followUserLocation
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {/* Restraunts Markers */}
        <Marker
          title="Another Broken Egg"
          description="Breakfast & Brunch"
          coordinate={{
            latitude: 39.92536068252447,
            longitude: -86.15617507444377,
          }}
        />
      </MapView>

      <Text style={styles.label}>Latitude: {location.latitude}</Text>
      <Text style={styles.label}>Longitude: {location.longitude}</Text>
      {errorMsg && <Text style={styles.error}>{errorMsg}</Text>}
    </View>
  );
}
