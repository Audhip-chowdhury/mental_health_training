// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBSbf1nsUOVrVnxlCzD_XkLUntZZiQ-f-o",
  authDomain: "mental-health-training-d27e4.firebaseapp.com",
  databaseURL: "https://mental-health-training-d27e4-default-rtdb.firebaseio.com",
  projectId: "mental-health-training-d27e4",
  storageBucket: "mental-health-training-d27e4.firebasestorage.app",
  messagingSenderId: "48745831742",
  appId: "1:48745831742:web:fa663258f4183976a6a06f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getFirestore(app);

export default database;
