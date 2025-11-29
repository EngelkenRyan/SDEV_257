import React, { useState, useEffect } from "react";
import { Text, View, ActivityIndicator, Platform } from "react-native";
import * as Location from "expo-location";
import styles from "./styles";

// Stops crashing on web
const MapView =
  Platform.OS === "web" ? null : require("react-native-maps").default;
const Marker =
  Platform.OS === "web" ? null : require("react-native-maps").Marker;

// Displays users current location
export default function WhereAmI() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    let watcher;

    // Get location
    async function getLocation() {
      // Web location support
      if (Platform.OS === "web") {
        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(
            (pos) =>
              setLocation({
                latitude: pos.coords.latitude,
                longitude: pos.coords.longitude,
              }),
            () => setErrorMsg("Location denied")
          );

          // Web location updates
          watcher = navigator.geolocation.watchPosition((pos) =>
            setLocation({
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude,
            })
          );
        } else {
          setErrorMsg("Geolocation not supported");
        }
        return;
      }

      // Permission request
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission denied");
        return;
      }

      // Get current location
      let current = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
        timeout: 15000,
        maximumAge: 10000,
      });
      setLocation(current.coords);

      // Location updates
      watcher = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.BestForNavigation,
          timeInterval: 2000,
          distanceInterval: 5,
        },
        (loc) => setLocation(loc.coords)
      );
    }

    getLocation();

    return () => {
      if (Platform.OS === "web" && watcher) {
        navigator.geolocation.clearWatch(watcher);
      } else {
        watcher?.remove();
      }
    };
  }, []);

  // Loading screen
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
      {Platform.OS === "web" ? (
        // Web not supported
        <View
          style={[
            styles.mapView,
            {
              backgroundColor: "#000",
              justifyContent: "center",
              alignItems: "center",
            },
          ]}
        >
          <Text style={{ color: "white", fontSize: 22, fontWeight: "bold" }}>
            Web not supported
          </Text>
          <Text style={{ color: "white", fontSize: 18, marginTop: 10 }}>
            Please use iOS or Android
          </Text>
        </View>
      ) : (
        // Mobile map
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
          {/* Restaurant marker */}
          <Marker
            title="Another Broken Egg"
            description="Breakfast & Brunch"
            coordinate={{
              latitude: 39.92536068252447,
              longitude: -86.15617507444377,
            }}
          />
        </MapView>
      )}

      {errorMsg && <Text style={styles.error}>{errorMsg}</Text>}
    </View>
  );
}
