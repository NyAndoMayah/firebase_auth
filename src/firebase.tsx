import { initializeApp } from "firebase/app"; 
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  GithubAuthProvider
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc
} from "firebase/firestore";
import { FacebookAuthProvider } from "firebase/auth";
import { useContext } from "react";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBU65Mw6Ycz64uSC_f_T9w9QejrBQwP5-Y",
  authDomain: "fir-aad5b.firebaseapp.com",
  projectId: "fir-aad5b",
  storageBucket: "fir-aad5b.appspot.com",
  messagingSenderId: "675144862969",
  appId: "1:675144862969:web:06b4aa5602ea9ebdde2628",
  measurementId: "G-F291N5V30T"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err : any) {
    console.error(err);
    alert(err.message);
  }
};


const facebookProvider = new FacebookAuthProvider();
        facebookProvider.addScope('email');

const logInWithFacebook =  async () => {
  try {
    const res = await signInWithPopup(auth, facebookProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err : any) {
    console.error(err);
    alert(err.message);
  }
};

const githubProvider = new GithubAuthProvider();
const logInWithGithub =  async () => {
  try {
    const res = await signInWithPopup(auth, githubProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err : any) {
    console.error(err);
    alert(err.message);
  }
};

const logInWithEmailAndPassword = async (email : string, password : string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err : any) {
    console.error(err);
    alert(err.message);
  }
};

const registerWithEmailAndPassword = async (name : string, email : string, password : string) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (err : any) {
    console.error(err);
    alert(err.message);
  }
};

const sendPasswordReset = async (email : string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err : any) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
};

export {
  auth,
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
  logInWithFacebook,
  logInWithGithub
};
