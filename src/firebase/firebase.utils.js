import { initializeApp } from "firebase/app";
import { 
    getFirestore, 
    doc, 
    getDoc, 
    setDoc,  
} from "firebase/firestore";
import { 
    getAuth, 
    GoogleAuthProvider, 
    signInWithPopup 
} from "firebase/auth";

// Firebase Configuration
const config = {
    apiKey: "AIzaSyDbAiZ6mTrEthz7IJpuv-8h44ak9EgIA-s",
    authDomain: "crown-db-3fb93.firebaseapp.com",
    projectId: "crown-db-3fb93",
    storageBucket: "crown-db-3fb93.appspot.com",  // ✅ Fixed this line
    messagingSenderId: "256664497929",
    appId: "1:256664497929:web:5f60d144a992c1cb00edd8",
    measurementId: "G-GX6YWT0WJ9"
};

// Initialize Firebase
const app = initializeApp(config);

// Initialize Firebase Services
export const auth = getAuth(app);
export const firestore = getFirestore(app);

// Google Authentication Provider
const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => signInWithPopup(auth, provider);

// Function to Create User Profile in Firestore
export const createUserProfileDocument = async (userAuth, additionData) => {
    if (!userAuth) return;

    // ✅ Corrected: Pass `firestore` instance to `doc()`
    const userRef = doc(firestore, "users", userAuth.uid);
    const snapShot = await getDoc(userRef);

    if (!snapShot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userRef, {
                displayName,
                email,
                createdAt,
                ...additionData
            });
        } catch (error) {
            console.error("Error creating user: ", error.message);
        }
    }

    return userRef;
};
