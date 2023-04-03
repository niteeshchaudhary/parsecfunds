import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./esidebar.css";

function Esidebar(props) {
  const [toggle1, settoggle1] = useState(false);
  const [toggle2, settoggle2] = useState(false);
  const [toggle3, settoggle3] = useState(false);
  const [toggle4, settoggle4] = useState(false);
  const [toggle5, settoggle5] = useState(false);

  function toggle1handler() {
    settoggle1(!toggle1);
  }
  function toggle2handler() {
    settoggle2(!toggle2);
  }
  function toggle3handler() {
    settoggle3(!toggle3);
  }
  function toggle4handler() {
    settoggle4(!toggle4);
  }
  function toggle5handler() {
    settoggle5(!toggle5);
  }

  return (
    <div
      style={{
        textAlign: "center",
        paddingTop: "4.375rem",
        cursor: "pointer",
        borderRadius: "1.5rem",
      }}
    >
      <img
        src={
          props.pic
            ? props.pic
            : "https://cdn-icons-png.flaticon.com/512/147/147142.png"
        }
        style={{ width: "9.3rem", height: "9.3rem", borderRadius: "5rem" }}
      />
      <div
        className="mt-2 "
        style={{ color: "black", textTransform: "uppercase" }}
      >
        {props.name ? props.name : ""}
      </div>
      {/* <label className="mb-5" style={{ color: "grey" }}>
        {props.Title ? props.Title : ""}
      </label> */}

      <div className="postbut1 mt-4">
        <Link to="/Postjob" style={{ color: "white" }}>
          Post a job
        </Link>
      </div>

      <div className="editbut1 mb-5">
        <Link to="/managejob" style={{ color: "black", background: "white" }}>
          Edit your job post
        </Link>
      </div>

      <div className="flex-row mb-3">
        <img
          src={require("../../../imges/avatar.svg").default}
          style={{
            width: "1.5rem",
            height: "1.5rem",
            marginRight: "0.8rem",
            marginLeft: "-1rem",
          }}
        />
        <div>View my profile</div>
      </div>
      {props.role == "Freelancer" && (
        <>
          <div className="flex-row mb-3">
            <img
              src={require("../../../imges/idverify.svg").default}
              style={{
                width: "2rem",
                height: "2rem",
                marginRight: "0.8rem",
                marginLeft: "0.2rem",
              }}
            />
            <div>Identity verfication</div>
          </div>
          <div className="flex-row mb-3">
            <img
              src={require("../../../imges/filemanager.svg").default}
              style={{
                width: "1.5rem",
                height: "1.5rem",
                marginRight: "0.8rem",
                marginLeft: "0rem",
              }}
            />
            <div onClick={toggle3handler}>Manage portfolios</div>
          </div>
          {toggle3 && (
            <ul className="cust-ulside">
              <li>- Add portfolio</li>
              <li>- Portfolio listings</li>
            </ul>
          )}

          <div className="flex-row mb-3">
            <img
              src={require("../../../imges/projectmng.svg").default}
              style={{
                width: "1.5rem",
                height: "1.5rem",
                marginRight: "0.8rem",
                marginLeft: "-1rem",
              }}
            />
            <div>
              <Link
                to="/manage"
                onClick={toggle4handler}
                style={{ color: "black" }}
              >
                Manage projects
              </Link>
            </div>
          </div>
          {toggle4 && (
            <ul className="cust-ulside">
              <li>- Proposals </li>
              <li>- Ongoing projects</li>
              <li>- Completed projects</li>
              <li>- Cancelled projects</li>
            </ul>
          )}
        </>
      )}

      {props.role == "Employer" && (
        <>
          <div className="flex-row mb-3" style={{ marginLeft: "-1.05rem" }}>
            <img
              src={require("../../../imges/projectmng.svg").default}
              style={{
                width: "1.5rem",
                height: "1.5rem",
                marginRight: "0.8rem",
                marginLeft: "-1rem",
              }}
            />

            <div onClick={toggle1handler}>Manage Jobs</div>
          </div>
          {toggle1 && (
            <ul className="cust-ulside">
              <li>- Post a job</li>
              <li>- Posted jobs</li>
              <li>- Ongoing jobs</li>
              <li>- Completed jobs</li>
              <li>- Cancelled jobs</li>
              {/* style={{borderLeft: "1px solid black"}} */}
            </ul>
          )}
          <div className="flex-row mb-3">
            <img
              src={require("../../../imges/services.svg").default}
              style={{
                width: "1.5rem",
                height: "1.5rem",
                marginRight: "0.8rem",
                marginLeft: "-0.8rem",
              }}
            />
            <div onClick={toggle2handler}>Manage services</div>
          </div>
          {toggle2 && (
            <ul className="cust-ulside1">
              <li>- Ongoing services</li>
              <li>- Completed services</li>
              <li>- Cancelled services</li>
            </ul>
          )}
        </>
      )}

      {props.role == "Freelancer" && (
        <>
          <div className="flex-row mb-3" style={{ marginLeft: "0.3125rem" }}>
            <img
              src={require("../../../imges/services.svg").default}
              style={{
                width: "1.5rem",
                height: "1.5rem",
                marginRight: "0.8rem",
                marginLeft: "-1.5rem",
              }}
            />
            <div onClick={toggle5handler}>Manage services</div>
          </div>
          {toggle5 && (
            <ul className="cust-ulside1">
              <li>- Post a service</li>
              <li>- Posted service</li>
              <li>- Add on service</li>
              <li>- Ongoing service</li>
              <li>- Completed service</li>
              <li>- Cancelled service</li>
            </ul>
          )}
        </>
      )}

      <div className="flex-row mb-3">
        <img
          src={require("../../../imges/saveditem.svg").default}
          style={{
            width: "1.5rem",
            height: "1.5rem",
            marginRight: "0.8rem",
            marginLeft: "-2.7rem",
          }}
        />
        <div>Saved items</div>
      </div>
      <div className="flex-row mb-3">
        <img
          src={require("../../../imges/dispute.svg").default}
          style={{
            width: "1.5rem",
            height: "1.5rem",
            marginRight: "0.8rem",
            marginLeft: "-4.5rem",
          }}
        />
        <div>Disputes</div>
      </div>
      <div className="flex-row mb-3">
        <img
          src={require("../../../imges/support.svg").default}
          style={{
            width: "1.5rem",
            height: "1.5rem",
            marginRight: "0.8rem",
            marginLeft: "-0.5rem",
          }}
        />
        <div>Help and Support</div>
      </div>
    </div>
  );
}

export default Esidebar;
