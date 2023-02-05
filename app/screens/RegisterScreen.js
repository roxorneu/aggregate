import React from "react";

import { useState } from "react";

import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

import colors from "../config/colors";
import fonts from "../config/fonts";
import strings from "../config/strings";

import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "../../firebase";

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Registered " + user.email);
      })
      .then(() => {
        updateProfile(auth.currentUser, {
          displayName: username + "|" + location,
          photoURL: "",
        }).then(() => {
          console.log("Updated name and location");
          navigation.replace(strings.choosePathScreen);
        });
      })
      .catch((error) => alert(error.message));
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <TextInput
        style={styles.inputBoxes}
        placeholder={strings.nameString}
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.inputBoxes}
        placeholder={strings.locationString}
        value={location}
        onChangeText={(text) => setLocation(text)}
      />
      <TextInput
        style={styles.inputBoxes}
        placeholder={strings.emailString}
        keyboardType="visible-password"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.inputBoxes}
        placeholder={strings.passwordString}
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />

      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerText}> Submit </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

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
  },

  registerButton: {
    backgroundColor: colors.secondary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    width: "40%",
    height: 40,
    elevation: 10,
    marginTop: 50,
    fontFamily: fonts.secondry,
  },

  registerText: {
    fontFamily: fonts.secondry,
  },
});
