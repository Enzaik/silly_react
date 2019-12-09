// Initialize Cloud Firestore through Firebase
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBXQmO6YCXpANeIGAoMfdQRg_cNvLr9h60",
    authDomain: "firetest-af12a.firebaseapp.com",
    databaseURL: "https://firetest-af12a.firebaseio.com",
    projectId: "firetest-af12a",
    storageBucket: "firetest-af12a.appspot.com",
    messagingSenderId: "414353431827",
    appId: "1:414353431827:web:356336caee0e29d8704ee6",
    measurementId: "G-J7Z2R7F87B"
  };

firebase.initializeApp(firebaseConfig);
  
export default firebase;