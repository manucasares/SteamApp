import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDIBz1P1mk4xyEdxTgHwDfoVYSqSmQX2JA",
    authDomain: "journal-app-13538.firebaseapp.com",
    databaseURL: "https://journal-app-13538.firebaseio.com",
    projectId: "journal-app-13538",
    storageBucket: "journal-app-13538.appspot.com",
    messagingSenderId: "262134082620",
    appId: "1:262134082620:web:a1840f176ecec8e798a739"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {db, googleAuthProvider, firebase}