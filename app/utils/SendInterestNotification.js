import { sendPushNotification } from "./NotificationsInit";
import { db, doc, getDoc } from "../../firebase";

const SendInterestNotification = async (userID, viewerName, destination) => {
  const docRef = doc(db, "users", userID);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    var token = docSnap.data().expoPushToken;

    var modalDestination = (str) =>
      str.replace(
        /(^\w|\s\w)(\S*)/g,
        (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase()
      );

    sendPushNotification(
      token,
      "Interest in your trip",
      viewerName +
        " is interested in your trip to " +
        modalDestination(destination)
    );
  } else {
    // doc.data() will be undefined in this case
    console.log("No such user!");
  }
};

export default SendInterestNotification;
