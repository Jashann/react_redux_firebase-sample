import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/analytics";

var firebaseConfig = {
  apiKey: "AIzaSyA-VDO5seZuXQtQaj3EXOFnaBWf1HGboNg",
  authDomain: "firestore-c4524.firebaseapp.com",
  databaseURL: "https://firestore-c4524.firebaseio.com",
  projectId: "firestore-c4524",
  storageBucket: "firestore-c4524.appspot.com",
  messagingSenderId: "478497135434",
  appId: "1:478497135434:web:60a4bacadd36097361bfb3",
  measurementId: "G-Z2PGYNW6DV",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const auth = firebase.auth();
export const db = firebase.firestore();

export const providerGoogle = new firebase.auth.GoogleAuthProvider();
