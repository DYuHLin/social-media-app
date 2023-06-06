import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getStorage} from "firebase/storage";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDSvxlGeYW1c5_BzPS4CDvgEHXc6hUTn7w",
  authDomain: "social-media-app-f9a3d.firebaseapp.com",
  projectId: "social-media-app-f9a3d",
  storageBucket: "social-media-app-f9a3d.appspot.com",
  messagingSenderId: "62116226155",
  appId: "1:62116226155:web:a48b2dcfa02a9bccd1bd2e"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();