import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyB89IZj7T0raYTNGpbgF3EUPJc9su_i7Oo",
  authDomain: "timetable-ind.firebaseapp.com",
  projectId: "timetable-ind",
  storageBucket: "timetable-ind.appspot.com",
  messagingSenderId: "206393385682",
  appId: "1:206393385682:web:895760434684b644f1030b"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();

// Function to sign in with Google
function signInWithGoogle() {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      console.log("Signed in with Google:", user);
      window.location.href = "time.html"
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Google sign-in error:", errorMessage);
    });
}

// Add event listener to the Google Sign-In button
const googleSignInButton = document.getElementById('google-sign-in-button');
googleSignInButton.addEventListener('click', signInWithGoogle);