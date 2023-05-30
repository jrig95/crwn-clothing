// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {
  getFirestore, doc, getDoc, setDoc
} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxZasEiLktgmBowUcou5OcMI078eCO5BA",
  authDomain: "crwn-clothing-db-cea55.firebaseapp.com",
  projectId: "crwn-clothing-db-cea55",
  storageBucket: "crwn-clothing-db-cea55.appspot.com",
  messagingSenderId: "1017338590178",
  appId: "1:1017338590178:web:5b199fa94fc2cf46cb7fbb",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Set Provider
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid );

  const userSnapShot = await getDoc(userDocRef);

  if (!userSnapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, { displayName, email, createdAt });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  return userDocRef;
};



// if user data does not exist
//  create / set the document with the data from userAuth in my firebase collection

// if user data exists
