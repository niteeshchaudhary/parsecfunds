import React, { useState } from "react";
import app from "../../../firebase";
import { ref, getDatabase } from "firebase/database";
import { useList } from "react-firebase-hooks/database";
import { getFunctions, httpsCallable } from "firebase/functions";

const functions = getFunctions(app, "asia-southeast2");
const addWorkExperience = httpsCallable(functions, "addWorkExperience");
const updateWorkExperience = httpsCallable(functions, "updateWorkExperience");
const deleteWorkExperience = httpsCallable(functions, "deleteWorkExperience");

const database = getDatabase();
export default function EditCard({ wexp }) {
  const time = new Date();
  const [editMode, setEditMode] = useState(wexp?.new == "edit" ? true : false);
  const [Title, setTitle] = useState(wexp?.title ? wexp?.title : "");
  const [Company, setCompany] = useState(wexp?.company ? wexp?.company : "");
  const [Location, setLocation] = useState(
    wexp?.location ? wexp?.location : ""
  );
  const [Country, loading, snperror] = useList(ref(database, "country"));
  const [id, setId] = useState(wexp?.id ? wexp?.id : "");
  const [Time, setTime] = useState(wexp?.time ? wexp?.time : "");
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
    deleteWorkExperience({
      id: wexp.id ? wexp.id : id,
    });
  }

  function undoChange(e) {
    if (id == "" && !wexp?.id) {
      e.currentTarget.parentElement.parentElement.style.display = "none";
      setEditMode(false);
    } else {
      setEditMode(false);
    }
  }
  console.log("iii ", id, Title);
  function clickhandler(e) {
    if (
      document.getElementById("titlebox").value &&
      document.getElementById("company").value
    ) {
      const enddt = document.getElementById("chkbox").checked
        ? ""
        : document.getElementById("endmbox").value +
          " " +
          document.getElementById("endybox").value;
      const startdt =
        document.getElementById("startmbox").value +
        " " +
        document.getElementById("startybox").value;
      const thiselement = {
        title: document.getElementById("titlebox").value,
        company: document.getElementById("company").value,
        location: document.getElementById("location").value,
        startdate: startdt,
        enddate: enddt,
        time: startdt + " - " + enddt,
      };
      setTitle(document.getElementById("titlebox").value);
      setCompany(document.getElementById("company").value);
      setLocation(document.getElementById("location").value);
      setTime(thiselement.time);
      if (wexp?.id) {
        thiselement["id"] = wexp.id;
        updateWorkExperience(thiselement)
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
        console.log("^8", id, id !== "");
        thiselement["id"] = id;
        updateWorkExperience(thiselement)
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
        addWorkExperience(thiselement)
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
      <label style={{ display: "none" }}>{id != "" ? id : wexp?.id}</label>
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
              src={require("../../../imges/delete.svg").default}
              alt="delete"
            />
          </div>
          <h5>{Title}</h5>
          <h6>{Company}</h6>
          {Location}
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
              gap: "1rem",
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
            id="titlebox"
            defaultValue={Title !== "" ? Title : wexp?.title ? wexp?.title : ""}
            placeholder="Title"
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
          <input
            type="type"
            id="company"
            defaultValue={
              Company !== "" ? Company : wexp?.company ? wexp?.company : ""
            }
            placeholder="Company"
            style={{
              width: "40%",
              padding: "0px 0.5rem",
              height: "2.5rem",
              fontSize: "1rem",
              boxSizing: "border-box",
              border: "0.1rem solid rgba(90, 90, 90, 0.4)",
              borderRadius: "0.8rem",
              float: "left",
              marginRight: "1rem",
            }}
          />
          <input
            type="type"
            id="location"
            defaultValue={
              Location !== "" ? Location : wexp?.location ? wexp?.location : ""
            }
            placeholder="Location"
            style={{
              width: "40%",
              padding: "0px 0.5rem",
              height: "2.5rem",
              fontSize: "1rem",
              boxSizing: "border-box",
              border: "0.1rem solid rgba(90, 90, 90, 0.4)",
              borderRadius: "0.8rem",
            }}
          />
          <select
            type="text"
            list="countries"
            id="location"
            defaultValue={
              Location !== "" ? Location : wexp?.location ? wexp?.location : ""
            }
            name="location"
            placeholder="Ex. India"
            style={{
              width: "40%",
              padding: "0.2rem 0.5rem",
              height: "2.8rem",
              fontSize: "1rem",
              boxSizing: "border-box",
              border: "0.1rem solid rgba(90, 90, 90, 0.4)",
              borderRadius: "0.6rem",
            }}
          >
            <option value="select_country" selected disabled="true">
              Select country
            </option>
            {Country.map((result, index) => (
              <option text={result.val()} value={result.val()} key={index}>
                {result.val()}
              </option>
            ))}
          </select>
          <br />
          <br />
          <div>
            <input
              type="checkbox"
              id="chkbox"
              name="chkbox"
              className="form-check-input"
              defaultChecked={
                Time != ""
                  ? Time.split("-")[1].length > 3
                    ? false
                    : true
                  : wexp?.enddate === ""
                  ? true
                  : false
              }
              onChange={(e) => {
                e.currentTarget.checked
                  ? (document.getElementById("enddatediv").style.display =
                      "none")
                  : (document.getElementById("enddatediv").style.display =
                      "block");
              }}
              style={{
                fontStyle: "normal",
                fontWeight: "400",
                fontSize: "1rem",
                lineHeight: "1.5rem",
              }}
            />
            <label
              className="form-check-label"
              htmlFor="chkbox"
              style={{
                fontStyle: "normal",
                fontWeight: "400",
                fontSize: "1rem",
                lineHeight: "1.2rem",
              }}
            >
              &nbsp;&nbsp;I’m currently working here
            </label>
          </div>
          <div style={{ display: "flex", width: "95%", margin: "12px 0 0 0" }}>
            <div style={{ width: "48%", float: "left" }}>
              <h5 style={{ fontWeight: "600", fontSize: "1rem" }}>
                Start Date *
              </h5>
              <select
                id="startmbox"
                name="startmbox"
                defaultValue={
                  Time != ""
                    ? Time.split(" ")[0]
                    : wexp?.startdate
                    ? wexp?.startdate.split(" ")[0]
                    : "January"
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
                  Time != ""
                    ? Time.split(" ")[1]
                    : wexp?.startdate
                    ? wexp?.startdate.split(" ")[1]
                    : time.getFullYear()
                }
                id="startybox"
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
                id="endmbox"
                name="endmbox"
                defaultValue={
                  Time != ""
                    ? Time.split(" ")[3]
                      ? Time.split(" ")[3]
                      : months[time.getMonth()]
                    : wexp?.enddate
                    ? wexp?.enddate.split(" ")[0]
                    : months[time.getMonth()]
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
                  Time != ""
                    ? Time.split(" ")[4]
                      ? Time.split(" ")[4]
                      : time.getFullYear()
                    : wexp?.enddate?.split(" ")[1]
                    ? wexp?.enddate?.split(" ")[1]
                    : time.getFullYear()
                }
                id="endybox"
                name="endybox"
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
