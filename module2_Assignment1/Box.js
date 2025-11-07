import PropTypes from "prop-types";
import { View, Text } from "react-native";
import styles from "./styles";

export default function Box({ text }) {
  return (
    <View style={styles.box}>
      <Text style={styles.boxText}>{text}</Text>
    </View>
  );
}

Box.propTypes = {
  text: PropTypes.string.isRequired,
};