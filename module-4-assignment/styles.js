import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: { flex: 1 },
  mapView: { flex: 1 },
  label: { fontSize: 18, padding: 10 },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  error: { color: "red", padding: 10 },
});
