import { View, Text } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";

const ViewTripsDrawer = () => {
  return (
    <Drawer.Navigator screenOptions={{}}>
      <Drawer.Screen name="Welcome Screen" component={TripsScreen} />
    </Drawer.Navigator>
  );
};

export default ViewTripsDrawer;
