import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Modal, Button, TextInput } from "react-native";
import Swipeable from "./Swipeable";

// Films page component
export default function Films() {
  const [data, setData] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Search
  const [searchText, setSearchText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFilm, setSelectedFilm] = useState("");

  // Fetching Films from API
  const fetchFilms = async () => {
    try {
      const response = await fetch("https://www.swapi.tech/api/films", {
        headers: {
          Accept: "application/json",
        },
      });

      // Storing response as JSON
      const json = await response.json();
      console.log(json);
      setData(json.result);
    } catch (error) {
      console.error(error);
    }
  };

  // Refresh Films
  const refreshItems = async () => {
    setIsRefreshing(true);
    await fetchFilms();
    setIsRefreshing(false);
  };

  // Calls fetchFilms
  useEffect(() => {
    fetchFilms();
  }, []);

  // Handles search
  const handleSearch = () => {
    setModalVisible(true);
  };

  // Handles swipe
  const handleSwipe = (title) => {
    setSelectedFilm(title);
    setModalVisible(true);
  };

  // Renders Films
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

      <Button title="Submit" onPress={handleSearch} />

      {data.map((item) => (
        <Swipeable
          key={item.uid}
          name={item.properties.title}
          onSwipe={() => handleSwipe(item.properties.title)}
        />
      ))}

      {/* Modal for films and search */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <Text style={styles.modalText}>{selectedFilm || searchText}</Text>
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
