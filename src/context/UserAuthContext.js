import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged, // what to do after gets logged in
  signOut,
  sendPasswordResetEmail,
  sendEmailVerification,
} from "firebase/auth";
import { db } from "../firebase";
import { auth } from "../firebase";
import app from "../firebase";
import {
  getDatabase,
  push,
  ref,
  set,
  update,
  get,
  child,
} from "firebase/database";
import s_events from "../truffle_abi/Event.json";
import s_funds from "../truffle_abi/funds.json";
import Web3 from "web3";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [w3state, setw3state] = useState({
    web3: null,
    accounts: null,
    funds: null,
    events: null,
    balance: "",
  });
  // const [verified,setverified] = useState(false);
  // const navigate = useNavigate();
  async function logIn(email, password) {
    return await signInWithEmailAndPassword(auth, email, password)
      .then(async (rr) => {
        if (auth.currentUser.emailVerified == false) {
          console.log(auth.currentUser.emailVerified, auth.currentUser.email);
          console.log("false", auth.currentUser.emailVerified);
          return true;
          await signOut(auth);
          throw new Error("verify the email first");
        } else {
          console.log("true", rr);
          return true;
        }
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  }

  async function signUp(values) {
    const result = createUserWithEmailAndPassword(
      auth,
      values.email,
      values.password
    );
    console.log(result);
    try {
      await sendEmailVerification((await result).user).then(async () => {
        var usr = values.email;
        var usr1 = usr.replaceAll(".", "_");
        var usr2 = usr1.replaceAll("@", "_");
        console.log(usr2);
        values["password"] = "****";
        values["cpassword"] = "****";
        set(ref(db, "userdata/" + usr2), values)
          .then((r) => {
            window.location.href = "/";
            console.log(r);
          })
          .catch((e) => {
            console.log(e);
          });
      });
    } catch (err) {
      console.log("12", err);
    }

    return result;
  }

  async function logOut() {
    localStorage.clear();
    setw3state(null);
    await signOut(auth).then(() => {
      setUser(null);
    });
    return await auth.signOut();
  }

  function reset(email) {
    return sendPasswordResetEmail(auth, email);
  }

  function setUserStatus() {
    //var usr = user;
    //var pf = user.profile;
    //pf["profilestatus"] = true;
    //usr["profile"] = pf;
    //setUser(usr);
  }

  const errorsetuser = () => {
    const dbRef = ref(getDatabase());
    var usr = auth.currentUser.email;
    var usr1 = usr.replaceAll(".", "_");
    var usr2 = usr1.replaceAll("@", "_");
    get(child(dbRef, "userdata/" + usr2))
      .then((snapshot) => {
        if (snapshot.exists()) {
          //console.log(snapshot.val());
          var cusr = auth.currentUser;
          cusr["profile"] = snapshot.val();
          setUser(cusr, loadBlockchain());

          console.log(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
    if (currentuser && !user) {
      const dbRef = ref(getDatabase());
      var usr = currentuser.email;
      var usr1 = usr.replaceAll(".", "_");
      var usr2 = usr1.replaceAll("@", "_");
      get(child(dbRef, "userdata/" + usr2))
        .then((snapshot) => {
          if (snapshot.exists()) {
            //console.log(snapshot.val());
            currentuser["profile"] = snapshot.val();
            setUser(currentuser, loadBlockchain());

            console.log(snapshot.val());
          } else {
            console.log("No data available");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  });

  useEffect(() => {
    return () => {
      unsubscribe();
    };
  }, [user, auth]);

  async function loadWeb3() {
    if (window.ethereuem) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  }
  async function loadBlockchain() {
    const web3 = window.web3;
    if (
      w3state?.accounts === user?.profile?.wallet ||
      (w3state?.accounts && w3state?.balance)
    ) {
      return;
    }
    var accounts;
    if (user?.profile?.wallet) {
      accounts = [user.profile.wallet];
    } else {
      return;
      // accounts = await web3.eth.getAccounts();
    }
    // console.log(accounts);
    const networkID = await web3.eth.net.getId();
    const deployedNetwork = s_funds.networks[networkID];
    const balance = await web3.eth.getBalance(accounts[0]);
    const balanceString = balance.toString();
    const instancefunds = new web3.eth.Contract(
      s_funds.abi,
      deployedNetwork && deployedNetwork.address
    );
    const instanceevents = new web3.eth.Contract(
      s_events.abi,
      deployedNetwork && deployedNetwork.address
    );

    setw3state({
      web3: web3,
      accounts: accounts[0],
      funds: instancefunds,
      events: instanceevents,
      balance: balanceString,
    });
    return accounts[0];
  }

  return (
    <userAuthContext.Provider
      value={{
        user,
        logIn,
        setUserStatus,
        loadWeb3,
        loadBlockchain,
        w3state,
        signUp,
        logOut,
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
