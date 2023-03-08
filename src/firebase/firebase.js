// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";


// Due to this being a public file all API keys have been removed to protect users data. If you would like to run this site on your own machine 
// go to Firebase and start a project and plug your API keys below. If you have any questions email me at Jwyboyles@gmail.com and I can help you out.


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "API KEY HERE",
  authDomain: "API KEY HERE",
  projectId: "API KEY HERE",
  storageBucket: "API KEY HERE",
  messagingSenderId: "API KEY HERE",
  appId: "API KEY HERE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app)