import { StyleSheet, Text, View } from "react-native";
import React from "react";

import colors from "../config/colors";
import fonts from "../config/fonts";
import strings from "../config/strings";

const Trips = (props) => {
  const meetupTime = props.meetupTime.split(" ");

  let date = meetupTime[0].split("-").reverse().join("/");

  let time = meetupTime[1].split(":");
  const hour = time[0] % 12;

  time =
    (hour < 10 ? "0" : "") +
    hour +
    ":" +
    time[1] +
    (time[0] < 13 ? " AM" : " PM");

  const displayTime = date + " " + time;

  return (
    <View style={styles.container}>
      <View style={styles.infoBoxes}>
        <Text>Trip Host: </Text>
        <Text style={styles.propStyle}>{props.userName}</Text>
      </View>
      <View style={styles.infoBoxes}>
        <Text>Going To: </Text>
        <Text style={styles.propStyle}>{props.destination}</Text>
      </View>
      <View style={styles.infoBoxes}>
        <Text>Meetup Time: </Text>
        <Text style={styles.propStyle}>{displayTime}</Text>
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

export default Trips;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.secondary,
    width: "90%",
    justifyContent: "center",
    //alignItems: "center",
    borderRadius: 15,
    elevation: 2,
    marginTop: 10,
    marginBottom: 10,
    padding: 5,
  },

  infoBoxes: {
    backgroundColor: colors.secondary,
    width: "90%",
    flex: 1,
    flexDirection: "row",
    padding: 3,
    paddingLeft: 10,
    borderRadius: 15,
    marginTop: 5,
    marginBottom: 3,
    fontFamily: fonts.primary,
  },
  propStyle: {
    textDecorationLine: "underline",
    fontWeight: "500",
  },
});
