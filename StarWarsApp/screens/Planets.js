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
import Animated, { SlideInDown } from "react-native-reanimated";
import Swipeable from "./Swipeable";
import LazyImage from "./LazyImage";

const screenWidth = Dimensions.get("window").width;
const imageHeight = screenWidth * 0.55;

{
  /* Planets page component */
}
export default function Planets() {
  const [data, setData] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  {
    /* Search */
  }
  const [searchText, setSearchText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPlanet, setSelectedPlanet] = useState("");

  const [animateKey, setAnimateKey] = useState(0);

  {
    /* Fetch planets from api */
  }
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

  {
    /* refresh planets */
  }
  const refreshItems = async () => {
    setIsRefreshing(true);
    await fetchPlanets();
    setIsRefreshing(false);
  };

  {
    /* calling fetch planets */
  }
  useEffect(() => {
    fetchPlanets();
  }, []);

  useEffect(() => {
    setAnimateKey((prev) => prev + 1);
  }, [data]);

  {
    /* handles search */
  }
  const handleSearch = () => {
    setModalVisible(true);
  };

  {
    /* handles swipe */
  }
  const handleSwipe = (name) => {
    setSelectedPlanet(name);
    setModalVisible(true);
  };

  {
    /* renders planets */
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
      <StatusBar barStyle="light-content" />

      <ScrollView style={styles.container}>
        {/* image */}
        <LazyImage
          source={require("../assets/starwarsgallaxy.jpeg")}
          style={[styles.headerImage, { height: imageHeight }]}
        />
        {/* search input */}
        <TextInput
          style={styles.input}
          placeholder="Enter search term"
          placeholderTextColor="#888"
          value={searchText}
          onChangeText={setSearchText}
          onSubmitEditing={handleSearch}
        />
        <Button title="Submit" onPress={handleSearch} color="red" />
        {/* list of planets */}
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
        {/* planet & search modal */}
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
    </SafeAreaView>
  );
}

{
  /* styles */
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingHorizontal: 20,
    paddingTop: 20,
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
});
