import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

export default function Spaceships() {
  const [data, setData] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchShips = async () => {
    try {
      const response = await fetch("https://www.swapi.tech/api/starships/");
      const json = await response.json();
      setData(json.results);
    } catch (error) {
      console.error(error);
    }
  };

  const refreshItems = async () => {
    setIsRefreshing(true);
    await fetchShips();
    setIsRefreshing(false);
  };

  useEffect(() => {
    fetchShips();
  }, []);

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    paddingTop: 40,
  },
  text: {
    color: "#fd0000ff",
    fontSize: 22,
    fontWeight: "bold",
    padding: 12,
    borderBottomColor: "#333",
    borderBottomWidth: 1,
  },
});
