import React from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

import dayjs from "dayjs";

import { db, collection, addDoc } from "../../firebase";

import { useState } from "react";

import { getAuth } from "../../firebase";

import DateAndTimePicker from "../components/DateAndTimePicker";

import colors from "../config/colors";
import fonts from "../config/fonts";
import strings from "../config/strings";
import DateTimeFormatter from "../utils/DateTimeFormatter";

const CreateNewTripScreen = ({ navigation }) => {
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

  //console.log(tripDateTime);
  //console.log(epochTime.valueOf());

  const [destination, setDestination] = useState("");
  const [meetupPoint, setMeetupPoint] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [coTravellers, setCoTravellers] = useState(0);
  const [otherInfo, setOtherInfo] = useState("");

  const handleAlerts = (fieldName) => {
    Alert.alert(
      fieldName + " cannot be blank",
      "Please add a " + fieldName.toLowerCase(),
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
        );
        console.log("Document written with ID: ", docRef.id);
        setDestination("");
        setMeetupPoint("");
        setVehicle("");
        setCoTravellers(0);
        setOtherInfo("");
        navigation.navigate(strings.viewTripsScreen);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text style={styles.tripTitleStyle}>
        {user.displayName.split("|")[0]}'s New Trip
      </Text>

      <TextInput
        placeholder="Going To"
        style={styles.inputBoxes}
        value={destination}
        onChangeText={(text) => setDestination(text)}
      />

      <DateAndTimePicker
        date={date}
        setDate={setDate}
        time={time}
        setTime={setTime}
        title="Meetup Time"
      />

      <TextInput
        placeholder="Meetup Point"
        style={styles.inputBoxes}
        value={meetupPoint}
        onChangeText={(text) => setMeetupPoint(text)}
      />

      <TextInput
        placeholder="Vehicle"
        style={styles.inputBoxes}
        value={vehicle}
        onChangeText={(text) => setVehicle(text)}
      />

      <TextInput
        placeholder="Number of Co-Travellers"
        style={styles.inputBoxes}
        value={coTravellers}
        onChangeText={(text) => setCoTravellers(text.trim())}
        keyboardType={Platform.OS === "ios" ? "number-pad" : "numeric"}
      />
      <TextInput
        placeholder="Other Information"
        style={styles.inputBoxes}
        value={otherInfo}
        onChangeText={(text) => setOtherInfo(text)}
        numberOfLines={2}
        multiline={true}
      />

      <Pressable>
        <TouchableOpacity onPress={handleSubmitTrip}>
          <Text style={styles.submitButton}> Submit! </Text>
        </TouchableOpacity>
      </Pressable>
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
    fontSize: 25,
    marginBottom: 25,
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
