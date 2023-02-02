import {
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";

import { useEffect, useState } from "react";

import Modal from "react-native-modal";

import { db, collection, getDocs, query, where } from "../../firebase";

import colors from "../config/colors";
import fonts from "../config/fonts";
import Trips from "../components/Trips";
import { TextInput } from "react-native-gesture-handler";
import DateAndTimePicker from "../components/DateAndTimePicker";
import DateTimeFormatter from "../utils/DateTimeFormatter";
import QueryToDocList from "../utils/QueryToDocList";

const ViewTripsScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [tripsList, setTripsList] = useState([]);

  const [filterDestination, setFilterDestination] = useState(false);
  const [filterTime, setFilterTime] = useState(false);

  const getTrips = async () => {
    //Single query with for all data chosen over multiple queries within modal etc.

    const q = query(
      collection(db, "trips"),
      where("dateTime", ">=", new Date().getTime())
    );

    const querySnapshot = await getDocs(q);
    const tempList = [];
    QueryToDocList(querySnapshot, tempList);
    tempList.sort((a, b) => b.meetupTime_epoch - a.meetupTime_epoch);
    setTripsList(tempList);
  };

  useEffect(() => {
    getTrips();
  }, []);

  const [tripDestination, setTripDestination] = useState("");

  const [fromDate, setFromDate] = useState(new Date());
  const [fromTime, setFromTime] = useState(new Date(Date.now()));

  const [toDate, setToDate] = useState(new Date());
  const [toTime, setToTime] = useState(new Date(Date.now()));

  const handleDestinationFiltering = async () => {
    if (tripDestination.trim() === "") {
      setFilterDestination(false);
      return;
    }
    //console.log(tripDestination);
    setFilterDestination(false);

    const q = query(
      collection(db, "trips"),
      where("destination", "==", tripDestination.toLowerCase().trim())
    );
    const querySnapshot = await getDocs(q);
    const tempList = [];
    QueryToDocList(querySnapshot, tempList);

    if (tempList.length === 0) {
      ToastAndroid.show(
        "No matching trips found,\n     Showing all trips",
        2000
      );
      setTripDestination("");
      return;
    }
    setTripsList(tempList);
    setTripDestination("");
    ToastAndroid.show("Pull down to reset filter", 1000);
  };

  const handleTimeFiltering = async () => {
    //console.log(DateTimeFormatter(fromDate, fromTime).valueOf());
    //console.log(DateTimeFormatter(toDate, toTime).valueOf());

    setFilterTime(false);
    const q = query(
      collection(db, "trips"),
      where("dateTime", ">=", DateTimeFormatter(fromDate, fromTime).valueOf()),
      where("dateTime", "<=", DateTimeFormatter(toDate, toTime).valueOf())
    );
    const querySnapshot = await getDocs(q);
    const tempList = [];
    QueryToDocList(querySnapshot, tempList);

    if (tempList.length === 0) {
      ToastAndroid.show(
        "No matching trips found,\n     Showing all trips",
        2000
      );
      return;
    }
    setTripsList(tempList);
    ToastAndroid.show("Pull down to reset filter", 1000);
  };

  return (
    <SafeAreaView style={styles.container}>
      {refreshing ? <ActivityIndicator /> : null}

      <View style={styles.tripFiltersContainer}>
        <Text style={styles.filterText}> Filter By: </Text>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setFilterDestination(true)}
        >
          <Text style={styles.filterBoxText}>Destination</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setFilterTime(true)}
        >
          <Text style={styles.filterBoxText}> Meetup Time </Text>
        </TouchableOpacity>
      </View>

      <Modal
        isVisible={filterDestination}
        onBackdropPress={() => setFilterDestination(false)}
        onBackButtonPress={() => setFilterDestination(false)}
        backdropOpacity={0.5}
      >
        <View style={styles.modalFilterBox}>
          <TextInput
            style={styles.modalDestinationInput}
            placeholder="Enter your destination"
            value={tripDestination}
            onChangeText={(text) => setTripDestination(text)}
          />

          <Pressable onPress={handleDestinationFiltering}>
            <Text style={styles.modalSubmitButton}>Filter!</Text>
          </Pressable>
        </View>
      </Modal>

      <Modal
        isVisible={filterTime}
        onBackdropPress={() => setFilterTime(false)}
        onBackButtonPress={() => setFilterTime(false)}
        backdropOpacity={0.5}
      >
        <View style={styles.modalFilterBox}>
          <Text style={styles.modalTimeFilterText}>Please set a range</Text>

          <DateAndTimePicker
            date={fromDate}
            setDate={setFromDate}
            time={fromTime}
            setTime={setFromTime}
            title="From"
          />

          <DateAndTimePicker
            date={toDate}
            setDate={setToDate}
            time={toTime}
            setTime={setToTime}
            title="To"
          />
          <Pressable onPress={handleTimeFiltering}>
            <Text style={styles.modalSubmitButton}>Filter!</Text>
          </Pressable>
        </View>
      </Modal>

      {tripsList.length > 0 ? (
        <FlatList
          style={styles.listStyle}
          numColumns={2}
          data={tripsList}
          renderItem={({ item }) => (
            <Trips
              userName={item.userName}
              destination={item.destination}
              meetupPoint={item.meetupPoint}
              meetupTime={item.meetupTime}
              coTravellers={item.coTravellers}
              vehicle={item.vehicle}
              otherInfo={item.otherInfo}
            />
          )}
          keyExtractor={(item) => item.id}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={getTrips}
              title="Reset Filters"
            />
          }
        ></FlatList>
      ) : (
        <ActivityIndicator />
      )}
    </SafeAreaView>
  );
};

export default ViewTripsScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    flex: 1,
    //justifyContent: "center",
    alignItems: "stretch",
    paddingTop: 0,
    paddingLeft: 0,
  },

  tripFiltersContainer: {
    width: "100%",
    height: 50,
    backgroundColor: colors.secondary,
    borderColor: colors.black,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    flexDirection: "row",
    alignContent: "space-around",
    alignSelf: "flex-start",
  },

  filterText: {
    alignSelf: "center",
    flex: 0.3,
    marginLeft: 10,
    fontSize: 14,
    fontFamily: fonts.secondry,
  },

  filterButton: {
    backgroundColor: colors.primary,
    alignSelf: "center",
    flex: 0.33,
    borderWidth: 1.5,
    margin: 5,
    marginLeft: 10,
    padding: 5,
    borderRadius: 10,
    alignItems: "center",
  },

  filterBoxText: {
    fontFamily: fonts.secondry,
  },

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

  listStyle: {
    marginLeft: 20,
    padding: 0,
  },
});
