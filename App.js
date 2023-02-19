import "react-native-gesture-handler";

import { LogBox, StatusBar } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { useFonts } from "expo-font";

import WelcomeScreen from "./app/screens/WelcomeScreen";
import strings from "./app/config/strings";
import RegisterScreen from "./app/screens/RegisterScreen";
import LoginScreen from "./app/screens/LoginScreen";

import colors from "./app/config/colors";
import fonts from "./app/config/fonts";

import DrawerNavigator from "./app/navigation/DrawerNavigator";

const Stack = createStackNavigator();

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
          component={DrawerNavigator}
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
