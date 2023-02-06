import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
import React from "react";

import Modal from "react-native-modal";

import colors from "../config/colors";
import fonts from "../config/fonts";

const DestinationFilterModal = (props) => {
  return (
    <Modal
      isVisible={props.filterDestination}
      onBackdropPress={() => props.setFilterDestination(false)}
      onBackButtonPress={() => props.setFilterDestination(false)}
      backdropOpacity={0.5}
    >
      <View style={styles.modalFilterBox}>
        <TextInput
          style={styles.modalDestinationInput}
          placeholder="Enter your destination"
          value={props.tripDestination}
          onChangeText={(text) => props.setTripDestination(text)}
        />

        <Pressable onPress={props.handleDestinationFiltering}>
          <Text style={styles.modalSubmitButton}>Filter!</Text>
        </Pressable>
      </View>
    </Modal>
  );
};

export default DestinationFilterModal;

const styles = StyleSheet.create({
  modalFilterBox: {
    backgroundColor: colors.secondary,
    width: "95%",
    alignSelf: "center",
    alignItems: "center",
    padding: 8,
    paddingLeft: 15,
    borderRadius: 15,
    elevation: 10,
    marginTop: 20,
    fontFamily: fonts.secondry,
    fontSize: 15,
    textAlign: "center",
  },

  modalDestinationInput: {
    backgroundColor: colors.primary,
    width: "98%",
    fontSize: 15,
    borderRadius: 15,
    margin: 10,
    padding: 8,
    fontFamily: fonts.secondry,
  },

  modalSubmitButton: {
    backgroundColor: colors.primary,
    width: 130,
    color: colors.black,
    textAlign: "center",
    margin: 15,
    padding: 8,
    borderRadius: 10,
    borderWidth: 1,
    elevation: 5,
    fontFamily: fonts.secondry,
    fontSize: 18,
  },
});
