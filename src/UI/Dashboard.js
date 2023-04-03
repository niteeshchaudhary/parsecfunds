import React, { useState, useEffect } from "react";
import { SpinnerDotted } from "spinners-react";
import Body from "./Dashboard/Body";

import Sidebar from "./Dashboard/Sidebar";
import { getFunctions, httpsCallable } from "firebase/functions";
import app from "../firebase";

function Dashboard({ userprofile }) {
  const [loadingState, setLoadingState] = useState(true);
  const [name, setname] = useState(userprofile?.name);
  const [pic, setpic] = useState(userprofile?.pic);
  const [role, setrole] = useState(userprofile?.role);
  const [Title, setTitle] = useState(userprofile?.Title);
  const [Pending, setPending] = useState("");
  const [Available, setAvailable] = useState("");
  const [connects, setConnects] = useState("");

  const [Completed, setCompleted] = useState("");
  const [Ongoing, setOngoing] = useState("");
  const [Cancelled, setCancelled] = useState("");
  const functions = getFunctions(app, "asia-southeast2");
  const getMyProjects = httpsCallable(functions, "getMyProjects");
  const getUserProfile = httpsCallable(functions, "getUserProfile");
  const getWallet = httpsCallable(functions, "getWallet");

  useEffect(() => {
    if (!userprofile) {
      getUserProfile().then((result) => {
        console.log(result.data);
        if (result.data.result.status == 1) {
          setname(result.data.result.desc.name);
          setpic(result.data.result.desc.pic);
          setrole(result.data.result.desc.role);
          setTitle(result.data.result.desc.Title);
        }
      });
    }
    getWallet().then((result) => {
      if (result.data.result.status == 1) {
        setConnects(result.data.result.desc.connects);
        setPending(result.data.result.desc.shadow_wallet);
        setAvailable(result.data.result.desc.wallet);
        setLoadingState(false);
      }
    });
    getMyProjects().then((result) => {
      if (result.data.result.status == 1) {
        setCompleted(result.data.result.desc.countcompleted);
        setOngoing(result.data.result.desc.countongoing);
        setCancelled(result.data.result.desc.countcancelled);
      }
    });
  }, []);

  return (
    <>
      {loadingState && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            alignItems: "center",
          }}
        >
          <SpinnerDotted />
        </div>
      )}
      {!loadingState && (
        <>
          <div style={{ display: "flex", backgroundColor: "#F5EEEE" }}>
            <div
              className="left-sidebar"
              style={{
                flex: "0.2",
                background: "white",
                borderRadius: "1rem",
                marginTop: "1rem",
              }}
            >
              <Sidebar pic={pic} name={name} role={role} Title={Title} />
            </div>
            <div style={{ flex: "0.8", backgroundColor: "#F5EEEE" }}>
              <Body
                name={name}
                pic={pic}
                role={role}
                Title={Title}
                Pending={Pending}
                Available={Available}
                connects={connects}
                Completed={Completed}
                Ongoing={Ongoing}
                Cancelled={Cancelled}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Dashboard;
