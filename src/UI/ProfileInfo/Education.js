import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import resumeimg from "../../imges/classroom.svg";
import { SpinnerDotted } from "spinners-react";
import Card from "./card";
import "./Resume.css";
import Lodash from "lodash";
import app from "../../firebase";
import { getFunctions, httpsCallable } from "firebase/functions";
import { ref, getDatabase } from "firebase/database";
import { useList } from "react-firebase-hooks/database";
const functions = getFunctions(app, "asia-southeast2");
const addEducation = httpsCallable(functions, "addEducation");
const updateEducation = httpsCallable(functions, "updateEducation");

var count = 1;
const database = getDatabase();
export default function Education(props) {
  const time = new Date();
  const navigate = useNavigate();
  const { state } = useLocation();
  console.log(state);
  const profile = state.profile;

  const initialValues = state?.element ? state.element : { institute: "" };
  const [loadingState, setLoadingState] = useState(false);
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [Degree, loading, snperror] = useList(ref(database, "degree"));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoadingState(true);
    setFormErrors(validate(formValues));
  };
  if (isSubmit == true) {
    clickhandler();
  }

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);
  const validate = (values) => {
    const errors = {};
    var word_length = values.institute.trim().split(/[\s]+/).length;
    // const regex = /^[a-zA-Z0-9_]*$/i;
    const regex_alphabet = /^[a-z ]*$/i;
    // const regex_alphabet=/^[a-z]*$/i;
    if (!values.institute) {
      errors.institute = "*Institute name is required!";
    } else if (!regex_alphabet.test(values.institute)) {
      errors.institute = "*This is not a valid Institute name format!";
    } else if (word_length > 5) {
      errors.institute = "*Institute name cannot exceed more than 5 words";
    } else if (values.institute.length < 2) {
      errors.institute = "*Institute name is too short";
    } else if (values.institute.length > 30) {
      errors.institute =
        "*Institute name cannot exceed more than 30 characters";
    }
    if (Object.keys(errors).length === 0) {
      setIsSubmit(true);
    } else {
      setLoadingState(false);
    }

    return errors;
  };

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
  const Level = ["Can Write", "Communicational", "Expert"];

  function clickhandler(e) {
    const list = state ? state.list : [];

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
      if (state?.element) {
        thiselement["id"] = state?.element.id;
        updateEducation(thiselement).then((result) => {
          if (result.data.status == 1) {
            var nlist = list.filter((x) => x.id !== state?.element.id);
            nlist.push(thiselement);
            console.log(nlist);
            profile["screen"] = 3;
            navigate("/ProfileInfo", {
              state: {
                profile: profile,
                list: nlist,
                element: thiselement,
              },
            });
          } else {
            alert(result.data.desc);
          }
          setLoadingState(false);
        });

        return;
      }
      var flag = false;
      list.forEach((listelem) => {
        console.log(
          listelem.time === thiselement.time,
          listelem.degree === thiselement.degree,
          listelem.institute === thiselement.institute
        );
        if (
          listelem.time === thiselement.time &&
          listelem.degree === thiselement.degree &&
          listelem.institute === thiselement.institute
        ) {
          flag = true;
        }
      });

      if (!flag) {
        list.push(thiselement);
        addEducation(thiselement).then((result) => {
          if (result.data.status == 1) {
            profile["screen"] = 3;
            navigate("/ProfileInfo", {
              state: {
                profile: profile,
                list: list,
              },
            });
          } else {
            alert(result.data.desc);
          }
          setLoadingState(false);
        });
      }

      // props.fun1();
    }
  }
  function backhandler(e) {
    e.preventDefault();
    const list = state ? state.list : [];
    profile["screen"] = 3;
    navigate("/ProfileInfo", {
      state: {
        profile: profile,
        list: list,
      },
    });
    props.fun1();
  }
  useEffect(() => {
    document.getElementById("degree").value = state?.element?.degree || "";
  }, [Degree]);

  return (
    <>
      {/* {Object.keys(formErrors).length === 0 && isSubmit ? (
        <div className="ui message success">Signed in successfully</div>
      ) : (
        <pre>{JSON.stringify(formValues, undefined, 2)}</pre>
      )} */}
      <form onSubmit={handleSubmit}>
        <div
          style={{
            display: "flex",
            height: "75vh",
            overflow: "hidden",
            margin: "0 0 0 0",
          }}
        >
          <div
            className="Scroll"
            style={{
              overflow: "auto",
              minWidth: "50%",
              padding: "2% 2% 2% 6%",
              height: "100%",
            }}
          >
            <h1
              style={{
                width: "95%",
                fontFamily: "PT Serif",
                fontStyle: "normal",
                fontWeight: "700",
                fontSize: "2.3rem",
                textAlign: "justify",
                textJustify: "inter-word",
                lineHeight: "2.5rem",
              }}
            >
              Add your education here.
            </h1>
            <p
              style={{
                width: "95%",
                fontFamily: "Roboto",
                fontStyle: "normal",
                fontWeight: "400",
                marginTop: "2.5%",
                marginBottom: "3%",
                textAlign: "justify",
                textJustify: "inter-word",
                fontSize: "1.1rem",
                lineHeight: "1.3rem",
              }}
            >
              You don't need a college degree. Including any relevant education
              enhances the visibility of your profile.
            </p>
            <h5 style={{ fontSize: "1rem", margin: "1.3rem 0 0 0" }}>
              University/ College/ School *
            </h5>
            <input
              type="text"
              id="institute"
              name="institute"
              onChange={handleChange}
              placeholder="Ex. MIT"
              defaultValue={state?.element ? state.element.institute : ""}
              style={{
                width: "95%",
                margin: "0.5rem 0",
                padding: "0.8rem 0.9rem",
                height: "2.8rem",
                fontSize: "1rem",
                boxSizing: "border-box",
                border: "0.1rem solid rgba(90, 90, 90, 0.4)",
                borderRadius: "0.6rem",
              }}
            />
            <p style={{ color: "red", fontSize: "0.8rem" }}>
              {formErrors.institute}
            </p>
            <h5 style={{ fontSize: "1rem", margin: "1rem 0 0.5rem 0" }}>
              Degree *
            </h5>

            <select
              id="degree"
              name="degree"
              defaultValue={
                state?.element ? state.element.degree : "Select Degree"
              }
              style={{
                width: "95%",
                padding: "0.2rem 0.8rem",
                height: "2.8rem",
                fontSize: "1rem",
                boxSizing: "border-box",
                border: "0.1rem solid rgba(90, 90, 90, 0.4)",
                borderRadius: "0.6rem",
              }}
              required
            >
              {/* <option value="select_degree" selected disabled="true">Select Degree</option> */}
              {Degree.map((result, index) => (
                <option
                  style={{ borderRadius: "1rem" }}
                  text={result.val()}
                  value={result.val()}
                  key={index}
                >
                  {result.val()}
                </option>
              ))}

              {/* <option  value="science">Bachelor's</option>
                  <option  value="arts">Master's</option>
                
                  <option  value="commerce">Doctorate</option>
                  <option  value="engg_tech">Post-Doctorate</option> */}
              {/* <option  value="BMS_BBA_BBS">BMS/BBA/BBS</option>
                  <option  value="law">Bachelor of Law</option>
                  <option  value="medicine">Bachelor of Medicine (MBBS)</option>
                  <option  value="yr_5_prog">5 year Integrated Programme</option>
                */}
            </select>
            <div
              style={{ display: "flex", width: "95%", margin: "1.3rem 0 0 0" }}
            >
              <div style={{ width: "48%", float: "left" }}>
                <h5 style={{ fontSize: "1rem" }}>Start Date *</h5>
                <select
                  id="estartmbox"
                  name="estartmbox"
                  defaultValue={
                    state?.element
                      ? state?.element?.startdate.split(" ")[0]
                      : "January"
                  }
                  style={{
                    width: "47%",
                    padding: "0px 0.8rem",
                    height: "2.8rem",
                    fontSize: "1rem",
                    boxSizing: "border-box",
                    border: "0.1rem solid rgba(90, 90, 90, 0.4)",
                    borderRadius: "0.7rem",
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
                  id="estartybox"
                  name="estartybox"
                  defaultValue={
                    state?.element
                      ? state.element?.startdate.split(" ")[1]
                      : time.getFullYear()
                  }
                  style={{
                    width: "47%",
                    padding: "0px 0.8rem",
                    height: "2.8rem",
                    float: "right",
                    fontSize: "1rem",
                    boxSizing: "border-box",
                    border: "0.1rem solid rgba(90, 90, 90, 0.4)",
                    borderRadius: "0.7rem",
                  }}
                >
                  {[...Array(80)].map((x, index) => {
                    return (
                      <option
                        value={time.getFullYear() + index - 79}
                        key={index}
                      >
                        {time.getFullYear() + index - 79}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div style={{ width: "4%" }}></div>
              <div style={{ width: "48%", float: "right" }}>
                <h5 style={{ fontSize: "1rem" }}>End Date *</h5>
                <select
                  id="eendmbox"
                  name="eendmbox"
                  defaultValue={
                    state?.element
                      ? state?.element?.enddate.split(" ")[0]
                      : months[time.getMonth()]
                  }
                  style={{
                    width: "47%",
                    padding: "0px 0.8rem",
                    height: "2.8rem",
                    fontSize: "1rem",
                    boxSizing: "border-box",
                    border: "0.1rem solid rgba(90, 90, 90, 0.4)",
                    borderRadius: "0.7rem",
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
                  id="eendybox"
                  name="eendybox"
                  defaultValue={
                    state?.element?.enddate.split(" ")[1] ?? time.getFullYear()
                  }
                  style={{
                    width: "47%",
                    padding: "0px 0.8rem",
                    height: "2.8rem",
                    float: "right",
                    fontSize: "1rem",
                    boxSizing: "border-box",
                    border: "0.1rem solid rgba(90, 90, 90, 0.4)",
                    borderRadius: "0.7rem",
                  }}
                >
                  {[...Array(80)].map((x, index) => {
                    return (
                      <option
                        value={time.getFullYear() + index - 70}
                        key={index}
                      >
                        {time.getFullYear() + index - 70}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>
          <div className="rightbarr">
            <img src={resumeimg} className="imglog1r" alt="resume"></img>
          </div>
        </div>
        <div>
          <progress
            id="progr"
            value="40"
            max="100"
            style={{
              accentColor: "#FFC727",
              height: "0.26rem",
              width: "100%",
            }}
          >
            40%
          </progress>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              height: "3.1rem",
            }}
          >
            <button
              type="submit"
              onClick={backhandler}
              className="btn btn-primary"
              style={{
                width: "15%",
                height: "3rem",
                background: "#C7C7C7",
                border: "0",
                boxShadow: "0px 0.2rem 0.2rem rgba(0, 0, 0, 0.25)",
                borderRadius: "2rem",
              }}
            >
              Back
            </button>
            <div style={{ width: "50%" }}></div>
            {loadingState && <SpinnerDotted />}
            {!loadingState && (
              <button
                type="submit"
                className="btn btn-primary"
                style={{
                  width: "15%",
                  height: "3rem",
                  background: "#006872",
                  boxShadow: "0px 0.2rem 0.2rem rgba(0, 0, 0, 0.25)",
                  borderRadius: "2rem",
                }}
              >
                Next
              </button>
            )}
          </div>
        </div>
      </form>
    </>
  );
}
