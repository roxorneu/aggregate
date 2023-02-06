import {
  ActivityIndicator,
  FlatList,
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

import { db, collection, getDocs, query, where, getAuth } from "../../firebase";

import colors from "../config/colors";
import fonts from "../config/fonts";
import Trips from "../components/Trips";
import DateTimeFormatter from "../utils/DateTimeFormatter";
import QueryToDocList from "../utils/QueryToDocList";
import strings from "../config/strings";
import DestinationFilterModal from "../components/DestinationFilterModal";
import TimeFilterModal from "../components/TimeFilterModal";
import FiltersBar from "../components/FiltersBar";

const ViewTripsScreen = ({ navigation }) => {
  const auth = getAuth();
  const user = auth.currentUser;

  const [refreshing, setRefreshing] = useState(false);
  const [tripsList, setTripsList] = useState([]);

  const [filterDestination, setFilterDestination] = useState(false);
  const [filterTime, setFilterTime] = useState(false);

  const collectionByCity = user.displayName.split("|")[1];

  const getTrips = async () => {
    //Single query with for all data chosen over multiple queries within modal etc.
    // Current query returns all possible trips, in future to be replaced by location filtering
    // where("destination", "==", user.displayName.split("|")[1])

    const q = query(
      collection(db, collectionByCity),
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
    //setRefreshing(false);
  }, []);

  const [tripDestination, setTripDestination] = useState("");

  const [fromDate, setFromDate] = useState(new Date());
  const [fromTime, setFromTime] = useState(new Date(Date.now()));

  const [toDate, setToDate] = useState(new Date());
  const [toTime, setToTime] = useState(new Date(Date.now()));

  const handleEmptyList = () => {
    ToastAndroid.show(
      "No matching trips found,\n Showing all trips in city",
      2000
    );
    return false;
  };

  const handleDestinationFiltering = async () => {
    setFilterDestination(false);

    if (tripDestination.trim() === "") {
      return;
    }

    const q = query(
      collection(db, collectionByCity),
      where("destination", "==", tripDestination.toLowerCase().trim())
    );
    const querySnapshot = await getDocs(q);
    const tempList = [];
    QueryToDocList(querySnapshot, tempList);

    setTripDestination("");

    if (tempList.length === 0) {
      return handleEmptyList();
    }
    setTripsList(tempList);
    ToastAndroid.show("Pull down to reset filter", 2000);
  };

  const handleTimeFiltering = async () => {
    setFilterTime(false);
    const q = query(
      collection(db, collectionByCity),
      where("dateTime", ">=", DateTimeFormatter(fromDate, fromTime).valueOf()),
      where("dateTime", "<=", DateTimeFormatter(toDate, toTime).valueOf())
    );
    const querySnapshot = await getDocs(q);
    const tempList = [];
    QueryToDocList(querySnapshot, tempList);

    if (tempList.length === 0) {
      return handleEmptyList();
    }
    setTripsList(tempList);
    ToastAndroid.show("Pull down to reset filter", 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      {refreshing ? <ActivityIndicator /> : null}

      <FiltersBar
        setFilterDestination={setFilterDestination}
        setFilterTime={setFilterTime}
      />

      <DestinationFilterModal
        filterDestination={filterDestination}
        setFilterDestination={setFilterDestination}
        tripDestination={tripDestination}
        setTripDestination={setTripDestination}
        handleDestinationFiltering={handleDestinationFiltering}
      />

      <TimeFilterModal
        filterTime={filterTime}
        setFilterTime={setFilterTime}
        fromDate={fromDate}
        setFromDate={setFromDate}
        fromTime={fromTime}
        setFromTime={setFromTime}
        toDate={toDate}
        setToDate={setToDate}
        toTime={toTime}
        setToTime={setToTime}
        handleTimeFiltering={handleTimeFiltering}
      />

      {tripsList.length >= 0 ? (
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
        <ActivityIndicator style={{ padding: 20 }} />
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

  listStyle: {
    marginLeft: 20,
    padding: 0,
  },
});
