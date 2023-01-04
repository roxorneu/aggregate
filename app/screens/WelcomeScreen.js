import React from "react";
import { View, Text, ImageBackground, StyleSheet, Image } from "react-native";

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
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: colors.primary,
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },

  logoContainer: {
    position: "relative",
    alignSelf: "center",
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
});

export default WelcomeScreen;
