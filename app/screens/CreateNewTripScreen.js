import React from "react";
import {
  Alert,
  KeyboardAvoidingView,
  View,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

import dayjs from "dayjs";

import { db, collection, addDoc, getAuth, doc, setDoc } from "../../firebase";

import { useState } from "react";

import DateAndTimePicker from "../components/DateAndTimePicker";

import colors from "../config/colors";
import fonts from "../config/fonts";
import strings from "../config/strings";
import DateTimeFormatter from "../utils/DateTimeFormatter";

import {
  NotificationsInit,
  sendPushNotification,
} from "../utils/NotificationsInit";
import {
  updateUserToken,
  tripCreatedNotification,
} from "../utils/ServerFunctions";

const CreateNewTripScreen = ({ navigation }) => {
  var token = NotificationsInit();

  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    // User is signed in
    // console.log(user.uid);
  } else {
    // User is signed out
    navigation.navigate(strings.loginScreen);
  }

  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date(Date.now()));

  //tripDateTime -> human readable string containing trip time

  var dateFormatted = dayjs(date).format();
  var timeFormatted = dayjs(time).format();

  const tripDateTime =
    dateFormatted.split("T")[0].split("-").reverse().join("/") +
    " " +
    timeFormatted.split("T")[1];

  const epochTime = DateTimeFormatter(date, time);

  const [destination, setDestination] = useState("");
  const [meetupPoint, setMeetupPoint] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [coTravellers, setCoTravellers] = useState(0);
  const [otherInfo, setOtherInfo] = useState("");

  const handleAlerts = (fieldName) => {
    Alert.alert(
      fieldName + " cannot be blank",
      "Please add a " + fieldName.toLowerCase() + ".",
      [
        {
          text: "OK",
          style: "cancel",
        },
      ],
      { cancelable: true }
    );
    return false;
  };

  const validateInput = () => {
    //Other validations -> time of meeting to be checked for past input
    if (destination.trim() === "") {
      return handleAlerts("Destination");
    }
    if (meetupPoint.trim() === "") {
      return handleAlerts("Meetup Point");
    }
    return true;
  };

  const handleSubmitTrip = async () => {
    if (validateInput()) {
      //console.log(destination);
      try {
        const docRef = await addDoc(
          collection(db, user.displayName.split("|")[1]),
          {
            userName: user.displayName,
            userID: user.uid,
            destination: destination.trim().toLowerCase(),
            dateTime_HR: tripDateTime,
            dateTime: epochTime.valueOf(),
            meetupPoint: meetupPoint.trim().toLowerCase(),
            vehicle: vehicle.trim().toLowerCase(),
            coTravellers: coTravellers.trim().toLowerCase(),
            otherInfo: otherInfo.trim(),
            isVisible: true,
          }
        ).then(() => {
          // Creating a new trip with a new device will overwrite token of old device
          updateUserToken(user.uid, user.displayName, token);
        });

        setDestination("");
        setMeetupPoint("");
        setVehicle("");
        setCoTravellers(0);
        setOtherInfo("");

        tripCreatedNotification(token, destination.trim());

        navigation.navigate(strings.viewTripsScreen);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView style={{ width: "100%" }}>
        <Text style={styles.tripTitleStyle}>
          {user.displayName.split("|")[0]}'s New Trip
        </Text>

        <TextInput
          placeholder={strings.cnts_destinationPlaceholder}
          style={styles.inputBoxes}
          value={destination}
          onChangeText={(text) => setDestination(text)}
        />
        <DateAndTimePicker
          date={date}
          setDate={setDate}
          time={time}
          setTime={setTime}
          title={strings.cnts_meetupTimeString}
        />
        <TextInput
          placeholder={strings.cnts_meetupPointPlaceholder}
          style={styles.inputBoxes}
          value={meetupPoint}
          onChangeText={(text) => setMeetupPoint(text)}
        />
        <TextInput
          placeholder={strings.cnts_vehiclePlaceholder}
          style={styles.inputBoxes}
          value={vehicle}
          onChangeText={(text) => setVehicle(text)}
        />
        <TextInput
          placeholder={strings.cnts_coTravellersPlaceholder}
          style={styles.inputBoxes}
          value={coTravellers}
          onChangeText={(text) => setCoTravellers(text.trim())}
          keyboardType={Platform.OS === "ios" ? "number-pad" : "numeric"}
        />
        <TextInput
          placeholder={strings.cnts_otherInfoPlaceholder}
          style={styles.inputBoxes}
          value={otherInfo}
          onChangeText={(text) => setOtherInfo(text)}
          numberOfLines={2}
          multiline={true}
        />
        <Pressable>
          <TouchableOpacity onPress={handleSubmitTrip}>
            <Text style={styles.submitButton}>
              {" "}
              {strings.cnts_submitTripButtonText}{" "}
            </Text>
          </TouchableOpacity>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CreateNewTripScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  inputBoxes: {
    backgroundColor: colors.secondary,
    width: "70%",
    alignSelf: "center",
    alignItems: "center",
    padding: 8,
    paddingLeft: 15,
    borderRadius: 15,
    elevation: 10,
    marginTop: 20,
    fontFamily: fonts.secondry,
    fontSize: 15,
  },

  tripTitleStyle: {
    //to be replaced with trip nickname later
    fontFamily: fonts.secondry,
    alignSelf: "center",
    fontSize: 25,
    marginBottom: 5,
    marginTop: 25,
  },

  submitButton: {
    backgroundColor: colors.secondary,
    color: colors.black,
    alignSelf: "center",
    padding: 14,
    paddingLeft: 15,
    borderRadius: 15,
    elevation: 5,
    marginTop: 20,
    fontFamily: fonts.secondry,
    fontSize: 20,
  },
});
