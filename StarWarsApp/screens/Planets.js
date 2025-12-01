import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Modal, Button, TextInput } from "react-native";
import Animated, { SlideInDown } from "react-native-reanimated";
import Swipeable from "./Swipeable";

// Planets page component
export default function Planets() {
  const [data, setData] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Search
  const [searchText, setSearchText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPlanet, setSelectedPlanet] = useState("");

  // Fetching planets from API
  const fetchPlanets = async () => {
    try {
      const response = await fetch("https://www.swapi.tech/api/planets/");
      const json = await response.json();
      console.log(json);
      setData(json.results);
    } catch (error) {
      console.error(error);
    }
  };

  // Refresh planets
  const refreshItems = async () => {
    setIsRefreshing(true);
    await fetchPlanets();
    setIsRefreshing(false);
  };

  // Calls fetchPlanets
  useEffect(() => {
    fetchPlanets();
  }, []);

  // Handles search
  const handleSearch = () => {
    setModalVisible(true);
  };

  // Handles swipe
  const handleSwipe = (name) => {
    setSelectedPlanet(name);
    setModalVisible(true);
  };

  // Renders planets using Swipeable
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter search term"
        placeholderTextColor="#888"
        value={searchText}
        onChangeText={setSearchText}
        onSubmitEditing={handleSearch}
      />
      <Button title="Submit" onPress={handleSearch} color="red" />

      {data.map((item) => (
        <Animated.View key={item.url} entering={SlideInDown}>
          <Swipeable
            name={item.name}
            textStyle={{ color: "red" }}
            onSwipe={() => handleSwipe(item.name)}
          />
        </Animated.View>
      ))}

      {/* Modal for planet or search */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <Text style={styles.modalText}>{selectedPlanet || searchText}</Text>
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  input: {
    backgroundColor: "#222",
    color: "#fff",
    padding: 10,
    borderRadius: 8,
    marginTop: 50,
    marginBottom: 10,
    width: "90%",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  modalBox: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
});
