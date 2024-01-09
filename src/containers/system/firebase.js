// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAaLS66I3g9vcSxzgnJsC9h2JFAMDguFbE",
  authDomain: "music-ed1de.firebaseapp.com",
  databaseURL: "https://music-ed1de-default-rtdb.firebaseio.com",
  projectId: "music-ed1de",
  storageBucket: "music-ed1de.appspot.com",
  messagingSenderId: "1034689839306",
  appId: "1:1034689839306:web:4a4cbcd5afc69916653433",
  measurementId: "G-M3HM8NN1CM",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
export { storage, firebase as default };
