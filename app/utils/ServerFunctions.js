// connects to backend to update trips collection with new interested userID
// notification to trip host is handled by backend as well

import { getAuth } from "../../firebase";
import {
  SERVER,
  TRIP_UPDATE_URL,
  USER_UPDATE_URL,
  TRIP_CREATED_URL,
} from "@env";

import axios from "axios";

async function updateInterestAndNotification(
  userID,
  tripID,
  userName,
  destination
) {
  const auth = getAuth();
  const user = auth.currentUser;

  const viewerID = user.uid;
  //console.log(viewerID);

  const message = {
    tripID: tripID,
    userID: userID,
    userName: userName,
    destination: destination,
    interestedUsers: viewerID,
    interestedUserName: user.displayName.split("|")[0],
  };

  try {
    await axios.post(SERVER + TRIP_UPDATE_URL, message);
  } catch (err) {
    console.log(err);
  }
}

async function updateUserToken(userID, userName, token) {
  const message = {
    userID: userID,
    userName: userName,
    token: token,
  };

  try {
    await axios.post(SERVER + USER_UPDATE_URL, message);
  } catch (err) {
    console.log(err);
  }
}

async function tripCreatedNotification(token, destination) {
  const message = {
    token: token,
    destination: destination,
  };

  try {
    await axios.post(SERVER + TRIP_CREATED_URL, message);
  } catch (err) {
    console.log(err);
  }
}

export {
  updateInterestAndNotification,
  updateUserToken,
  tripCreatedNotification,
};
