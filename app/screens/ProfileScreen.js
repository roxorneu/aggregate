import {
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  View,
  TouchableOpacity,
} from "react-native";
import React from "react";

import { getAuth, signOut } from "../../firebase";

import colors from "../config/colors";
import fonts from "../config/fonts";
import strings from "../config/strings";

const ProfileScreen = ({ navigation }) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    // User is signed in
    // console.log(user.uid);
    console.log(user.phoneNumber);
  } else {
    // User is signed out
    navigation.navigate(strings.welcomeScreen);
  }

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("Logout successful");
        navigation.navigate(strings.welcomeScreen);
      })
      .catch((error) => {
        // An error happened.
        console.log("Couldn't logout");
      });
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.profileBox}>
        <View style={styles.infoBoxes}>
          <Text>Name: </Text>
          <Text style={styles.propStyle}>{user.displayName}</Text>
        </View>
        <View style={styles.infoBoxes}>
          <Text>Contact: </Text>
          <Text style={styles.propStyle}>
            {user.phoneNumber === null ? "Not provided" : user.phoneNumber}
          </Text>
        </View>
        <View style={styles.infoBoxes}>
          <Text>Email: </Text>
          <Text style={styles.propStyle}>{user.email}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}> Logout </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  profileBox: {
    backgroundColor: colors.secondary,
    width: "90%",
    alignSelf: "center",
    borderRadius: 15,
    elevation: 10,
    padding: 10,
    borderColor: colors.primary,
    borderWidth: 0,
    //borderStyle: "dotted",
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

  logoutButton: {
    backgroundColor: colors.secondary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    width: "40%",
    height: 40,
    elevation: 10,
    marginTop: 50,
    fontFamily: fonts.primary,
  },

  logoutText: {
    fontFamily: fonts.primary,
  },
});
