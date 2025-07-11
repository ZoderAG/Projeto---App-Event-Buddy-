import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAFNWQKWZKNeX5R0Q8NA0uuJHJG_wnbe9s",
  authDomain: "db-bbc67.firebaseapp.com",
  projectId: "db-bbc67",
  storageBucket: "db-bbc67.appspot.com",
  messagingSenderId: "1002967869255",
  appId: "1:1002967869255:web:a417ea1971639bcbf3ce62",
  measurementId: "G-4YQP58C0MH"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export default firebase;
