// takes in firestore query snapshot
// returns docs as an array of objects

const QueryToDocList = (querySnapshot, list) => {
  querySnapshot.forEach((doc) => {
    //console.log(doc.id, " => ", doc.data());
    const document = doc.data();
    list.push({
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
  });
};

export default QueryToDocList;
