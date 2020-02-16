import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (err) {
      console.log("error creating user", err.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;