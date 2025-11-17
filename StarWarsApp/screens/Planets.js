import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

//Planets page component
export default function Planets() {
  const [data, setData] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

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

  useEffect(() => {
    fetchPlanets();
  }, []);

  // Renders planets
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.url}
        renderItem={({ item }) => (
          <Text style={styles.text}>{item.name}</Text>
        )}
        refreshing={isRefreshing}
        onRefresh={refreshItems}
      />
    </View>
  );
}

//Styles for the Planets page
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