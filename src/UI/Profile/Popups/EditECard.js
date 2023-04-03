import React, { useState } from "react";
import app from "../../../firebase";
import { ref, getDatabase } from "firebase/database";
import { useList } from "react-firebase-hooks/database";
import { getFunctions, httpsCallable } from "firebase/functions";

const functions = getFunctions(app, "asia-southeast2");
const addEducation = httpsCallable(functions, "addEducation");
const updateEducation = httpsCallable(functions, "updateEducation");
const deleteEducation = httpsCallable(functions, "deleteEducation");

const database = getDatabase();
export default function EditECard({ edu }) {
  const time = new Date();
  const [editMode, setEditMode] = useState(edu?.new == "edit" ? true : false);
  const [Institute, setIntitute] = useState(
    edu?.institute ? edu?.institute : ""
  );
  const [Degree, setDegree] = useState(edu?.degree ? edu?.degree : "");
  const [Time, setTime] = useState(edu?.time ? edu?.time : "");
  const [id, setId] = useState(edu?.id ? edu?.id : "");
  const [Degre, loading, snperror] = useList(ref(database, "degree"));

  const months = [
    "January",
    "Febuary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  function deleteThis(e) {
    //e.currentTarget.style.display = "none";
    e.currentTarget.parentElement.parentElement.style.display = "none";
    deleteEducation({
      id: edu.id ? edu.id : id,
    });
  }

  function undoChange(e) {
    console.log("id=*", id, "*id2=", edu?.id);
    if (id != "" || edu?.id) {
      console.log("hey");
      setEditMode(false);
    } else {
      console.log("heyyyy!");
      e.currentTarget.parentElement.parentElement.style.display = "none";
      setEditMode(false);
    }
  }
  function clickhandler(e) {
    if (
      document.getElementById("institute").value &&
      document.getElementById("degree").value
    ) {
      const startdate =
        document.getElementById("estartmbox").value +
        " " +
        document.getElementById("estartybox").value;
      const enddate =
        document.getElementById("eendmbox").value +
        " " +
        document.getElementById("eendybox").value;
      const thiselement = {
        institute: document.getElementById("institute").value,
        degree: document.getElementById("degree").value,
        startdate: startdate,
        enddate: enddate,
        time: startdate + " - " + enddate,
      };
      setIntitute(document.getElementById("institute").value);
      setDegree(document.getElementById("degree").value);
      setTime(thiselement.time);
      if (edu?.id) {
        thiselement["id"] = edu.id;
        updateEducation(thiselement)
          .then((result) => {
            if (result.data.status == 1) {
              setEditMode(false);
            } else {
              alert(result.data.desc);
            }
          })
          .catch((error) => {
            alert(error);
          });
      } else if (id !== "") {
        thiselement["id"] = id;
        updateEducation(thiselement)
          .then((result) => {
            if (result.data.status == 1) {
              setEditMode(false);
            } else {
              alert(result.data.desc);
            }
          })
          .catch((error) => {
            alert(error);
          });
      } else {
        addEducation(thiselement)
          .then((result) => {
            if (result.data.status == 1) {
              setId(result.data.desc);
              setEditMode(false);
            } else {
              alert(result.data.desc);
            }
          })
          .catch((error) => {
            alert(error);
          });
      }
    }
  }
  return (
    <>
      <label style={{ display: "none" }}>{id != "" ? id : edu?.id}</label>
      {!editMode ? (
        <span
          style={{
            marginRight: "0.5rem",
            width: "100%",
            borderRadius: "20px",
            padding: "0.1rem 0.5rem",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "right",
            }}
          >
            <img
              onClick={() => setEditMode(true)}
              style={{ cursor: "pointer", width: "1rem" }}
              src={require("../../../imges/editpen.svg").default}
              alt="edit"
            />
            <img
              onClick={(e) => deleteThis(e)}
              style={{
                width: "1rem",
                marginLeft: "0.5rem",
                cursor: "pointer",
              }}
              alt="delete"
              src={require("../../../imges/delete.svg").default}
            />
          </div>
          <h5>{Institute}</h5>
          {Degree}
          <br />
          {Time}
          <hr />
        </span>
      ) : (
        <span
          style={{
            marginRight: "0.5rem",
            width: "100%",
            borderRadius: "20px",
            padding: "0.1rem 0.5rem",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "right",
            }}
          >
            <div
              onClick={clickhandler}
              style={{
                padding: "0",
                cursor: "pointer",
                color: "#f00",
                fontSize: "1.5rem",
                fontWeight: "800",
              }}
            >
              ✅
            </div>
            <div
              onClick={(e) => undoChange(e)}
              style={{
                padding: "0",
                cursor: "pointer",
                color: "#f00",
                fontSize: "1.5rem",
                fontWeight: "800",
              }}
            >
              X
            </div>
          </div>
          <input
            type="type"
            id="institute"
            defaultValue={
              Institute != "" ? Institute : edu?.institute ? edu?.institute : ""
            }
            placeholder="University/ College/ School *"
            style={{
              width: "40%",
              padding: "0px 0.5rem",
              height: "2.5rem",
              fontSize: "1rem",
              boxSizing: "border-box",
              border: "0.1rem solid rgba(90, 90, 90, 0.4)",
              borderRadius: "0.8rem",
              float: "left",
            }}
          />
          <br />
          <br />
          <select
            id="degree"
            name="degree"
            defaultValue={
              Degree != "" ? Degree : edu?.degree ? edu?.degree : ""
            }
            style={{
              width: "40%%",
              padding: "0.2rem 0.8rem",
              height: "2.8rem",
              fontSize: "1rem",
              boxSizing: "border-box",
              float: "left",
              border: "0.1rem solid rgba(90, 90, 90, 0.4)",
              borderRadius: "0.6rem",
            }}
            required
          >
            {Degre.map((result, index) => (
              <option
                style={{ borderRadius: "1rem" }}
                text={result.val()}
                value={result.val()}
                key={index}
              >
                {result.val()}
              </option>
            ))}
          </select>
          <br />
          <br />
          <div style={{ display: "flex", width: "95%", margin: "12px 0 0 0" }}>
            <div style={{ width: "48%", float: "left" }}>
              <h5 style={{ fontWeight: "600", fontSize: "1rem" }}>
                Start Date *
              </h5>
              <select
                id="estartmbox"
                name="startmbox"
                defaultValue={
                  edu?.startdate ? edu?.startdate.split(" ")[0] : "January"
                }
                style={{
                  width: "47%",
                  padding: "0px 0.5rem",
                  height: "2.5rem",
                  fontSize: "1rem",
                  boxSizing: "border-box",
                  border: "0.1rem solid rgba(90, 90, 90, 0.4)",
                  borderRadius: "0.8rem",
                  float: "left",
                }}
              >
                <option value="January">January</option>
                <option value="Febuary">Febuary</option>
                <option value="March">March</option>
                <option value="April">April</option>
                <option value="May">May</option>
                <option value="June">June</option>
                <option value="July">July</option>
                <option value="August">August</option>
                <option value="September">September</option>
                <option value="October">October</option>
                <option value="November">November</option>
                <option value="December">December</option>
              </select>
              <select
                defaultValue={
                  edu?.startdate
                    ? edu?.startdate.split(" ")[1]
                    : time.getFullYear()
                }
                id="estartybox"
                name="startybox"
                style={{
                  width: "47%",
                  padding: "0px 0.5rem",
                  height: "2.5rem",
                  float: "right",
                  fontSize: "1rem",
                  boxSizing: "border-box",
                  border: "0.1rem solid rgba(90, 90, 90, 0.4)",
                  borderRadius: "0.8rem",
                }}
              >
                {[...Array(80)].map((x, index) => {
                  return (
                    <option value={time.getFullYear() + index - 79} key={index}>
                      {time.getFullYear() + index - 79}
                    </option>
                  );
                })}
              </select>
            </div>
            <div style={{ width: "4%" }}></div>
            <div id="enddatediv" style={{ width: "48%", float: "right" }}>
              <h5 style={{ fontWeight: "600", fontSize: "1rem" }}>
                End Date *
              </h5>
              <select
                id="eendmbox"
                name="endmbox"
                defaultValue={
                  edu?.enddate
                    ? edu?.enddate.split(" ")[0]
                    : months[time.getMonth()]
                }
                style={{
                  width: "47%",
                  padding: "0px 0.5rem",
                  height: "2.5rem",
                  fontSize: "1rem",
                  boxSizing: "border-box",
                  border: "2px solid rgba(90, 90, 90, 0.4)",
                  borderRadius: "0.8rem",
                  float: "left",
                }}
              >
                <option value="January">January</option>
                <option value="Febuary">Febuary</option>
                <option value="March">March</option>
                <option value="April">April</option>
                <option value="May">May</option>
                <option value="June">June</option>
                <option value="July">July</option>
                <option value="August">August</option>
                <option value="September">September</option>
                <option value="October">October</option>
                <option value="November">November</option>
                <option value="December">December</option>
              </select>
              <select
                defaultValue={edu?.enddate?.split(" ")[1] ?? time.getFullYear()}
                id="eendybox"
                name="endybox"
                style={{
                  width: "47%",
                  padding: "0px 0.5rem",
                  height: "2.5rem",
                  float: "right",
                  fontSize: "1rem",
                  boxSizing: "border-box",
                  border: "2px solid rgba(90, 90, 90, 0.4)",
                  borderRadius: "0.8rem",
                }}
              >
                {[...Array(80)].map((x, index) => {
                  return (
                    <option value={time.getFullYear() + index - 70} key={index}>
                      {time.getFullYear() + index - 70}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <hr />
        </span>
      )}
    </>
  );
}
