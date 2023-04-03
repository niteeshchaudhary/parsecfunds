import React, { useState } from "react";
import { getFunctions, httpsCallable } from "firebase/functions";
import app from "../firebase";
import OfferCard from "./OfferCard";
import CustomBuy from "./CustomBuy";
import connecticonSvg from "../imges/connectico.svg";

export default function ShowOffers(props) {
  const [email, setEmail] = useState("");
  const functions = getFunctions(app, "asia-southeast2");
  const getUserProfile = httpsCallable(functions, "getUserProfile");
  const createTansaction = httpsCallable(functions, "createTansaction");

  return (
    <div className="main-screen">
      <div className="leftconnect">
        <div className="leftdiv1">
          <h2 style={{ textAlign: "left", width: "50%" }}>Offers</h2>
          <img
            src={connecticonSvg}
            style={{ height: "15rem", width: "30rem" }}
          />
          <h4 style={{ color: "#006872", textAlign: "center", width: "50%" }}>
            Available : {props.connects} Connects
          </h4>
        </div>
        <div className="leftdiv2">
          <h6 style={{ color: "#006872" }}>
            <span>
              <img src={connecticonSvg} height="20rem" width="20rem" />
            </span>
            &nbsp;&nbsp; $ 1 : 2 Connect
          </h6>
        </div>
      </div>
      <div
        className="Scroll"
        style={{
          overflow: "auto",
          minWidth: "200px",
          width: "60%",
          padding: "3%",
          height: "100%",
        }}
      >
        <div
          className="Scroll"
          style={{
            overflow: "auto",
            display: "flex",
            justifyContent: "center",
            gap: "1rem",
            height: "18rem",
            flexDirection: "column",
          }}
        >
          <OfferCard
            key={"12344"}
            price="20"
            connects="100"
            function={props.function}
          />
          <OfferCard
            key={"1253"}
            price="40"
            connects="200"
            function={props.function}
          />
        </div>
        <CustomBuy key={"123"} function={props.function} />
      </div>
    </div>
  );
}
