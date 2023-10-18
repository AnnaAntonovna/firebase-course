import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
)


const firebaseConfig = {
    apiKey: "AIzaSyCsBV2V5xktP5s6HL0wb3z7OVWao3tt8c8",
    authDomain: "fir-course-533e9.firebaseapp.com",
    projectId: "fir-course-533e9",
    storageBucket: "fir-course-533e9.appspot.com",
    messagingSenderId: "117719650987",
    appId: "1:117719650987:web:e2c7e2a4022bfef0be9dee",
    measurementId: "G-H1X7DB4XJ4"
  };
  
initializeApp(firebaseConfig);

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)