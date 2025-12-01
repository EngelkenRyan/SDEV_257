import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Button,
  TextInput,
  SafeAreaView,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import Animated, { SlideInDown } from "react-native-reanimated";
import Swipeable from "./Swipeable";
import LazyImage from "./LazyImage";

{
  /* spaceship component */
}
export default function Spaceships() {
  const [data, setData] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  {
    /* search */
  }
  const [searchText, setSearchText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedShip, setSelectedShip] = useState("");
  {
    /* Image sizing */
  }
  const screenWidth = Dimensions.get("window").width;
  const imageWidth = screenWidth;
  const imageHeight = screenWidth * 0.55;

  {
    /* Featch starship from api */
  }
  const fetchShips = async () => {
    try {
      const response = await fetch("https://www.swapi.tech/api/starships/");
      const json = await response.json();
      console.log(json);
      setData(json.results);
    } catch (error) {
      console.error(error);
    }
  };

  {
    /* Refresh starship */
  }
  const refreshItems = async () => {
    setIsRefreshing(true);
    await fetchShips();
    setIsRefreshing(false);
  };

  {
    /* calls fetchShips */
  }
  useEffect(() => {
    fetchShips();
  }, []);

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
    setSelectedShip(name);
    setModalVisible(true);
  };

  {
    /* Renders starships */
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* image */}
        <LazyImage
          source={require("../assets/Death-Star-I-copy_36ad2500.jpeg")}
          style={{
            width: imageWidth,
            height: imageHeight,
            borderRadius: 12,
            alignSelf: "center",
            marginTop: 10,
            marginBottom: 20,
          }}
          resizeMode="cover"
        />
        {/* search */}
        <TextInput
          style={styles.input}
          placeholder="Enter search term"
          placeholderTextColor="#888"
          value={searchText}
          onChangeText={setSearchText}
          onSubmitEditing={handleSearch}
        />
        <Button title="Submit" onPress={handleSearch} color="red" />
        {/* spaceship list */}
        {data.map((item) => (
          <Animated.View key={item.url} entering={SlideInDown}>
            <Swipeable
              name={item.name}
              textStyle={{ color: "red" }}
              onSwipe={() => handleSwipe(item.name)}
            />
          </Animated.View>
        ))}
      </ScrollView>
      {/* spaceship modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <Text style={styles.modalText}>{selectedShip || searchText}</Text>
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

{
  /* styles */
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    paddingHorizontal: 20,
    paddingBottom: 40,
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
