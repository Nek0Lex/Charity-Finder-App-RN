import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screen/HomeScreen';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


export default function AppStack() {
    return (
        <Tab.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'Home') {
                    // iconName = focused
                    //     ? 'ios-information-circle'
                    //     : 'ios-information-circle-outline';
                    iconName = "home";
                }

                return <MaterialCommunityIcons name="home" size={24} color="black" />;
            },
        })}>
            <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            {/* <Tab.Screen name="Settings" component={SettingsScreen} /> */}
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
