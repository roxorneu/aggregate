import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import Modal from "react-native-modal";

import { useState } from "react";
import React from "react";

import { MaterialIcons } from "@expo/vector-icons";

import colors from "../config/colors";
import fonts from "../config/fonts";
import strings from "../config/strings";

import ViewTripModal from "../components/ViewTripModal";

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

  const [isExpanded, setIsExpanded] = useState(false);

  const closeModal = () => {
    setIsExpanded(false);
  };

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.95}
      onPress={() => setIsExpanded(!isExpanded)}
    >
      <Modal
        isVisible={isExpanded}
        onBackdropPress={closeModal}
        onBackButtonPress={closeModal}
        backdropOpacity={0.5}
        onSwipeComplete={closeModal}
        useNativeDriverForBackdrop
        swipeDirection={["down", "up", "right", "left"]}
      >
        <ViewTripModal
          userName={props.userName}
          destination={props.destination}
          meetupPoint={props.meetupPoint}
          meetupTime={displayTime}
          coTravellers={props.coTravellers}
          vehicle={props.vehicle}
          otherInfo={props.otherInfo}
          closeModal={closeModal}
        />
      </Modal>

      <View style={styles.arrowIcon}>
        {isExpanded ? (
          <MaterialIcons name="keyboard-arrow-up" size={24} color="black" />
        ) : (
          <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
        )}
      </View>

      <View style={styles.infoBoxes}>
        <Text style={styles.keyStyle}>Going To: </Text>
        <Text style={styles.propStyle}>{props.destination}</Text>
      </View>
      <View style={styles.infoBoxes}>
        <Text style={styles.keyStyle}>Meetup Time: </Text>
        <Text style={styles.timePropStyle}>{displayTime}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Trips;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.secondary,
    width: "45%",
    justifyContent: "center",
    //alignItems: "center",
    borderRadius: 15,
    elevation: 2,
    marginTop: 10,
    marginBottom: 10,
    marginRight: 15,
    padding: 5,
    fontFamily: fonts.secondry,
  },

  arrowIcon: {
    position: "absolute",
    alignSelf: "flex-end",
    top: 8,
    right: 4,
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
    flexWrap: "wrap",
    flexGrow: 1,
  },
  keyStyle: {
    textTransform: "capitalize",
    fontFamily: fonts.secondry,
  },

  propStyle: {
    textTransform: "capitalize",
    fontFamily: fonts.tertiary,
  },

  timePropStyle: {
    //textTransform: "capitalize",
    fontFamily: fonts.tertiary,
  },
});
