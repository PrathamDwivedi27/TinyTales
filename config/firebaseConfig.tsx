// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAetWx353NkEiE7bVDsqKjzua63HL7ePRI",
  authDomain: "tinytales-6882e.firebaseapp.com",
  projectId: "tinytales-6882e",
  storageBucket: "tinytales-6882e.appspot.com",
  messagingSenderId: "741551106080",
  appId: "1:741551106080:web:655619d55a55337519b445",
  measurementId: "G-F2PEN1D523"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage=getStorage(app);

