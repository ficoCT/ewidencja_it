// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAuth} from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDBv9s4IYjqllYZYK8iWFfpG9L5Qgm4eHQ",
    authDomain: "recordsofictequipment.firebaseapp.com",
    projectId: "recordsofictequipment",
    storageBucket: "recordsofictequipment.appspot.com",
    messagingSenderId: "867400008170",
    appId: "ComputerFormPrinting:867400008170:web:c0c3171d1f4db0161a7293",
    measurementId: "G-X3HNBK4MLE"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);