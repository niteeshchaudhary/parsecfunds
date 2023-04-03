import { createContext, useContext, useEffect, useState } from "react";
import { getFunctions, httpsCallable } from "firebase/functions";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged, // what to do after gets logged in
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  sendEmailVerification,
  FacebookAuthProvider,
} from "firebase/auth";
import { onValue, ref, set } from "firebase/database";
import { db } from "../firebase";
import { auth } from "../firebase";
import app from "../firebase";
import { Navigate } from "react-router-dom";

const userAuthContext = createContext();
const functions = getFunctions(app, "asia-southeast2");
const storeUser = httpsCallable(functions, "storeUser");
export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState({});
  // const [verified,setverified] = useState(false);

  function logIn(email, password) {
    // if (auth.currentUser.emailVerified == false) {
    //   //await signOut(auth);
    //   console.log(auth.currentUser.emailVerified, auth.currentUser.email);
    //   throw new Error("verify the email first");
    // } else {
      return signInWithEmailAndPassword(auth, email, password);
    //}
    // console.log(auth.UserImpl.emailverified);
    // if(verified){
    // return signInWithEmailAndPassword(auth, email, password);
    // }
    // else{
    //   throw new Error("verify the email first");
    // }

    // onValue(ref(db), (snapshot) => {
    //   const data = snapshot.val();
    //   if (data !== null) {
    //     Object.values(data).map(todo=>{
    //         // setdata(oldArray => [...oldArray,todo])
    //         // if(todo.key===props.finalphones){
    //         if(todo.key===email){
    //           Navigate('/home')
    //           return signInWithEmailAndPassword(auth, email, password);
    //         }
    //     })
    //     // setdata(Object.values(data)[0]);
    //   }
    // });
    // Navigate('/home/profile');
    // return signInWithEmailAndPassword(auth, email, password);
  }

  async function signUp(email, name, role, password) {
    // sendEmailVerification(auth.currentUser);
    const result = createUserWithEmailAndPassword(auth, email, password);
    console.log(result);
    await sendEmailVerification((await result).user);
    await storeUser({ email: email, name: name, role: role });

    // await sendEmailVerification(auth.currentUser);

    // setverified(true);
    localStorage.setItem("verified", "true");
    return result;
  }
  function logOut() {
    return signOut(auth);
  }
  function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  }
  function facebookSignIn() {
    const facebookAuthProvider = new FacebookAuthProvider();
    return signInWithPopup(auth, facebookAuthProvider);
  }
  function reset(email) {
    return sendPasswordResetEmail(auth, email);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      // console.log("Auth", currentuser);
      // if(auth.currentUser!=null){
      //   if(auth.currentUser.emailVerified==false){
      //     throw new Error("click on captcha first");
      //   }
      //   else{
      //     setUser(currentuser);
      //   }

      //   console.log(auth.currentUser.emailVerified);
      // }
      setUser(currentuser);
      // if(auth.currentUser!=null){
      //   console.log(auth.currentUser.emailVerified);
      //   if(auth.currentUser.emailVerified){
      //       setverified(true);
      //   }
      // }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <userAuthContext.Provider
      value={{
        user,
        logIn,
        signUp,
        logOut,
        googleSignIn,
        facebookSignIn,
        reset,
      }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
