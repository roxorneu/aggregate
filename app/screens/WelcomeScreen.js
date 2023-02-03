import React from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  Pressable,
  Animated,
} from "react-native";

import { useState, useEffect } from "react";

import colors from "../config/colors";
import fonts from "../config/fonts";
import strings from "../config/strings";

function WelcomeScreen({ navigation }) {
  const value = useState(new Animated.ValueXY({ x: 300, y: 300 }))[0];

  function animateLogo() {
    Animated.timing(value, {
      toValue: { x: 350, y: 350 },
      duration: 0,
      useNativeDriver: false,
    }).start(resetLogo);
  }

  function resetLogo() {
    Animated.timing(value, {
      toValue: { x: 300, y: 300 },
      duration: 300,
      useNativeDriver: false,
    }).start();
  }

  useEffect(() => {
    animateLogo();
  }, []);

  return (
    <ImageBackground style={styles.background}>
      <View style={styles.logoContainer}>
        <Animated.View style={{ width: value.x, height: value.y }}>
          <Pressable onPress={animateLogo}>
            <Image style={styles.logo} source={require("../assets/logo.png")} />
          </Pressable>
        </Animated.View>
      </View>

      <Text style={styles.logoText}> {strings.appName} </Text>
      <Pressable
        style={styles.loginButton}
        onPress={() => navigation.navigate(strings.loginScreen)}
      >
        <Text style={styles.loginText}>{strings.loginButtonText}</Text>
      </Pressable>

      <Pressable
        style={styles.registerButton}
        onPress={() => navigation.navigate(strings.registerScreen)}
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
    position: "absolute",
    alignSelf: "center",
    top: 130,
  },

  logo: {
    width: "100%",
    height: "100%",
  },

  logoText: {
    fontFamily: fonts.secondry,
    fontSize: 25,

    marginTop: 300,
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
    marginTop: 30,
  },

  loginText: {
    fontFamily: fonts.secondry,
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
    fontFamily: fonts.secondry,
  },
});

export default WelcomeScreen;
