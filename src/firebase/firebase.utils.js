import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyDVsL8zThB7QR3CoFftyQNMNEi4KR1WQmA",
    authDomain: "crwn-db-22828.firebaseapp.com",
    databaseURL: "https://crwn-db-22828.firebaseio.com",
    projectId: "crwn-db-22828",
    storageBucket: "crwn-db-22828.appspot.com",
    messagingSenderId: "293581859613",
    appId: "1:293581859613:web:1d9bf9bfe3b7856bee4ff4",
    measurementId: "G-YZX282BEN6"
  };

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;