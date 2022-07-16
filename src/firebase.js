import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCJaWTzj02osfY8rbqvGR36liWEOoEakEg",
  authDomain: "rk-learning-a8fa7.firebaseapp.com",
  projectId: "rk-learning-a8fa7",
  storageBucket: "rk-learning-a8fa7.appspot.com",
  messagingSenderId: "990739481835",
  appId: "1:990739481835:web:cd1b203883d8132d456aae",
  measurementId: "G-8ZVZ78SPXN",
};

firebase.initializeApp(firebaseConfig);
export const storage = getStorage();
export default firebase;
