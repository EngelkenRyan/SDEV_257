import React from "react";
import { View, Text, StyleSheet } from "react-native";

//Planets page component
export default function Planets() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is the Planets page</Text>
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