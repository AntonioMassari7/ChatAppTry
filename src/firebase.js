
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore";
import { getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDQt4Um-ZiD5KtEdYKIZsdVGjhQ6dzSh0I",
  authDomain: "chat-its-4346b.firebaseapp.com",
  projectId: "chat-its-4346b",
  storageBucket: "chat-its-4346b.appspot.com",
  messagingSenderId: "589032151753",
  appId: "1:589032151753:web:d448270072096e30810b18"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const  auth = getAuth()
export const storage = getStorage();  
export const db = getFirestore();