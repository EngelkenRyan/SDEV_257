import { View, StatusBar } from "react-native";
import styles from "./styles";
import Row from "./Row";
import Column from "./Column";
import Box from "./Box";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar hidden={false} />

      <Row>
        <Column>
          <Box text="Box 1" />
          <Box text="Box 2" />
        </Column>
        <Column>
          <Box text="Box 3" />
          <Box text="Box 4" />
        </Column>
      </Row>

      <Row>
        <Column>
          <Box text="Box 5" />
          <Box text="Box 6" />
        </Column>
        <Column>
          <Box text="Box 7" />
          <Box text="Box 8" />
        </Column>
      </Row>

      <Row>
        <Column>
          <Box text="Box 9" />
          <Box text="Box 10" />
        </Column>
        <Column>
          <Box text="Box 11" />
          <Box text="Box 12" />
        </Column>
      </Row>
    </View>
  );
}