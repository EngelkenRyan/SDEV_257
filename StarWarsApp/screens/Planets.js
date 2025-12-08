import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  Button,
  Dimensions,
  Modal,
  StyleSheet,
  StatusBar,
} from "react-native";
import Animated, { SlideInDown } from "react-native-reanimated";
import Swipeable from "./Swipeable";
import LazyImage from "./LazyImage";
import useNetworkStatus from "./NetworkConnect";

const screenWidth = Dimensions.get("window").width;
const imageHeight = screenWidth * 0.55;

{
  /* Planets page component */
}
export default function Planets() {
  const isConnected = useNetworkStatus();

  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPlanet, setSelectedPlanet] = useState("");
  const [animateKey, setAnimateKey] = useState(0);

  {
    /* Fetch planets */
  }
  const fetchPlanets = async () => {
    try {
      const response = await fetch("https://www.swapi.tech/api/planets/");
      const json = await response.json();
      setData(json.results);
    } catch (error) {
      console.error(error);
    }
  };

  {
    /* Call fetchPlanets if online */
  }
  useEffect(() => {
    if (isConnected) {
      fetchPlanets();
    }
  }, [isConnected]);

  {
    /* Animation */
  }
  useEffect(() => {
    setAnimateKey((prev) => prev + 1);
  }, [data]);

  {
    /* Handle Search */
  }
  const handleSearch = () => {
    setModalVisible(true);
  };

  {
    /* Handle Swipe */
  }
  const handleSwipe = (name) => {
    setSelectedPlanet(name);
    setModalVisible(true);
  };

  {
    /* Render planets */
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
      <StatusBar barStyle="light-content" />
      {!isConnected ? (
        <View style={styles.offlineContainer}>
          <Text style={styles.offlineText}>
            No internet connection. Please try again.
          </Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.container}>
          {/* Image */}
          <LazyImage
            source={require("../assets/starwarsgallaxy.jpeg")}
            style={[styles.headerImage, { height: imageHeight }]}
          />
          {/* Search input */}
          <TextInput
            style={styles.input}
            placeholder="Enter search term"
            placeholderTextColor="#888"
            value={searchText}
            onChangeText={setSearchText}
            onSubmitEditing={handleSearch}
          />
          <Button title="Submit" onPress={handleSearch} color="red" />
          {/* List of planets */}
          {data.map((item) => (
            <Animated.View
              key={`${item.url}-${animateKey}`}
              entering={SlideInDown}
            >
              <Swipeable
                name={item.name}
                textStyle={{ color: "red" }}
                onSwipe={() => handleSwipe(item.name)}
              />
            </Animated.View>
          ))}
          {/* Planet & search modal */}
          <Modal visible={modalVisible} transparent animationType="slide">
            <View style={styles.modalContainer}>
              <View style={styles.modalBox}>
                <Text style={styles.modalText}>
                  {selectedPlanet || searchText}
                </Text>
                <Button title="Close" onPress={() => setModalVisible(false)} />
              </View>
            </View>
          </Modal>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

{
  /* Styles */
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  headerImage: {
    width: "100%",
    resizeMode: "cover",
    borderRadius: 10,
    marginBottom: 20,
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
  offlineContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  offlineText: {
    color: "red",
    fontSize: 18,
    textAlign: "center",
    paddingHorizontal: 20,
  },
});
