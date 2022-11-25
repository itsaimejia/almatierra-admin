import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBvOInu0CN_rphNIxY_9jeWnBzNmlOqW7A",
  authDomain: "almatierra-d82ff.firebaseapp.com",
  projectId: "almatierra-d82ff",
  storageBucket: "almatierra-d82ff.appspot.com",
  messagingSenderId: "215494995286",
  appId: "1:215494995286:web:6877e2fd5348209eb0baf7"
}

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app)
export const auth = getAuth(app)
export const storage = getStorage(app)


