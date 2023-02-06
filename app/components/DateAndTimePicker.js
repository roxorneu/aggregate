import React, { useState } from "react";

import { Pressable, StyleSheet, Text, View } from "react-native";

import RNDateTimePicker from "@react-native-community/datetimepicker";

import dayjs from "dayjs";
import colors from "../config/colors";
import fonts from "../config/fonts";

export default function DateAndTimePicker(props) {
  const { date, setDate, time, setTime } = props;

  const [datePicker, setDatePicker] = useState(false);

  const [timePicker, setTimePicker] = useState(false);

  function showDatePicker() {
    setDatePicker(true);
  }

  function showTimePicker() {
    setTimePicker(true);
  }

  function onDateSelected(event, value) {
    setDatePicker(false);
    setDate(value);
  }

  function onTimeSelected(event, value) {
    setTimePicker(false);
    setTime(value);
  }

  return (
    <View style={format.departureStyle}>
      <Text style={format.text}>{props.title} </Text>

      <View style={format.dateTimeContainer}>
        <Text style={format.text}>{dayjs(date).format("DD MMM YYYY")} </Text>

        <View>
          {datePicker && (
            <RNDateTimePicker
              value={date}
              mode={"date"}
              display={Platform.OS === "ios" ? "spinner" : "default"}
              is24Hour={true}
              minimumDate={new Date()}
              maximumDate={new Date(Date.now() + 15 * 86400000)}
              onChange={onDateSelected}
            />
          )}

          {!datePicker && (
            <Pressable onPress={showDatePicker}>
              <View style={format.buttons}>
                <Text style={format.buttonText}>Update</Text>
              </View>
            </Pressable>
          )}
        </View>
      </View>

      <View style={format.dateTimeContainer}>
        <Text style={format.text}>{dayjs(time).format("hh:mm A")} </Text>

        <View>
          {timePicker && (
            <RNDateTimePicker
              value={time}
              mode={"time"}
              display={Platform.OS === "ios" ? "spinner" : "default"}
              is24Hour={false}
              onChange={onTimeSelected}
            />
          )}

          {!timePicker && (
            <Pressable onPress={showTimePicker}>
              <View style={format.buttons}>
                <Text style={format.buttonText}>Update</Text>
              </View>
            </Pressable>
          )}
        </View>
      </View>
    </View>
  );
}

const format = StyleSheet.create({
  departureStyle: {
    backgroundColor: colors.secondary,
    width: "70%",
    alignSelf: "center",
    alignItems: "center",
    padding: 8,
    paddingLeft: 15,
    borderRadius: 15,
    elevation: 5,
    marginTop: 20,
  },

  MainContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
  },

  dateTimeContainer: {
    width: "100%",
    flexDirection: "row",
  },

  text: {
    fontSize: 15,
    padding: 5,
    marginBottom: 12,
    alignSelf: "flex-start",
    fontFamily: fonts.secondry,
  },

  buttonText: {
    fontSize: 16,
    padding: 5,
    textAlign: "left",
    color: colors.black,
    fontFamily: fonts.secondry,
  },

  buttons: {
    borderStyle: "solid",
    justifyContent: "center",
    marginBottom: 5,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: colors.primary,
    borderColor: colors.black,
  },
});
