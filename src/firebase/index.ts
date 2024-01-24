import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions, httpsCallable, } from "firebase/functions";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

const firebaseConfig = {
    apiKey: "AIzaSyBbwbNlgTpzc8n_k23USagY7-Ig5p5wp3o",
    authDomain: "mody-317821.firebaseapp.com",
    databaseURL: "https://mody-317821-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "mody-317821",
    storageBucket: "mody-317821.appspot.com",
    messagingSenderId: "801984824949",
    appId: "1:801984824949:web:293f5d982bdd7b82341a3c",
    measurementId: "G-P0DXKN1JNQ"
};


const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

export const db = getFirestore(app);
export const functionsApp = getFunctions(app, "europe-west3");

export const functions = (name: string, data: any = {}) => {
    return httpsCallable(functionsApp, name)(data) as Promise<{ data: any }>
}

export default app;