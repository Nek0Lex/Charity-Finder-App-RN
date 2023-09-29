import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screen/HomeScreen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import NonProfitDetailScreen from "../screen/NonProfitDetailScreen";
import FavouriteScreen from "../screen/FavouriteScreen";

const Stack = createNativeStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NonProfitDetail"
        component={NonProfitDetailScreen}
        options={({ route }) => ({
          headerShown: true,
          title: route.params.title,
          headerStyle: {
            backgroundColor: 'green',
          },
          headerTintColor: 'white',
        })}
      />
      <Stack.Screen
        name="Favourite"
        component={FavouriteScreen}
        options={({ route }) => ({
          headerShown: true, title: "Favourite",
          headerStyle: {
            backgroundColor: 'green',
          },
          headerTintColor: 'white',
        })}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
