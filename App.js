import "react-native-gesture-handler";

import { LogBox, ToastAndroid, Pressable, StatusBar } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

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

const Stack = createStackNavigator();

const Drawer = createDrawerNavigator();

function OptionsButton() {
  return (
    <Pressable
      onPress={() => {
        ToastAndroid.show("Options Pressed", 1000);
        console.log(navigator);
      }}
      style={{ padding: 20 }}
    >
      <SimpleLineIcons name="options-vertical" size={15} color="black" />
    </Pressable>
  );
}

function DrawerNavigation() {
  return (
    <Drawer.Navigator
      initialRouteName={strings.choosePathScreen}
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.secondary,
        },
        headerTitleAlign: "center",
        headerStatusBarHeight: StatusBar.currentHeight,
        drawerPosition: "left",
        drawerActiveTintColor: colors.primary,
        drawerStyle: {
          backgroundColor: colors.secondary,
        },
      }}
    >
      <Drawer.Screen
        name={strings.choosePathScreen}
        component={ChoosePathScreen}
        options={{
          headerTitleAlign: "left",
          headerStyle: {
            backgroundColor: colors.secondary,
          },
          title: "Let's Get Started",
          drawerItemStyle: {
            display: "none",
          },
        }}
      />
      <Drawer.Screen
        name={strings.viewTripsScreen}
        component={ViewTripsScreen}
        options={{
          title: "All Trips",
        }}
      />
      <Drawer.Screen
        name={strings.createNewTripsScreen}
        component={CreateNewTripsScreen}
        options={{
          headerStyle: {
            backgroundColor: colors.secondary,
          },
        }}
      />

      <Drawer.Screen
        name={strings.profileScreen}
        component={ProfileScreen}
        options={{ title: "Your Profile" }}
      />
    </Drawer.Navigator>
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
          name={strings.welcomeScreen}
          component={WelcomeScreen}
          options={{ header: () => null }}
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
          component={DrawerNavigation}
          options={{
            headerStyle: {
              backgroundColor: colors.secondary,
            },
            header: () => null,
            //headerRight: () => <OptionsButton />,
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
