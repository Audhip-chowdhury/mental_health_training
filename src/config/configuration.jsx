// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDu0DdOgokO4HTpaViV_W3FjQUyZ3hJyTs",
  authDomain: "hr-quiz-app.firebaseapp.com",
  databaseURL: "https://hr-quiz-app-default-rtdb.firebaseio.com",
  projectId: "hr-quiz-app",
  storageBucket: "hr-quiz-app.firebasestorage.app",
  messagingSenderId: "341058487967",
  appId: "1:341058487967:web:d4eda05e218679663044aa",
  measurementId: "G-VYW2THLHP1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getFirestore(app);

export default database;
