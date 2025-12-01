import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Button,
  TextInput,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Dimensions,
} from "react-native";
import Swipeable from "./Swipeable";
import Animated, { SlideInDown } from "react-native-reanimated";
import { useFocusEffect } from "@react-navigation/native";
import LazyImage from "./LazyImage";

// Gets screen width for iamge size
const screenWidth = Dimensions.get("window").width;
const imageHeight = screenWidth * 0.55; // auto height like your other screens

// Films page component
export default function Films() {
  const [data, setData] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Search
  const [searchText, setSearchText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFilm, setSelectedFilm] = useState("");

  const [animateKey, setAnimateKey] = useState(0);

  // Fetching Films from API
  const fetchFilms = async () => {
    try {
      const response = await fetch("https://www.swapi.tech/api/films", {
        headers: { Accept: "application/json" },
      });
      const json = await response.json();
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

  // Trigger animation
  useFocusEffect(
    React.useCallback(() => {
      setAnimateKey((prev) => prev + 1);
    }, [])
  );

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
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
      <StatusBar barStyle="light-content" />

      <ScrollView style={styles.container}>
        // image
        <LazyImage
          source={require("../assets/starwarsfilms.jpg")}
          style={[styles.headerImage, { width: "100%", height: imageHeight }]}
        />
        // Search
        <TextInput
          style={styles.input}
          placeholder="Enter search term"
          placeholderTextColor="#888"
          value={searchText}
          onChangeText={setSearchText}
          onSubmitEditing={handleSearch}
        />
        // Search Button
        <Button title="Submit" onPress={handleSearch} color="red" />
        // Map through films
        {data.map((item) => (
          <Animated.View
            key={`${item.uid}-${animateKey}`}
            entering={SlideInDown}
          >
            <Swipeable
              name={item.properties.title}
              textStyle={{ color: "red" }}
              onSwipe={() => handleSwipe(item.properties.title)}
            />
          </Animated.View>
        ))}
        // Film & Search modal
        <Modal visible={modalVisible} transparent animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalBox}>
              <Text style={styles.modalText}>{selectedFilm || searchText}</Text>
              <Button title="Close" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
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

  headerImage: {
    marginBottom: 20,
    resizeMode: "cover",
    borderRadius: 10,
  },

  input: {
    backgroundColor: "#222",
    color: "#fff",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    width: "100%",
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
