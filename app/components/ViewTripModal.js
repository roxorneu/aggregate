import {
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";

import { MaterialIcons, AntDesign } from "@expo/vector-icons";

import Modal from "react-native-modal";

import colors from "../config/colors";
import fonts from "../config/fonts";

import { useState } from "react";

import { updateInterestAndNotification } from "../utils/ServerFunctions";
import { prototype } from "react-native/Libraries/Utilities/PixelRatio";

const ViewTripModal = (props) => {
  const [interested, setInterested] = useState(false);

  const handleInterest = () => {
    setInterested(!interested);
  };

  const closeModal = () => {
    if (interested) {
      updateInterestAndNotification(
        props.userID,
        props.tripID,
        props.userName.split("|")[0],
        props.destination
      );
    }
    props.closeModal();
  };

  return (
    <View>
      {props.isExpanded ? (
        <Modal
          isVisible={props.isExpanded}
          onBackdropPress={closeModal}
          onBackButtonPress={closeModal}
          backdropOpacity={0.5}
          onSwipeComplete={closeModal}
          useNativeDriverForBackdrop
          swipeDirection={["down", "up", "right", "left"]}
        >
          <View style={styles.container}>
            <View style={styles.arrowIcon}>
              <TouchableOpacity
                onPress={closeModal}
                style={{ paddingRight: 10, paddingBottom: 0, paddingTop: 10 }}
              >
                <MaterialIcons
                  name="keyboard-arrow-up"
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
            </View>
            <View style={styles.infoBoxes}>
              <Text style={styles.keyStyle}>Going To: </Text>
              <Text style={styles.propStyle}>{props.destination}</Text>
            </View>
            <View style={styles.infoBoxes}>
              <Text style={styles.keyStyle}>Meetup Time: </Text>
              <Text style={styles.timePropStyle}>{props.meetupTime}</Text>
            </View>

            <View style={styles.infoBoxes}>
              <Text style={styles.keyStyle}>Trip Host: </Text>
              <Text style={styles.propStyle}>
                {props.userName.split("|")[0]}
              </Text>
            </View>
            <View style={styles.infoBoxes}>
              <Text style={styles.keyStyle}>Meetup Point: </Text>
              <Text style={styles.propStyle}>{props.meetupPoint}</Text>
            </View>
            <View style={styles.infoBoxes}>
              <Text style={styles.keyStyle}>Number of Co-Travellers: </Text>
              <Text style={styles.propStyle}>{props.coTravellers}</Text>
            </View>
            <View style={styles.infoBoxes}>
              <Text style={styles.keyStyle}>Vehicle: </Text>
              <Text style={styles.propStyle}>{props.vehicle}</Text>
            </View>
            <View style={styles.infoBoxes}>
              <Text style={styles.keyStyle}>Other Info: </Text>
              <Text style={styles.timePropStyle}>{props.otherInfo}</Text>
            </View>
            {interested ? (
              <TouchableHighlight
                underlayColor={colors.secondary}
                activeOpacity={1}
                style={styles.interestBoxInterested}
                onPress={() => handleInterest()}
              >
                <AntDesign name="heart" size={40} color={colors.primary} />
              </TouchableHighlight>
            ) : (
              <TouchableHighlight
                style={styles.interestBox}
                underlayColor={colors.secondary}
                activeOpacity={1}
                onPress={() => handleInterest()}
              >
                <Text style={styles.interestText}> Interested? </Text>
              </TouchableHighlight>
            )}
          </View>
        </Modal>
      ) : null}
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
    bottom: 4,
    padding: 4,
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
    fontFamily: fonts.secondry,
  },
  keyStyle: {
    fontWeight: "500",
    textTransform: "capitalize",
    fontFamily: fonts.secondry,
  },

  propStyle: {
    fontFamily: fonts.tertiary,
    textTransform: "capitalize",
    width: "70%",
  },

  timePropStyle: {
    fontFamily: fonts.tertiary,
    width: "68%",
  },

  interestBox: {
    backgroundColor: colors.primary,
    alignSelf: "center",
    alignItems: "center",
    width: "60%",
    borderRadius: 15,
    margin: 10,
    padding: 8,
  },

  interestBoxInterested: {
    alignSelf: "center",
    alignItems: "center",
    padding: 18,
  },

  interestText: {
    fontFamily: fonts.secondry,
    fontSize: 18,
    alignSelf: "center",
  },
});
