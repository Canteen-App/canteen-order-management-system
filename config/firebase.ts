// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCt_5LXKaDsJNmtbAM6xLoF2wmHIxszG2s",
  authDomain: "canteen-ordering-app.firebaseapp.com",
  projectId: "canteen-ordering-app",
  storageBucket: "canteen-ordering-app.appspot.com",
  messagingSenderId: "41114026092",
  appId: "1:41114026092:web:7c0125a1cb371eb6d29849",
  measurementId: "G-BG3XGX7HV3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
