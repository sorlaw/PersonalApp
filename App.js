import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import LoginScreen from "./frontend/screens/LoginScreen";
import SignUpScreen from "./frontend/screens/SignUpScreen";
import HomeScreen from "./frontend/screens/HomeScreen";
import DetailScreen from "./frontend/screens/DetailScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { FontAwesome } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();

const BotTab = createMaterialBottomTabNavigator();

const About = () => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text>This is about page</Text>
  </View>
);

const Settings = () => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text>This is settings page</Text>
  </View>
);

const MyTab = () => (
  <BotTab.Navigator initialRouteName="HomeScreen">
    <BotTab.Screen
      name="HomeScreen"
      component={HomeScreen}
      options={{
        tabBarLabel: "Home",
        tabBarIcon: ({ color }) => (
          <FontAwesome name="home" size={24} color={color} />
        ),
      }}
    />
    <BotTab.Screen
      name="About"
      component={About}
      options={{
        tabBarLabel: "About",
        tabBarIcon: ({ color }) => (
          <FontAwesome name="exclamation-circle" size={24} color={color} />
        ),
      }}
    />
    <BotTab.Screen
      name="Settings"
      component={Settings}
      options={{
        tabBarLabel: "Settings",
        tabBarIcon: ({ color }) => (
          <FontAwesome name="gear" size={24} color={color} />
        ),
      }}
    />
  </BotTab.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Daftar" component={SignUpScreen} />
        <Stack.Screen name="Home" component={MyTab} />
        <Stack.Screen name="Detail" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
