import { View, Text } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import ViewTripsScreen from "./ViewTripsScreen";
import ProfileScreen from "./ProfileScreen";

const Drawer = createDrawerNavigator();

const ViewTripsDrawer = () => {
  return (
    <Drawer.Navigator screenOptions={{}}>
      <Drawer.Screen name="View Trips Screen" component={ViewTripsScreen} />
      <Drawer.Screen name="Profile Screen" component={ProfileScreen} />
    </Drawer.Navigator>
  );
};

export default ViewTripsDrawer;
