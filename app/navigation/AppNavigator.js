import React from "react";
import { StatusBar } from "react-native";

import { NavigationContainer } from "@react-navigation/native";

import colors from "../config/colors";
import StackNavigator from "./StackNavigator";

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <StatusBar
        translucent={false}
        backgroundColor={colors.tertiary}
      ></StatusBar>
      <StackNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;
