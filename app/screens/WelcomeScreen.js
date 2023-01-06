import React from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  Pressable,
  Alert,
} from "react-native";

import colors from "../config/colors";
import fonts from "../config/fonts";
import strings from "../config/strings";

function WelcomeScreen(props) {
  return (
    <ImageBackground style={styles.background}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require("../assets/logo.png")} />
        <Text style={styles.logoText}> {strings.appName} </Text>
      </View>

      <Pressable
        style={styles.loginButton}
        onPress={() => Alert.alert("Logging In")}
      >
        <Text style={styles.loginText}>{strings.loginButtonText}</Text>
      </Pressable>

      <Pressable
        style={styles.registerButton}
        onPress={() => Alert.alert("Registering")}
      >
        <Text style={styles.registerText}>{strings.registerButtonText}</Text>
      </Pressable>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: colors.primary,
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },

  logoContainer: {
    position: "relative",
    alignSelf: "center",
    bottom: 0,
  },

  logo: {
    width: 200,
    height: 200,
  },

  logoText: {
    fontFamily: fonts.primary,
    fontSize: 25,
    alignSelf: "center",
  },

  loginButton: {
    backgroundColor: colors.secondary,
    width: "50%",
    alignSelf: "center",
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 25,
    elevation: 10,
    marginTop: 150,
  },

  loginText: {
    fontFamily: fonts.primary,
  },

  registerButton: {
    backgroundColor: colors.secondary,
    width: "50%",
    alignSelf: "center",
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 25,
    elevation: 10,

    marginTop: 20,
  },

  registerText: {
    fontFamily: fonts.primary,
  },
});

export default WelcomeScreen;
