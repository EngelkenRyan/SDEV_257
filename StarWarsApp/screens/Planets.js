import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Modal,
  Button,
  TextInput,
} from "react-native";

//Planets page component
export default function Planets() {
  const [data, setData] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  //Search
  const [searchText, setSearchText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  //Fetch planets from api
  const fetchPlanets = async () => {
    try {
      const response = await fetch("https://www.swapi.tech/api/planets/");

      // Storing response as json
      const json = await response.json();
      setData(json.results);
    } catch (error) {
      console.error(error);
    }
  };

  //Refresh planets
  const refreshItems = async () => {
    setIsRefreshing(true);
    await fetchPlanets();
    setIsRefreshing(false);
  };

  //calls fetchPlanets
  useEffect(() => {
    fetchPlanets();
  }, []);

  // Handles search
  const handleSearch = () => {
    setModalVisible(true);
  };

  // Renders planets
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

      <FlatList
        data={data}
        keyExtractor={(item) => item.url}
        renderItem={({ item }) => <Text style={styles.text}>{item.name}</Text>}
        refreshing={isRefreshing}
        onRefresh={refreshItems}
      />

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <Text style={styles.modalText}>{searchText}</Text>
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

//Styles for the Planets page
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  text: {
    color: "#fd0000ff",
    fontSize: 22,
    fontWeight: "bold",
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
