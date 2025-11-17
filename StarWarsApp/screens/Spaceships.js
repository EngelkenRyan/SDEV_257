import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

//Spaceships page component
export default function Spaceships() {
  const [data, setData] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  //Fetch planets from api
  const fetchShips = async () => {
    try {
      const response = await fetch("https://www.swapi.tech/api/starships/");
      const json = await response.json();
      setData(json.results);
    } catch (error) {
      console.error(error);
    }
  };

    //Refresh spaceships
  const refreshItems = async () => {
    setIsRefreshing(true);
    await fetchShips();
    setIsRefreshing(false);
  };

  useEffect(() => {
    fetchShips();
  }, []);

  // Renders Spaceships
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.url}
        renderItem={({ item }) => (
          <Text style={styles.text}>
            {item.name}
          </Text>
        )}
        refreshing={isRefreshing}
        onRefresh={refreshItems}
      />
    </View>
  );
}

//Styles for the Spaceships page
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fd0000ff",
    fontSize: 22,
    fontWeight: "bold",
  },
});