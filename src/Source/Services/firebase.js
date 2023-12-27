// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA12SV7pg54K63WUWSGj_-UVDkMat6xvCM",
    authDomain: "referralrich-47d4c.firebaseapp.com",
    projectId: "referralrich-47d4c",
    storageBucket: "referralrich-47d4c.appspot.com",
    messagingSenderId: "126887954131",
    appId: "1:126887954131:web:217185444af432946d3626",
    measurementId: "G-8EDS07ENEF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const Auth = getAuth(app)

export {app, Auth}