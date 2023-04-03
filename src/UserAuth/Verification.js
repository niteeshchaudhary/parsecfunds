import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import verification from "../imges/verification.svg";
import verification2 from "../imges/noverify.svg";

export default function Verification() {
  const congo = "Congratulations!";
  const msg = `Your account has been created successfully.
  Please verify your account by clicking on the link send to you by mail.if you do not find it in inbox please check spam section.`;
  const { state } = useLocation();
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        height: "100vh",
        backgroundImage: `url(${state ? verification : verification2})`,
        backgroundSize: "110% 110%",
      }}
    >
      {/* <img src={verification} style={{ height: "100%", width: "100%" }}></img> */}
      <div
        style={{
          border: "2px solid black",
          width: "36rem",
          // height: "10rem",
          alignSelf: "center",
          justifyContent: "center",
          padding: "2rem",
          background: "#fff",
          boxShadow: "5px 5px green, 10px 10px red, 15px 15px yellow",
          fontSize: "1rem",
        }}
      >
        {/* #006872 #FFC727 */}
        <b>{state ? congo : "Error:"}</b>
        {state ? msg : " Not a Valid entry"}
        <div onClick={() => navigate("/")} style={{fontWeight:"500", margin:"1rem auto",cursor: "pointer",background: "#006872",color:"white",borderRadius:"0.4rem",width:"fit-content",padding:"0.5rem" }}>
        Return Back
      </div>
      </div>
     
    </div>
  );
}
