import "react-native-gesture-handler";

import { LogBox, ToastAndroid, Pressable, StatusBar } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { useFonts } from "expo-font";

import { FontAwesome5 } from "@expo/vector-icons";

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

// Choose Path Screen nests drawer into stack default stack navigator
const Drawer = createDrawerNavigator();

function OptionsButton(props) {
  return (
    <Pressable
      onPress={() => {
        props.navigation.navigate(strings.profileScreen);
      }}
      style={{ paddingRight: 20 }}
    >
      <FontAwesome5 name="user-circle" size={22} color="black" />
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
        options={({ navigation }) => ({
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: colors.secondary,
          },
          title: "Let's Get Started!",
          drawerItemStyle: {
            display: "none",
          },
          headerRight: () => <OptionsButton navigation={navigation} />,
        })}
      />
      <Drawer.Screen
        name={strings.viewTripsScreen}
        component={ViewTripsScreen}
        options={({ navigation }) => ({
          title: "All Trips",
          headerRight: () => <OptionsButton navigation={navigation} />,
        })}
      />
      <Drawer.Screen
        name={strings.createNewTripsScreen}
        component={CreateNewTripsScreen}
        options={({ navigation }) => ({
          headerStyle: {
            backgroundColor: colors.secondary,
          },
          headerRight: () => <OptionsButton navigation={navigation} />,
        })}
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

  const [fontsLoaded] = useFonts({
    RobotoMono: require("./app/assets/RobotoMono.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
