import { StyleSheet, Text, View } from "react-native";
import React from "react";

import colors from "../config/colors";
import fonts from "../config/fonts";

const ViewTripModal = (props) => {
  return (
    <View style={styles.container}>
      <Text>ViewTripModal</Text>
      <View style={styles.infoBoxes}>
        <Text>Going To: </Text>
        <Text style={styles.propStyle}>{props.destination}</Text>
      </View>
      <View style={styles.infoBoxes}>
        <Text>Meetup Time: </Text>
        <Text style={styles.propStyle}>{props.displayTime}</Text>
      </View>

      <View style={styles.infoBoxes}>
        <Text>Trip Host: </Text>
        <Text style={styles.propStyle}>{props.userName}</Text>
      </View>
      <View style={styles.infoBoxes}>
        <Text>Meetup Point: </Text>
        <Text style={styles.propStyle}>{props.meetupPoint}</Text>
      </View>
      <View style={styles.infoBoxes}>
        <Text>Number of Co-Travellers: </Text>
        <Text style={styles.propStyle}>{props.coTravellers}</Text>
      </View>
      <View style={styles.infoBoxes}>
        <Text>Vehicle: </Text>
        <Text style={styles.propStyle}>{props.vehicle}</Text>
      </View>
      <View style={styles.infoBoxes}>
        <Text>Other Info: </Text>
        <Text style={styles.propStyle}>{props.otherInfo}</Text>
      </View>
    </View>
  );
};

export default ViewTripModal;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    elevation: 2,
    margin: 15,
    marginLeft: 20,
    padding: 5,
  },
  infoBoxes: {
    backgroundColor: colors.secondary,
    width: "80%",
    flexDirection: "row",
    padding: 3,
    paddingLeft: 10,
    borderRadius: 15,
    marginTop: 5,
    marginBottom: 3,
    fontFamily: fonts.primary,
    flexWrap: "wrap",
    flexShrink: 1,
  },
  propStyle: {
    //textDecorationLine: "underline",
    fontWeight: "500",
  },
});
