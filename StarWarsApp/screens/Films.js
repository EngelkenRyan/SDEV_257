import React from "react";
import { View, Text, StyleSheet } from "react-native";

//Films page component
export default function Films() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is the Films page</Text>
    </View>
  );
}

//Styles for the Films page
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