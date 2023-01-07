import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import colors from "../config/colors";
import fonts from "../config/fonts";
import strings from "../config/strings";

import { NavigationContainer } from "@react-navigation/native";

const ChoosePathScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.newTripBox}
        onPress={() => {
          navigation.navigate(strings.createNewTripsScreen);
        }}
      >
        <Text style={styles.newTripText}>{strings.createNewTripText}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.viewAllTrips}
        onPress={() => {
          navigation.navigate(strings.exisitingTripsScreen);
        }}
      >
        <Text style={styles.viewTripsText}>
          {strings.viewExistingTripsText}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ChoosePathScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.primary,
  },

  newTripBox: {
    marginTop: 50,
    flex: 0.5,
    margin: 10,
    backgroundColor: colors.secondary,
    justifyContent: "center",
    alignItems: "center",
    elevation: 10,
    borderRadius: 75,
  },

  viewAllTrips: {
    flex: 0.5,
    margin: 10,
    backgroundColor: colors.secondary,
    justifyContent: "center",
    alignItems: "center",
    elevation: 10,
    borderRadius: 75,
  },

  newTripText: {
    fontFamily: fonts.primary,
    fontSize: 20,
  },

  viewTripsText: {
    fontFamily: fonts.primary,
    fontSize: 20,
  },
});
