import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB-Oz6j_0cOaQRKYm4tEgW4Q_945Hl0l4I",
  authDomain: "almatierra-7796b.firebaseapp.com",
  projectId: "almatierra-7796b",
  storageBucket: "almatierra-7796b.appspot.com",
  messagingSenderId: "217540786535",
  appId: "1:217540786535:web:7f6f746a02c2110743d7c2",
  measurementId: "G-CH8PEFLF1J"
}

export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app);
export const auth = getAuth(app)
