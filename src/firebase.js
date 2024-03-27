// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore/lite';


const firebaseConfig = {
  apiKey: "AIzaSyCRzlLocwlr1M8aaJU_MNddQI6lq54vHPk",
  authDomain: "voyancedata.firebaseapp.com",
  projectId: "voyancedata",
  storageBucket: "voyancedata.appspot.com",
  messagingSenderId: "717928933104",
  appId: "1:717928933104:web:05237089e0da3e22100435",
  measurementId: "G-RVPTVVRBBP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
export const analytics = getAnalytics(app);