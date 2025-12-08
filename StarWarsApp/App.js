import { StatusBar, Platform, View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Films from "./screens/Films";
import Planets from "./screens/Planets";
import Spaceships from "./screens/Spaceships";

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      {/* StatusBar for all platforms */}
      <StatusBar barStyle="light-content" backgroundColor="#111" />

      <NavigationContainer>
        {Platform.OS === "ios" ? (
          <Tab.Navigator
            screenOptions={{
              headerShown: false,
              tabBarActiveTintColor: "red",
              tabBarInactiveTintColor: "gray",
            }}
          >
            <Tab.Screen name="Films" component={Films} />
            <Tab.Screen name="Planets" component={Planets} />
            <Tab.Screen name="Spaceships" component={Spaceships} />
          </Tab.Navigator>
        ) : (
          <Drawer.Navigator
            screenOptions={{
              headerShown: true,
              drawerActiveTintColor: "red",
              drawerInactiveTintColor: "gray",
            }}
          >
            <Drawer.Screen name="Films" component={Films} />
            <Drawer.Screen name="Planets" component={Planets} />
            <Drawer.Screen name="Spaceships" component={Spaceships} />
          </Drawer.Navigator>
        )}
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
