// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCmrrXHQCIwKzEqGWzeFUkmCeYB1onG3c4",
  authDomain: "aggregate-41f8a.firebaseapp.com",
  projectId: "aggregate-41f8a",
  storageBucket: "aggregate-41f8a.appspot.com",
  messagingSenderId: "216515473668",
  appId: "1:216515473668:web:c04bc774c308b754276051",
  measurementId: "G-RZ5JRP39V4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);

const db = getFirestore(app);

export {
  auth,
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  db,
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
};
