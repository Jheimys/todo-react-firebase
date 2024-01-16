import { initializeApp } from "firebase/app";

//import do banco de dados
import { getFirestore } from "firebase/firestore"

import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyA009GhudLFYmgOtlkwDfVFkeUm03MsC_8",
    authDomain: "cursoapp-6dd95.firebaseapp.com",
    projectId: "cursoapp-6dd95",
    storageBucket: "cursoapp-6dd95.appspot.com",
    messagingSenderId: "697436912488",
    appId: "1:697436912488:web:9d8914737868bb6835f4dd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)

const db = getFirestore(app)
const auth = getAuth(app);

export { db, auth }