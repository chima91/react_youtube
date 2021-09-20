import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCTNGNi0hVGlipVOc7Ui3CWk-nu4Jgb4ss",
  authDomain: "react-a88c9.firebaseapp.com",
  projectId: "react-a88c9",
  storageBucket: "react-a88c9.appspot.com",
  messagingSenderId: "1055992332617",
  appId: "1:1055992332617:web:2c15446340e3f1adc0da98"
};

firebase.initializeApp(firebaseConfig);

export const fireAuth = firebase.auth();
export const storage = firebase.storage();
export const firestore = firebase.firestore();
export default firebase;