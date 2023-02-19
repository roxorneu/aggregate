import React from "react";

import DrawerNavigator from "./DrawerNavigator";
import { createStackNavigator } from "@react-navigation/stack";

import WelcomeScreen from "../screens/WelcomeScreen";
import RegisterScreen from "../screens/RegisterScreen";
import LoginScreen from "../screens/LoginScreen";

import colors from "../config/colors";
import fonts from "../config/fonts";
import strings from "../config/strings";

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
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
  );
};

export default StackNavigator;
