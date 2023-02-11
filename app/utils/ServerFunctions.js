// connects to backend to update trips collection with new interested userID
// notification to trip host is handled by backend as well

import { getAuth } from "../../firebase";
import { BASE_URL } from "@env";

import axios from "axios";

async function updateInterestAndNotification(tripID, userName, destination) {
  const auth = getAuth();
  const user = auth.currentUser;

  const viewerID = user.uid;
  console.log(viewerID);

  const message = {
    tripID: tripID,
    userName: userName,
    destination: destination,
    interestedUsers: viewerID,
  };

  try {
    await axios.post(BASE_URL, message);
  } catch (err) {
    console.log(err);
  }
}

export { updateInterestAndNotification };
