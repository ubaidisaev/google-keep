import * as firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyA4TP-8VLi3IDeBrc2CFISIc9RreX1WBxE",
  authDomain: "isaev-react-app.firebaseapp.com",
  databaseURL: "https://isaev-react-app.firebaseio.com",
  // projectId: "isaev-react-app",
  // storageBucket: "isaev-react-app.appspot.com",
  // messagingSenderId: "1091715721095",
  // appId: "1:1091715721095:web:29a76b20cd74e59009d522"
};
// const databaseRef = firebase.database().ref();
// databaseRef.child("todos");

firebase.initializeApp(firebaseConfig);
export const db = firebase.database();
export const auth = firebase.auth();