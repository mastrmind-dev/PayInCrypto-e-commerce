// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDC0GkUI0PU3gZkHhz2gJsW2AmwzSYgZPo",
  authDomain: "firecommerce-32f63.firebaseapp.com",
  projectId: "firecommerce-32f63",
  storageBucket: "firecommerce-32f63.appspot.com",
  messagingSenderId: "835932271267",
  appId: "1:835932271267:web:26282b62a8327cbc4b0516",
  measurementId: "G-W8K5DNV7QD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);

export default fireDB;