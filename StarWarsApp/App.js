import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Platform } from "react-native";

import Films from "../StarWarsApp/screens/Films";
import Planets from "../StarWarsApp/screens/Planets";
import Spaceships from "../StarWarsApp/screens/Spaceships";

//IOS uses Bottom Tabs, Android uses Drawer Navigation
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

export default function App() {
  return (
    //If IOS run Bottom Tabs, if Android run Drawer Navigation
    <NavigationContainer>
      {Platform.OS === "ios" ? (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
          <Tab.Screen name="Films" component={Films} />
          <Tab.Screen name="Planets" component={Planets} />
          <Tab.Screen name="Spaceships" component={Spaceships} />
        </Tab.Navigator>
      ) : (
        <Drawer.Navigator screenOptions={{ headerShown: true }}>
          <Drawer.Screen name="Films" component={Films} />
          <Drawer.Screen name="Planets" component={Planets} />
          <Drawer.Screen name="Spaceships" component={Spaceships} />
        </Drawer.Navigator>
      )}
    </NavigationContainer>
  );
}