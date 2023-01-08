import {
  ImageBackground,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";
import React from "react";

import { getAuth, onAuthStateChanged } from "../../firebase";

import colors from "../config/colors";
import fonts from "../config/fonts";
import strings from "../config/strings";

const CreateNewTripScreen = ({ navigation }) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    // User is signed in
    //console.log(user.providerData);
  } else {
    // User is signed out
    navigation.navigate(strings.loginScreen);
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text style={styles.tripTitleStyle}>{user.displayName}'s New Trip</Text>
      <TextInput placeholder="Destination" style={styles.inputBoxes} />
      <TextInput
        placeholder="Departure (ex: 07:30 PM)"
        style={styles.inputBoxes}
      />
      <TextInput placeholder="Vehicle" style={styles.inputBoxes} />
      <TextInput
        placeholder="Number of Co-Passengers"
        style={styles.inputBoxes}
        keyboardType={Platform.OS === "ios" ? "number-pad" : "numeric"}
      />
      <TextInput
        placeholder="Other Information"
        style={styles.inputBoxes}
        numberOfLines={4}
        multiline={true}
      />
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
    fontFamily: fonts.primary,
  },

  tripTitleStyle: {
    //to be replaced with trip nickname later
    fontFamily: fonts.primary,
    fontSize: 25,
    marginBottom: 25,
  },
});
