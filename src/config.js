// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBzfa1AvyML96q-Lq168G4QyiC6kU2D3GQ",
    authDomain: "chatroom-project-e0a86.firebaseapp.com",
    projectId: "chatroom-project-e0a86",
    databaseURL:"https://chatroom-project-e0a86-default-rtdb.firebaseio.com/",
    storageBucket: "chatroom-project-e0a86.appspot.com",
    messagingSenderId: "528721533156",
    appId: "1:528721533156:web:f81ca3c43fe8a1c18f74f1",
    measurementId: "G-XKLL82613K"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase();
export const storage = getStorage();
