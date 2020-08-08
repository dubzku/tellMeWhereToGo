import firebase from 'firebase/app';
import 'firebase/database';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyC2acaAMjzdXtheezetRsrw2gdVwpYEg8E",
    authDomain: "winnie-ku-project-five.firebaseapp.com",
    databaseURL: "https://winnie-ku-project-five.firebaseio.com",
    projectId: "winnie-ku-project-five",
    storageBucket: "winnie-ku-project-five.appspot.com",
    messagingSenderId: "255739567594",
    appId: "1:255739567594:web:d360859934c83adb6e2693"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
