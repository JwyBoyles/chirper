import { auth } from './firebase'
import { 
    getAuth, 
    createUserWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider, 
    signOut, 
    signInWithEmailAndPassword, 
    } from "firebase/auth";

export function signUpEmail(userEmail, userPassword) {
   
    createUserWithEmailAndPassword(auth, userEmail, userPassword)
    .then((userCredential) => {
      // Signed in 
      
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
}

export function signInEmail(userEmail, userPassword) {
    signInWithEmailAndPassword(auth, userEmail, userPassword)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}

export async function handleGoogleSignIn() {
    // Sign in Firebase using popup auth and Google as the identity provider.
    const provider = new GoogleAuthProvider();
    await signInWithPopup(getAuth(), provider);
  }

export function signOutUser() {
    // Sign out of Firebase.
    signOut(getAuth());
  }

export const status = getAuth();

 