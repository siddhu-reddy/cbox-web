// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBcLlScLOgOj4ip2zm0xWHBwvN_RhFTUoA",
  authDomain: "cbox-ba12d.firebaseapp.com",
  projectId: "cbox-ba12d",
  storageBucket: "cbox-ba12d.firebasestorage.app",
  messagingSenderId: "597150829723",
  appId: "1:597150829723:web:7dc1737e3871a53f914a3e",
  measurementId: "G-293WHZEC0Y"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, RecaptchaVerifier, signInWithPhoneNumber };