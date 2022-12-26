import firebase from "firebase";
import 'firebase/auth'
import 'firebase/firebase'

const firebaseConfig = {
  apiKey: "AIzaSyBhAeTitOu2af7i4jUHHOpiUdIUqYFJeMU",
  authDomain: "olx-week-15.firebaseapp.com",
  projectId: "olx-week-15",
  storageBucket: "olx-week-15.appspot.com",
  messagingSenderId: "480183441138",
  appId: "1:480183441138:web:19d24470ce3e04e53ce26b",
  measurementId: "G-MVNL88NNZQ"
};

export default firebase.initializeApp(firebaseConfig)