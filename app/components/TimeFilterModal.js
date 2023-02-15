import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";

import Modal from "react-native-modal";

import DateAndTimePicker from "./DateAndTimePicker";

import colors from "../config/colors";
import fonts from "../config/fonts";

const TimeFilterModal = (props) => {
  return (
    <View>
      {props.filterTime ? (
        <Modal
          isVisible={props.filterTime}
          onBackdropPress={() => props.setFilterTime(false)}
          onBackButtonPress={() => props.setFilterTime(false)}
          backdropOpacity={0.5}
        >
          <View style={styles.modalFilterBox}>
            <Text style={styles.modalTimeFilterText}>Please set a range</Text>

            <DateAndTimePicker
              date={props.fromDate}
              setDate={props.setFromDate}
              time={props.fromTime}
              setTime={props.setFromTime}
              title="From"
            />

            <DateAndTimePicker
              date={props.toDate}
              setDate={props.setToDate}
              time={props.toTime}
              setTime={props.setToTime}
              title="To"
            />
            <Pressable onPress={props.handleTimeFiltering}>
              <Text style={styles.modalSubmitButton}>Filter!</Text>
            </Pressable>
          </View>
        </Modal>
      ) : null}
    </View>
  );
};

export default TimeFilterModal;

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

  modalTimeFilterText: {
    backgroundColor: colors.primary,
    textAlign: "center",
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
