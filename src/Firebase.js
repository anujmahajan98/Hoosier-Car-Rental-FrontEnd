
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useHistory } from "react-router-dom";



// const firebaseConfig = {
//   apiKey: "AIzaSyAcb7_xviYSUAeCgwLfMVpvkudOOgY55Jg",
//   authDomain: "hoosier-rentals-oauth.firebaseapp.com",
//   projectId: "hoosier-rentals-oauth",
//   storageBucket: "hoosier-rentals-oauth.appspot.com",
//   messagingSenderId: "532916415945",
//   appId: "1:532916415945:web:8236fccf901b8f1cab4c18"
// };

const firebaseConfig = {
    apiKey: "AIzaSyCTJUZqBR3acq6YdaJacpDm9dB8t5y0v1s",
    authDomain: "hoosierdemo-94412.firebaseapp.com",
    projectId: "hoosierdemo-94412",
    storageBucket: "hoosierdemo-94412.appspot.com",
    messagingSenderId: "1077021168382",
    appId: "1:1077021168382:web:13b6e76b7bc5b440174baf"
  };


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);


const provider = new GoogleAuthProvider();


export const signInWithGoogle = async () => {
    try {
      let user = await signInWithPopup(auth, provider);
      return user;
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };


// export const signInWithGoogle = () => {
//   signInWithPopup(auth, provider)
//     .then((result) => {
//       const name = result.user.displayName;
//       const email = result.user.email;

//       localStorage.setItem("name", name);
//       localStorage.setItem("email", email);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };