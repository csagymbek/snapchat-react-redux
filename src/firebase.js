import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBO1lntygVCe6xIT4tuRse_xV4EZEPJDpo",
  authDomain: "snapchat-react-redux-c7eae.firebaseapp.com",
  projectId: "snapchat-react-redux-c7eae",
  storageBucket: "snapchat-react-redux-c7eae.appspot.com",
  messagingSenderId: "9561644123",
  appId: "1:9561644123:web:9f82ad48abdf3b7022b37e",
  measurementId: "G-F0WGMH5D0P",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
export const db = firebaseApp.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();
export const provider = new firebase.auth.GoogleAuthProvider();
