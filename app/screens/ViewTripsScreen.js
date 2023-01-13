import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";

import { useEffect, useState } from "react";

import { db, collection, getDocs } from "../../firebase";

import colors from "../config/colors";
import Trips from "../components/Trips";

const ViewTripsScreen = () => {
  const [tripsList, setTripsList] = useState([]);

  const getTrips = async () => {
    const querySnapshot = await getDocs(collection(db, "trips"));
    const tempList = [];
    querySnapshot.forEach((doc) => {
      console.log(doc.id, doc.data());
      const document = doc.data();
      tempList.push({
        id: doc.id,
        userID: document.userID,
        userName: document.userName,
        destination: document.destination,
        meetupPoint: document.meetupPoint,
        meetupTime: document.dateTime_HR,
        coTravellers: document.coTravellers,
        vehicle: document.vehicle,
        otherInfo: document.otherInfo,
      });
    });
    setTripsList(tempList);
    console.log(tripsList);
  };

  useEffect(() => {
    getTrips();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {tripsList.length > 0 ? (
        <FlatList
          style={styles.listStyle}
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
    justifyContent: "center",
    alignItems: "stretch",
    paddingTop: 0,
    paddingLeft: 30,
  },
  listStyle: {
    margin: 0,
  },
});
