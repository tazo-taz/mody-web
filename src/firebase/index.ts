import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions, httpsCallable, } from "firebase/functions";
import { getStorage, ref, uploadBytes } from "firebase/storage";

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
export const storage = getStorage(app);

export const getFileStorageRef = (filename: string) => {
    return ref(storage, filename);
}

export const functions = async (name: string, data: any = {}) => {
    try {
        const res = await httpsCallable(functionsApp, name)(data);
        return res as unknown as Promise<{ data: any }>
    } catch (error) {
        return Promise.resolve({
            data: {
                result: false
            }
        })
    }
}

// generate random id
export const generateId = () => {
    return Math.random().toString(36).substr(2, 9);
}

export const uploadFile = async (imageUpload: File, filename: string) => {
    try {
        const imageRef = getFileStorageRef(filename);
        await uploadBytes(imageRef, imageUpload, {
            customMetadata: {
                type: 'client_avatar',
            },
        })

        console.log('Uploaded a blob or file!');

    } catch (error) {
        console.log(error);
    }
}

export default app;