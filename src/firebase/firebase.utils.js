import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const config = {
    apiKey: "AIzaSyDbAiZ6mTrEthz7IJpuv-8h44ak9EgIA-s",
    authDomain: "crown-db-3fb93.firebaseapp.com",
    projectId: "crown-db-3fb93",
    storageBucket: "crown-db-3fb93.firebasestorage.app",
    messagingSenderId: "256664497929",
    appId: "1:256664497929:web:5f60d144a992c1cb00edd8",
    measurementId: "G-GX6YWT0WJ9"
};

const app = initializeApp(config);

export const auth = getAuth(app);
export const firestore = getFirestore(app);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => signInWithPopup(auth, provider);
