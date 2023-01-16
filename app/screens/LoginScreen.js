import {
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React from "react";

import { useState, useEffect } from "react";

import { auth, getAuth, signInWithEmailAndPassword } from "../../firebase";

import colors from "../config/colors";
import fonts from "../config/fonts";
import strings from "../config/strings";

const LoginScreen = ({ navigation }) => {
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // console.log(user.providerData);
        navigation.replace(strings.choosePathScreen);
      }
    });

    return unsubscribe;
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Logged in " + user.email);
        //console.log(user.toJSON());

        navigation.replace(strings.choosePathScreen);
      })
      .catch((error) => {
        Alert.alert(
          "Login Unsuccessful",
          error.message,
          [
            {
              text: "OK",
              style: "cancel",
            },
          ],
          { cancelable: true }
        );
      });
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
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
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginText}> Login! </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

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

  loginButton: {
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

  loginText: {
    fontFamily: fonts.primary,
  },
});
