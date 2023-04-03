import React, { useState, useEffect } from "react";
import { getFunctions, httpsCallable } from "firebase/functions";
import { useNavigate, NavLink } from "react-router-dom";
import app from "../firebase";
import "./ManageProjects.css";
import Sidebar from "../UI/Dashboard/Sidebar";

import Esidebar from "../UI/Employee/EDashboard/Esidebar";
import Ongoing from "./Ongoing";
import Completed from "./Completed";
import Cancelled from "./Cancelled";

function ManageProjects() {
  const [name, setname] = useState("");
  const [pic, setpic] = useState("");
  const [role, setrole] = useState("");
  const [Title, setTitle] = useState("");
  const [ongoing, setOngoing] = useState(true);
  const [completed, setCompleted] = useState(false);
  const [cancelled, setCancelled] = useState(false);
  const [ongprop, setongprop] = useState("");

  const functions = getFunctions(app, "asia-southeast2");
  const getUserProfile = httpsCallable(functions, "getUserProfile");
  useEffect(() => {
    getUserProfile().then((result) => {
      // console.log(result.data);
      if (result.data.result.status == 1) {
        setname(result.data.result.desc.name);
        setpic(result.data.result.desc.pic);
        setrole(result.data.result.desc.role);
        setTitle(result.data.result.desc.Title);
      }
    });
  }, []);
  return (
    <>
      <div className="d-flex " style={{ backgroundColor: "#F5EEEE" }}>
        <div
          className="left-sidebar"
          style={{
            background: "white",
            borderRadius: "20px",
            marginTop: "1rem",
            width: "20vw",
          }}
        >
          <Sidebar pic={pic} name={name} role={role} Title={Title} />
        </div>

        <div style={{ backgroundColor: "#F5EEEE" }}>
          <div
            style={{
              background: "#FFFFFF",
              borderRadius: "0.8rem",
              width: "78vw",
              margin: "1rem",
            }}
            className="body"
          >
            <div
              style={{ padding: "2rem", width: "50vw" }}
              className="d-flex flex-row justify-content-around "
            >
              <div className="flex-items">
                <p
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setOngoing(true);
                    setCompleted(false);
                    setCancelled(false);
                  }}
                >
                  Ongoing Project
                </p>
              </div>
              <div className="flex-items">
                <p
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setOngoing(false);
                    setCompleted(true);
                    setCancelled(false);
                  }}
                >
                  Completed Project
                </p>
              </div>
              <div className="flex-items">
                <p
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setOngoing(false);
                    setCompleted(false);
                    setCancelled(true);
                  }}
                >
                  Cancelled Project
                </p>
              </div>
            </div>
            {ongoing && <Ongoing />}

            {completed && <Completed />}

            {cancelled && <Cancelled />}
          </div>
        </div>
      </div>
    </>
  );
}

export default ManageProjects;
