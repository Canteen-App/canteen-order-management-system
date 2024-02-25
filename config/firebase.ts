// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBMTdtVO4D6w16ecu5rqdu9cn17q48V3pM",
  authDomain: "canteen-order-api.firebaseapp.com",
  projectId: "canteen-order-api",
  storageBucket: "canteen-order-api.appspot.com",
  messagingSenderId: "933539250560",
  appId: "1:933539250560:web:e805a8cdcec43d648d8165",
  measurementId: "G-W53CM12CG7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
