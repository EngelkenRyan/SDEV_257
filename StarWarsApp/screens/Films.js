import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

// Films page component
export default function Films() {
  const [data, setData] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Fetching Films from api
  const fetchFilms = async () => {
    try {
      const response = await fetch("https://www.swapi.tech/api/films", {
        headers: {
          Accept: "application/json",
        },
      });

      // Storing response as json
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

  useEffect(() => {
    fetchFilms();
  }, []);

  // Renders Films
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.uid}
        renderItem={({ item }) => (
          <Text style={styles.text}>
            {item.properties.title}
          </Text>
        )}
        refreshing={isRefreshing}
        onRefresh={refreshItems}
      />
    </View>
  );
}

// Styles for the Films page
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
