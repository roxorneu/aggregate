import { createDrawerNavigator } from "@react-navigation/drawer";

import ChoosePathScreen from "../screens/ChoosePathScreen";
import CreateNewTripsScreen from "../screens/CreateNewTripScreen";
import ViewTripsScreen from "../screens/ViewTripsScreen";
import ProfileScreen from "../screens/ProfileScreen";

import colors from "../config/colors";
import fonts from "../config/fonts";

import strings from "../config/strings";

import BackButton from "../components/BackButton";
import ProfileButton from "../components/ProfileButton";
import BottomTabNavigator from "./BottomTabNavigator";

// Choose Path Screen nests drawer into stack default stack navigator
const Drawer = createDrawerNavigator();

export default function DrawerNavigation() {
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
          //header: () => null,
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
        component={BottomTabNavigator}
        options={({ navigation }) => ({
          headerLeft: () => <BackButton navigation={navigation} />,
        })}
      />
    </Drawer.Navigator>
  );
}
