import "react-native-gesture-handler";

import { LogBox, StatusBar } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { useFonts } from "expo-font";

import WelcomeScreen from "./app/screens/WelcomeScreen";
import ChoosePathScreen from "./app/screens/ChoosePathScreen";
import CreateNewTripsScreen from "./app/screens/CreateNewTripScreen";
import ViewTripsScreen from "./app/screens/ViewTripsScreen";
import strings from "./app/config/strings";
import RegisterScreen from "./app/screens/RegisterScreen";
import LoginScreen from "./app/screens/LoginScreen";
import colors from "./app/config/colors";
import ProfileScreen from "./app/screens/ProfileScreen";
import fonts from "./app/config/fonts";
import BackButton from "./app/components/BackButton";
import ProfileButton from "./app/components/ProfileButton";

const Stack = createStackNavigator();

// Choose Path Screen nests drawer into stack default stack navigator
const Drawer = createDrawerNavigator();

function DrawerNavigation() {
  return (
    <Drawer.Navigator
      initialRouteName={strings.choosePathScreen}
      backBehavior="history"
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.secondary,
        },
        headerTitleStyle: {
          fontFamily: fonts.secondry,
        },
        headerTitleAlign: "center",
        //headerStatusBarHeight: StatusBar.currentHeight,
        swipeEnabled: true,
        drawerPosition: "left",
        drawerActiveTintColor: colors.primary,
        drawerStyle: {
          backgroundColor: colors.secondary,
        },
        drawerLabelStyle: {
          fontFamily: fonts.secondry,
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
          title: strings.choosePathScreen,
          drawerItemStyle: {
            display: "none",
          },
          headerRight: () => <ProfileButton navigation={navigation} />,
        })}
      />
      <Drawer.Screen
        name={strings.viewTripsScreen}
        component={ViewTripsScreen}
        options={({ navigation }) => ({
          headerRight: () => <ProfileButton navigation={navigation} />,
        })}
      />
      <Drawer.Screen
        name={strings.createNewTripsScreen}
        component={CreateNewTripsScreen}
        options={({ navigation }) => ({
          headerRight: () => <ProfileButton navigation={navigation} />,
        })}
      />

      <Drawer.Screen
        name={strings.profileScreen}
        component={ProfileScreen}
        options={({ navigation }) => ({
          headerLeft: () => <BackButton navigation={navigation} />,
        })}
      />
    </Drawer.Navigator>
  );
}

const App = () => {
  LogBox.ignoreAllLogs();

  const [fontsLoaded] = useFonts({
    RobotoMono: require("./app/assets/RobotoMono.ttf"),
    RobotoMonoBold: require("./app/assets/RobotoMono-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <StatusBar
        translucent={false}
        backgroundColor={colors.tertiary}
      ></StatusBar>
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: "left",
          headerTitleStyle: {
            fontFamily: fonts.secondry,
          },
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
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
