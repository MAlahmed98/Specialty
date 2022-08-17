
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCLHpBcI14S5zN7GoQQ1VS7XehemIgjbMw",
  authDomain: "natural-bites-975a4.firebaseapp.com",
  projectId: "natural-bites-975a4",
  storageBucket: "natural-bites-975a4.appspot.com",
  messagingSenderId: "350446358179",
  appId: "1:350446358179:web:a4eb4a7759c290aafe3916"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
