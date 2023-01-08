import "react-native-gesture-handler";

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import WelcomeScreen from "./app/screens/WelcomeScreen";
import ChoosePathScreen from "./app/screens/ChoosePathScreen";
import CreateNewTripsScreen from "./app/screens/CreateNewTripScreen";
import ExistingTripsScreen from "./app/screens/ExistingTripsScreen";
import strings from "./app/config/strings";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={strings.createNewTripsScreen}
          component={CreateNewTripsScreen}
          options={{}}
        />

        <Stack.Screen
          name={strings.welcomeScreen}
          component={WelcomeScreen}
          options={{ header: () => null }}
        />

        <Stack.Screen
          name={strings.choosePathScreen}
          component={ChoosePathScreen}
          options={{ header: () => null }}
        />

        <Stack.Screen
          name={strings.exisitingTripsScreen}
          component={ExistingTripsScreen}
          options={{}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
