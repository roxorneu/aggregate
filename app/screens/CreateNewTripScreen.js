import { ImageBackground, StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../config/colors";

const CreateNewTripScreen = () => {
  return (
    <ImageBackground style={styles.container}>
      <Text>CreateNewTripScreen</Text>
    </ImageBackground>
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
});
