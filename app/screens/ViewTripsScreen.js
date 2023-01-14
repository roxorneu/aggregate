import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
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
  const [refreshing, setRefreshing] = useState(false);
  const [tripsList, setTripsList] = useState([]);

  const getTrips = async () => {
    const querySnapshot = await getDocs(collection(db, "trips"));
    const tempList = [];
    querySnapshot.forEach((doc) => {
      //console.log(doc.id, doc.data());
      const document = doc.data();
      if (document.dateTime > new Date().getTime()) {
        tempList.push({
          id: doc.id,
          userID: document.userID,
          userName: document.userName,
          destination: document.destination,
          meetupPoint: document.meetupPoint,
          meetupTime: document.dateTime_HR,
          meetupTime_epoch: document.dateTime,
          coTravellers: document.coTravellers,
          vehicle: document.vehicle,
          otherInfo: document.otherInfo,
        });
      }
    });
    tempList.sort((a, b) => b.meetupTime_epoch - a.meetupTime_epoch);
    setTripsList(tempList);
  };

  useEffect(() => {
    getTrips();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {refreshing ? <ActivityIndicator /> : null}

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
            <RefreshControl refreshing={refreshing} onRefresh={getTrips} />
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
    justifyContent: "center",
    alignItems: "stretch",
    paddingTop: 0,
    paddingLeft: 30,
  },
  listStyle: {
    margin: 0,
    padding: 0,
  },
});
