import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

import { MaterialIcons } from "@expo/vector-icons";

import colors from "../config/colors";
import fonts from "../config/fonts";

const ViewTripModal = (props) => {
  const closeModal = () => {
    props.closeModal();
  };

  return (
    <View style={styles.container}>
      <View style={styles.arrowIcon}>
        <Pressable
          onPress={closeModal}
          style={{ paddingRight: 10, paddingBottom: 4, paddingTop: 10 }}
        >
          <MaterialIcons name="keyboard-arrow-up" size={24} color="black" />
        </Pressable>
      </View>
      <View style={styles.infoBoxes}>
        <Text>Going To: </Text>
        <Text style={styles.propStyle}>{props.destination}</Text>
      </View>
      <View style={styles.infoBoxes}>
        <Text>Meetup Time: </Text>
        <Text style={{ fontWeight: "900" }}>{props.meetupTime}</Text>
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
        <Text style={{ fontWeight: "500" }}>{props.otherInfo}</Text>
      </View>
    </View>
  );
};

export default ViewTripModal;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.secondary,
    width: "92%",
    alignSelf: "center",
    borderRadius: 15,
    elevation: 10,
    marginLeft: 10,
    padding: 10,
    borderColor: colors.primary,
    borderWidth: 5,
    //borderStyle: "dotted",
  },

  arrowIcon: {
    position: "absolute",
    alignSelf: "flex-end",
    bottom: 8,
    right: 4,
  },

  infoBoxes: {
    backgroundColor: colors.secondary,
    width: "92%",
    flexDirection: "row",
    padding: 8,
    paddingLeft: 10,
    borderRadius: 15,
    marginTop: 5,
    marginBottom: 3,
    fontFamily: fonts.primary,
  },
  propStyle: {
    //textDecorationLine: "underline",
    fontWeight: "900",
    textTransform: "capitalize",
  },
});
