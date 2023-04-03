import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import verification from "../imges/verification.svg";
import verification2 from "../imges/noverify.svg";

export default function Success() {
  const { user } = useUserAuth();
  const congo = "Congratulations!";
  const msg = `Your bought connects successfully.
  please return! to use them.`;
  const state = true;
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
          height: "10rem",
          alignSelf: "center",
          justifyContent: "center",
          padding: "2rem",
          background: "#fff",
          boxShadow: "5px 5px green, 10px 10px red, 15px 15px yellow",
          fontSize: "1rem",
        }}
      >
        <b>{state ? congo : "Error:"}</b>
        {state ? msg : " Not a Valid entry"}
        <div
          onClick={() => {
            if (user?.profile?.role == "Freelancer") {
              navigate("/dashboard");
            } else if (user?.profile?.role == "Employer") {
              navigate("/Edashboard");
            } else {
              navigate("/");
            }
          }}
          style={{ cursor: "pointer" }}
        >
          Return Back
        </div>
      </div>
    </div>
  );
}
