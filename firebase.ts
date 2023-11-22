import { initializeApp } from "firebase/app";
import { v4 } from "uuid";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
import { useEffect, useState } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyCSaXBC4xlchOB7Uoxp0hQod8_YANqBbm8",
  authDomain: "ofscriptai-1e43a.firebaseapp.com",
  projectId: "ofscriptai-1e43a",
  storageBucket: "ofscriptai-1e43a.appspot.com",
  messagingSenderId: "36156517186",
  appId: "1:36156517186:web:86cbb86dca34720cad76db",
};

const app = initializeApp(firebaseConfig);
let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}
const auth = getAuth(app);
const db = getFirestore(app);
const store = getStorage(app);
const provider = new GoogleAuthProvider();

export { db, store, auth, analytics };

export const signIn_ = async () => {
  return signInWithPopup(auth, provider).then((data) => {});
};

export const signOut_ = () => {
  return signOut(auth);
};

export const useAuth = () => {
  const [currentUser_, setCurrentUser_] = useState();

  useEffect(() => {
    // @ts-ignore
    const unsub = onAuthStateChanged(auth, (user) => setCurrentUser_(user));
    return unsub;
  }, []);
  return currentUser_;
};

export const recordTest_ = (data_: any) => {
    const collection_ = collection(db, "tests");
    setDoc(doc(collection_, v4()), data_)
      .then(() => {
        console.log("Data written to Firestore");
      })
      .catch((error) => {
        console.error("Error writing to Firestore:", error);
      });
  };

export const getTests = async () => {
  const colRef = collection(db, "tests");
  // const query_ = await query(colRef, where('owner', '==', 'RUvdWw22QmYVqBF9VYxKmKtJPtI2'))
  const data = await getDocs(colRef);
  return data.docs.map((doc_) => ({
    ...doc_.data(),
    id: doc_.id,
  }));
};
