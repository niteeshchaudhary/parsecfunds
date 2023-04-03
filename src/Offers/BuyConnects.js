import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getFunctions, httpsCallable } from "firebase/functions";

import ShowOffers from "./ShowOffers";
import TransactionPage from "./TransactionPage";
import { db } from "../firebase";
import { auth } from "../firebase";
import app from "../firebase";

import "./Connects.css";

var data = {};
export default function BuyConnects() {
  const [transaction, setTransaction] = useState(false);
  const navigate = useNavigate();
  const { state } = useLocation();
  console.log("***", state);
  const functions = getFunctions(app, "asia-southeast2");
  const getUserProfile = httpsCallable(functions, "getUserProfile");
  const createTansaction = httpsCallable(functions, "createTansaction");

  function toOther(info) {
    setTransaction(true);
    data = info;
    console.log(data);
  }

  return (
    <>
      {transaction ? (
        <TransactionPage
          connects={data?.connects}
          amount={data?.amount}
          offer={data?.offer}
          back={() => {
            setTransaction(false);
          }}
        />
      ) : (
        <ShowOffers connects={state?.profile?.connects} function={toOther} />
      )}
    </>
  );
}
