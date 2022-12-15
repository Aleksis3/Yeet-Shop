import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBxOw6xQPo_YuuMtUIL3u4jHN7jXs4rCpc",
  authDomain: "yeetshop-e444b.firebaseapp.com",
  projectId: "yeetshop-e444b",
  storageBucket: "yeetshop-e444b.appspot.com",
  messagingSenderId: "1041009178330",
  appId: "1:1041009178330:web:a0d22d022b33dc628917e3",
  measurementId: "G-8WP03B5V1X",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
    console.log(user);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
};

export { auth, db, logout, registerWithEmailAndPassword };
