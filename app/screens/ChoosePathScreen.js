import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import colors from "../config/colors";
import fonts from "../config/fonts";
import strings from "../config/strings";

const ChoosePathScreen = ({ route, navigation }) => {
  //const { expoPushToken } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.newTripBox}
        onPress={() => {
          navigation.navigate(strings.createNewTripsScreen);
        }}
      >
        <Text style={styles.newTripText}>{strings.cps_createNewTripText}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.newTripBox}
        onPress={() => {
          navigation.navigate(strings.viewTripsScreen);
        }}
      >
        <Text style={styles.viewTripsText}>
          {strings.cps_viewExistingTripsText}
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
    marginTop: 25,
    flex: 0.5,
    margin: 15,
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
    fontFamily: fonts.secondry,
    fontSize: 20,
  },

  viewTripsText: {
    fontFamily: fonts.secondry,
    fontSize: 20,
  },
});
