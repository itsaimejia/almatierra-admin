import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB-Oz6j_0cOaQRKYm4tEgW4Q_945Hl0l4I",
  authDomain: "almatierra-7796b.firebaseapp.com",
  databaseURL: "https://almatierra-7796b-default-rtdb.firebaseio.com",
  projectId: "almatierra-7796b",
  storageBucket: "almatierra-7796b.appspot.com",
  messagingSenderId: "217540786535",
  appId: "1:217540786535:web:7f6f746a02c2110743d7c2",
  measurementId: "G-CH8PEFLF1J"

}

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app)
export const auth = getAuth(app)
export const storage = getStorage(app)


