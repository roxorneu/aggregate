import "react-native-gesture-handler";

import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  LogBox,
  Image,
  ToastAndroid,
  Pressable,
  TouchableOpacity,
} from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { SimpleLineIcons } from "@expo/vector-icons";

import WelcomeScreen from "./app/screens/WelcomeScreen";
import ChoosePathScreen from "./app/screens/ChoosePathScreen";
import CreateNewTripsScreen from "./app/screens/CreateNewTripScreen";
import ViewTripsScreen from "./app/screens/ViewTripsScreen";
import strings from "./app/config/strings";
import RegisterScreen from "./app/screens/RegisterScreen";
import LoginScreen from "./app/screens/LoginScreen";
import colors from "./app/config/colors";
import ProfileScreen from "./app/screens/ProfileScreen";
import ViewTripsDrawer from "./app/screens/ViewTripsDrawer";

const Stack = createStackNavigator();

function OptionsButton() {
  return (
    <Pressable
      onPress={() => {
        ToastAndroid.show("Options Pressed", 1000);
        //navigation.navigate(ViewTripsDrawer);
      }}
      style={{ padding: 20 }}
    >
      <SimpleLineIcons name="options-vertical" size={15} color="black" />
    </Pressable>
  );
}

export default function App() {
  LogBox.ignoreAllLogs();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: "center",
        }}
      >
        <Stack.Screen
          name={"View Trips Drawer"}
          component={ViewTripsDrawer}
          options={{ title: "Trips Drawer" }}
        />

        <Stack.Screen
          name={strings.welcomeScreen}
          component={WelcomeScreen}
          options={{ header: () => null }}
        />
        <Stack.Screen
          name={strings.profileScreen}
          component={ProfileScreen}
          options={{ title: "Your Profile" }}
        />

        <Stack.Screen
          name={strings.registerScreen}
          component={RegisterScreen}
          options={{
            headerStyle: {
              backgroundColor: colors.secondary,
            },
            headerTitleAlign: "center",
          }}
        />

        <Stack.Screen
          name={strings.loginScreen}
          component={LoginScreen}
          options={{
            headerStyle: {
              backgroundColor: colors.secondary,
            },
          }}
        />

        <Stack.Screen
          name={strings.createNewTripsScreen}
          component={CreateNewTripsScreen}
          options={{
            headerStyle: {
              backgroundColor: colors.secondary,
            },
            headerRight: () => <OptionsButton />,
          }}
        />

        <Stack.Screen
          name={strings.choosePathScreen}
          component={ChoosePathScreen}
          options={{
            headerStyle: {
              backgroundColor: colors.secondary,
            },
          }}
        />

        <Stack.Screen
          name={strings.viewTripsScreen}
          component={ViewTripsScreen}
          options={{
            headerStyle: {
              backgroundColor: colors.secondary,
            },
            headerTitleAlign: "center",
            title: "All Trips",
            headerRight: () => <OptionsButton />,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
