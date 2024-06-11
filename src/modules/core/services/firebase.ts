import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: import.meta.env.GOOGLE_API_KEY,
    authDomain: "roboatendente-5186f.firebaseapp.com",
    databaseURL: "https://roboatendente-5186f-default-rtdb.firebaseio.com",
    projectId: "roboatendente-5186f",
    storageBucket: "roboatendente-5186f.appspot.com",
    messagingSenderId: "763151331411",
    appId: "1:763151331411:web:0c177800b3cefcb3d196a6"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);