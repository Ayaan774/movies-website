// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider, signInWithPopup, signOut} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBiVF1qoZ_gMCuuXCwbEs5aaEJACoai01g",
  authDomain: "movie-webite.firebaseapp.com",
  projectId: "movie-webite",
  storageBucket: "movie-webite.firebasestorage.app",
  messagingSenderId: "474016030436",
  appId: "1:474016030436:web:813a16ef775c9514c4d6f1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); //authentication instance for initialized firebass app
const provider = new GoogleAuthProvider(); //creates a google authentication provider instance to sign in users via google

//Sign in with Google
export const signInWithGoogle = async() =>{
 const result = await signInWithPopup(auth,provider);
 console.log(result.user);
 return result.user;
}; //Opens a google sign in pop up and returns user details i.e name,email,profile pic

//Logout function

export const logOut = () =>{
    signOut(auth); //sign out user
}

export {auth}; //allows other files to access authentication functions like useAuthState() to check if user is logged in or not



