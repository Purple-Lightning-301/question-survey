// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBBOHh13--WqOeFgyzDwLYEp7_qwDJO0DI",
  authDomain: "question-survey-807d7.firebaseapp.com",
  projectId: "question-survey-807d7",
  storageBucket: "question-survey-807d7.appspot.com",
  messagingSenderId: "77674200710",
  appId: "1:77674200710:web:8658da4a255b4bff255b07",
  databaseURL: "https://question-survey-807d7-default-rtdb.asia-southeast1.firebasedatabase.app"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);