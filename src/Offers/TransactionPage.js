import React, { useState } from "react";
import moneySvg from "../imges/money.svg";
import "./custombuy.css";
import Popup from "./PopUp";
import { getFunctions, httpsCallable } from "firebase/functions";
import { useNavigate } from "react-router-dom";
import app from "../firebase";
import ShowDetails from "./ShowDetails";
import { ref, getDatabase } from "firebase/database";
import { useList } from "react-firebase-hooks/database";

const database = getDatabase();
export default function TransactionPage(props) {
  const functions = getFunctions(app, "asia-southeast2");
  const [walletload, setwalletload] = useState(false);
  const buyConnects = httpsCallable(functions, "buyConnects");
  const buyConnectsWallet = httpsCallable(functions, "buyConnectsWallet");
  const [curr2, loading, snperror] = useList(ref(database, "currency2"));
  const style = {
    cboxinp: {
      width: "30%",
      padding: "0px 0.7rem",
      height: "3rem",
      fontSize: "1rem",
      boxSizing: "border-box",
      margin: "0.4rem",
      border: "0.1rem solid rgba(90, 90, 90, 0.4)",
      borderRadius: "10px",
      float: "left",
    },
  };
  const navigate = useNavigate();
  const [connects, setconnects] = useState(0);

  const togglePopup = async () => {
    await buyConnects({
      currency1: document.getElementById("scurrency").value,
      currency2: document.getElementById("bcurrency").value,
      amount: document.getElementById("amountfield").value,
    }).then((result) => {
      console.log(result);
      window.open(result?.data?.checkout_url);
      //window.location.replace(result?.data?.checkout_url);
      // settpop(result?.data?.checkout_url + "&output=embed");
    });
  };

  const buyUsingWallet = async () => {
    console.log("hello");
    setwalletload(true);
    await buyConnectsWallet({
      connects: props.connects,
      // offer: props.offer,
      // amount: props.amount,
    })
      .then((result) => {
        console.log(result);
        if (result.data.status === 1) {
          navigate("/PaymentSuccess");
        } else {
          alert(result.data.desc);
        }
        setwalletload(false);
      })
      .catch((error) => {
        setwalletload(false);
        console.log(error);
      });
  };

  return (
    <>
      <input
        type="submit"
        onClick={() => {
          props.back();
        }}
        className="cboxback"
        value="⬅️Back"
      />
      <div className="cbox">
        <ShowDetails
          item={"Connects"}
          quantity={props.connects ?? "0"}
          amount={props.amount ?? "0"}
          offer={props.offer ?? "None"}
          walletload={walletload}
          func={buyUsingWallet}
        />
        <div className="cboxrow">
          <div className="cflexspan">
            <h5>Amount(currency 1)</h5>
          </div>
          <input
            type="text"
            id="amountfield"
            value={props.amount}
            disabled={true}
            style={style.cboxinp}
          />
        </div>
        <div className="cboxrow">
          <div className="cflexspan">
            <h5>Amount Accepted In (currency 1)</h5>
          </div>
          <input
            type="text"
            id="scurrency"
            value="LTCT"
            disabled={true}
            style={style.cboxinp}
          />
        </div>
        <div className="cboxrow">
          <div className="cflexspan">
            <h5>currency buyer wants to pay</h5>
          </div>
          <select id="bcurrency" name="bcurrency" style={style.cboxinp}>
            {curr2?.map((ele, index) => (
              <option value={ele.val()} key={index}>
                {ele.val()}
              </option>
            ))}
          </select>
        </div>
        <div className="cboxrow">
          <input
            type="submit"
            onClick={async () => {
              togglePopup();
            }}
            // onClick={togglePopup}
            className="cboxbutton"
            value="Buy"
          />
        </div>
      </div>
    </>
  );
}
// currency: "LTCT",
// currency1: "LTCT",
// currency2: "LTCT",
// amount: "1",
// buyer_name	Optionally set the buyer's name for your reference.	No
// item_name	Item name for your reference, will be on the payment information page and in the IPNs for the transaction.	No
// item_number	Item number for your reference, will be on the payment information page and in the IPNs for the transaction.	No
// invoice	Another field for your use, will be on the payment information page and in the IPNs for the transaction.	No
// custom	Another field for your use, will be on the payment information page and in the IPNs for the transaction.	No
// ipn_url	URL for your IPN callbacks. If not set it will use the IPN URL in your Edit Settings page if you have one set.	No
// success_url	Sets a URL to go to if the buyer does complete payment. (Only if you use the returned 'checkout_url', no effect/need if designing your own checkout page.)	No
// cancel_url
