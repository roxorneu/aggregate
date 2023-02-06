// Component below header in ViewTripsScreen
// To be expanded with horizontal scrollview with more filters

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

import strings from "../config/strings";
import colors from "../config/colors";
import fonts from "../config/fonts";

const FiltersBar = (props) => {
  return (
    <View style={styles.tripFiltersContainer}>
      <Text style={styles.filterText}> {strings.vts_filterLabel} </Text>
      <TouchableOpacity
        style={styles.filterButton}
        onPress={() => props.setFilterDestination(true)}
      >
        <Text style={styles.filterBoxText}>
          {strings.vts_destinationFilterLabel}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.filterButton}
        onPress={() => props.setFilterTime(true)}
      >
        <Text style={styles.filterBoxText}>
          {strings.vts_meetupTimeFilterLabel}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default FiltersBar;

const styles = StyleSheet.create({
  tripFiltersContainer: {
    width: "100%",
    height: 50,
    backgroundColor: colors.secondary,
    borderColor: colors.black,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    flexDirection: "row",
    alignContent: "space-around",
    alignSelf: "flex-start",
  },

  filterText: {
    alignSelf: "center",
    flex: 0.3,
    marginLeft: 10,
    fontSize: 14,
    fontFamily: fonts.secondry,
  },

  filterButton: {
    backgroundColor: colors.primary,
    alignSelf: "center",
    flex: 0.33,
    borderWidth: 1.5,
    margin: 5,
    marginLeft: 10,
    padding: 5,
    borderRadius: 10,
    alignItems: "center",
  },

  filterBoxText: {
    fontFamily: fonts.secondry,
  },
});
