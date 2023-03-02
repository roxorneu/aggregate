import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import strings from "../config/strings";
import MyCreatedTripsScreen from "../screens/MyCreatedTripsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import MyInterestTrips from "../screens/MyInterestTrips";

import { FontAwesome5, Octicons } from "@expo/vector-icons";
import colors from "../config/colors";
import fonts from "../config/fonts";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        header: () => null,
        tabBarStyle: { backgroundColor: colors.secondary },
        tabBarLabelStyle: {
          color: colors.black,
          fontFamily: fonts.secondry,
          //lineHeight: 50,
        },
      }}
    >
      <Tab.Screen
        name={strings.profileScreen}
        component={ProfileScreen}
        options={{
          tabBarIcon: (tabInfo) => {
            return (
              <FontAwesome5
                name="user-circle"
                size={24}
                color={tabInfo.focused ? colors.primary : colors.primary}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="My Created Trips"
        component={MyCreatedTripsScreen}
        options={{
          tabBarIcon: (tabInfo) => {
            return (
              <FontAwesome5
                name="car-side"
                size={24}
                color={tabInfo.focused ? colors.primary : colors.tertiary}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="My Interest Trips"
        component={MyInterestTrips}
        options={{
          tabBarIcon: (tabInfo) => {
            return (
              <Octicons
                name="heart-fill"
                size={24}
                color={tabInfo.focused ? colors.primary : colors.tertiary}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;

const styles = StyleSheet.create({});
