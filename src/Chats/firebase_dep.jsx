import firebase from "firebase/compat/app";

import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/analytics";

const frb = firebase.initializeApp({
  apiKey: "AIzaSyDwXeCeHXlTyfcabj-daRTA_SVm128ocNs",
  authDomain: "parsecfunds.firebaseapp.com",
  databaseURL: "https://parsecfunds-default-rtdb.firebaseio.com",
  projectId: "parsecfunds",
  storageBucket: "parsecfunds.appspot.com",
  messagingSenderId: "574572901183",
  appId: "1:574572901183:web:e1772d29554c08cafa598a",
  measurementId: "G-BDXCM9VQV9"
});
const auth = frb.auth();
const firestore = frb.firestore();
async function checkChange(msglast) {
  return frb
    .database()
    .ref("chatMessages")
    .orderByKey()
    .startAfter(msglast)
    .on("value", (res) => {
      return res.val();
    });
}

function SignIn() {
  const mystyle = {
    goog: {
      color: "white",
      backgroundColor: "rgb(200,200,100)",
      width: "80%",
      margin: "10px 0 30px 0",
      padding: "10px",
      fontFamily: "Arial",
      border: "5px",
      borderColor: "green",
    },
  };
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };
  return (
    <button onClick={signInWithGoogle} style={mystyle.goog}>
      Sign In With Google
    </button>
  );
}

function SignOut() {
  return (
    auth.currentUser && <button onClick={() => auth.signOut()}>Sign Out</button>
  );
}

export default frb;
export { auth, firestore, SignIn, SignOut };
