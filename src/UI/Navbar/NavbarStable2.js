import React, { useState, useEffect } from "react";
import app, { auth } from "../../firebase";
import { SpinnerDotted } from "spinners-react";
import {
  collection,
  addDoc,
  doc,
  getDoc,
  getFirestore,
} from "firebase/firestore";
import { getFunctions, httpsCallable } from "firebase/functions";
import { useUserAuth } from "../../context/UserAuthContext";
import NotificationEle from "./NotificationEle";
import { NavLink } from "react-router-dom";

export default function NavbarStable2(props) {
  const { user, logOut } = useUserAuth();
  const [loadingState, setLoadingState] = useState(true);
  const [nname, setnname] = useState(props?.name);
  const [npic, setnpic] = useState(props?.pic);
  const [nrole, setnrole] = useState(props?.role);
  const [LogOutDrop, setLogOutDrop] = useState(false);

  const fdb = getFirestore(app);

  const style = {
    tabs: {
      cursor: "pointer",
      padding: "0.5rem 0.5rem",
    },
  };

  return (
    <div
      style={{
        display: "flex",
        backgroundColor: "#f8f9fa",
        height: "5rem",
        width: "100%",
        padding: "1rem 4rem",
        borderBottom: "0.1rem solid rgba(10, 10, 10, 0.2)",
      }}
    >
      <div>
        <img
          alt=""
          src={require("../../imges/logo.svg").default}
          style={{ width: "7.5rem", marginTop: "0.5rem" }}
          className="d-inline-block align-center"
        />{" "}
      </div>
      <div style={{ width: "80%" }}></div>

      <div>
        <div style={{ display: "flex" }}>
          <img
            src={
              props?.pic
                ? props?.pic
                : npic
                ? npic
                : "https://cdn-icons-png.flaticon.com/512/147/147142.png"
            }
            style={{
              width: "3.2rem",
              height: "3.2rem",
              borderRadius: "50%",
            }}
          />
          <div
            onClick={() => {
              setLogOutDrop(!LogOutDrop);
            }}
            style={{
              cursor: "pointer",
              marginLeft: "10px",
              justifyContent: "center",
              paddingTop: "0.5rem",
            }}
          >
            <h5 style={{ fontSize: "1rem" }}>
              {props?.name ? (
                props?.name.split(" ")[0]
              ) : nname ? (
                nname.split(" ")[0]
              ) : (
                <SpinnerDotted size={"1rem"} />
              )}
            </h5>
            <h6 style={{ fontSize: "0.8rem", marginTop: "-0.2rem" }}>
              {props?.role ? props?.role : nrole || " "}
            </h6>
          </div>
          {/* <p style={{ marginBottom: "1px", marginLeft: "10px" }}>
              {props.name ? props.name.slice(0, props.name.search(" ")) : ""}
              <br />
              {props.role ? props.role : ""}
            </p> */}
        </div>
        {LogOutDrop && (
          <div
            style={{
              position: "absolute",
              top: "4.5rem",
              right: "6rem",
              background: "#FFFFFF",
              boxShadow: " 0rem 0.25rem 0.25rem rgba(0, 0, 0, 0.25)",
              fontSize: "1rem",
              margin: "1.5rem",
              borderRadius: "0.8rem",
              width: "10vw",
              zIndex: "2",
              maxHeight: "20rem",
              padding: "1rem",
              fontWeight: "normal",
              width: "10vw",
              margin: "auto",
            }}
          >
            <div
              onClick={logOut}
              style={{
                cursor: "pointer",
                width: "100%",
                height: "1.8rem",
                alignItems: "center",
                textAlign: "center",
                background: "#FFFFFF",
              }}
            >
              Log Out
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
