import firebase from "firebase/compat/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDwXeCeHXlTyfcabj-daRTA_SVm128ocNs",
  authDomain: "parsecfunds.firebaseapp.com",
  databaseURL: "https://parsecfunds-default-rtdb.firebaseio.com",
  projectId: "parsecfunds",
  storageBucket: "parsecfunds.appspot.com",
  messagingSenderId: "574572901183",
  appId: "1:574572901183:web:e1772d29554c08cafa598a",
  measurementId: "G-BDXCM9VQV9"
};

const app = firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();
export { storage, firebase };

export const auth = getAuth(app);
export const db = getDatabase(app);
export default app;
