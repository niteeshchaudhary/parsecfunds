import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { SpinnerDotted } from "spinners-react";
import resumeimg from "../../imges/workexp.svg";
import "./Resume.css";
import app from "../../firebase";
import { getFunctions, httpsCallable } from "firebase/functions";
import { ref, getDatabase } from "firebase/database";
import { useList } from "react-firebase-hooks/database";

const functions = getFunctions(app, "asia-southeast2");
const addWorkExperience = httpsCallable(functions, "addWorkExperience");
const updateWorkExperience = httpsCallable(functions, "updateWorkExperience");

var count = 1;
const database = getDatabase();
export default function WorkExp(props) {
  const navigate = useNavigate();
  const { state } = useLocation();
  const profile = state.profile;
  console.log(state);
  console.log(state.element);
  const [error, setError] = useState(false);
  const initialValues = state?.element
    ? state.element
    : { title: "", company: "", location: "" };
  const [loadingState, setLoadingState] = useState(false);
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [Country, loading, snperror] = useList(ref(database, "country"));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoadingState(true);
    console.log(formValues);
    setFormErrors(validate(formValues));
    // =>
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
    console.log("^", values);
    var word_length = values.title.trim().split(/[\s]+/).length;
    var word_length_company = values.company.trim().split(/[\s]+/).length;
    var word_length_location = values.location.trim().split(/[\s]+/).length;
    const regex = /^[a-zA-Z0-9_ ]*$/i;
    const regex_alphabet = /^[a-zA-Z ]*$/i;
    if (!values.title) {
      errors.title = "*Title is required!";
    } else if (!regex_alphabet.test(values.title)) {
      errors.title = "*This is not a valid Title format!";
    } else if (word_length > 20) {
      errors.title = "*Title cannot exceed more than 20 words";
    }

    if (!values.company) {
      errors.company = "*Company Name is required!";
    } else if (!regex.test(values.company)) {
      errors.company = "*This is not a valid company format!";
    } else if (word_length_company > 5) {
      errors.company = "*Company Name cannot exceed more than 5 words";
    }
    if (values.location == "select_country") {
      errors.location = "*Location is required";
    }
    if (Object.keys(errors).length === 0) {
      setIsSubmit(true);
    } else {
      setLoadingState(false);
    }
    // } else if (values.location.length < 4) {
    //   errors.location = "*Location must be more than 4 characters";
    // } else if (word_length_location > 10) {
    //   errors.location = "*Location cannot exceed more than 10 characters";
    // }
    return errors;
  };

  const time = new Date();
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

  // const countryList=require("../../CountryList.json").country;
  // console.log(countryList);

  function clickhandler(e) {
    const list = state ? state.list : [];
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
      if (state?.element) {
        thiselement["id"] = state?.element.id;
        updateWorkExperience(thiselement).then((result) => {
          if (result.data.status == 1) {
            var nlist = list.filter((x) => x.id !== state?.element.id);
            nlist.push(thiselement);
            console.log(nlist);
            profile["screen"] = 2;
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
        if (
          listelem.time === thiselement.time &&
          listelem.company === thiselement.company &&
          listelem.title === thiselement.title
        ) {
          flag = true;
        }
      });

      if (!flag) {
        list.push(thiselement);
        console.log("yup");
        addWorkExperience(thiselement).then((result) => {
          if (result.data.status == 1) {
            profile["screen"] = 2;
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
  useEffect(() => {
    if (state?.element?.enddate === "")
      document.getElementById("enddatediv").style.display = "none";
  }, []);
  useEffect(() => {
    document.getElementById("location").value = state?.element?.location || "";
  }, [Country]);
  function backhandler(e) {
    e.preventDefault();
    const list = state ? state.list : [];
    profile["screen"] = 2;
    navigate("/ProfileInfo", {
      state: {
        profile: profile,
        list: list,
      },
    });

    props.fun1();
  }

  return (
    <>
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
              width: "50%",
              padding: "1% 2% 2% 6%",
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
              Add relevant work experience
            </h1>
            <p
              style={{
                width: "95%",
                fontFamily: "Roboto",
                fontStyle: "normal",
                fontWeight: "400",
                marginTop: "1%",
                marginBottom: "2%",
                textAlign: "justify",
                textJustify: "inter-word",
                fontSize: "1.1rem",
                lineHeight: "1.3rem",
              }}
            >
              You can still develop a terrific profile if you're just starting
              off. Simply go to the next page
            </p>
            <h5
              style={{
                fontWeight: "600",
                fontSize: "1rem",
                margin: "0.5rem 0 0 0",
              }}
            >
              Title *
            </h5>
            <input
              onChange={handleChange}
              type="text"
              list="title"
              id="titlebox"
              defaultValue={state?.element?.title ?? ""}
              name="title"
              placeholder="Ex. Graphic designer"
              style={{
                width: "95%",
                margin: "0.5rem 0",
                padding: "0.8rem 1rem",
                height: "2.8rem",
                fontSize: "1rem",
                boxSizing: "border-box",
                border: "0.1rem solid rgba(90, 90, 90, 0.4)",
                borderRadius: "0.6rem",
              }}
            />
            <p style={{ color: "red", fontSize: "0.8rem" }}>
              {formErrors.title}
            </p>
            <h5
              style={{
                fontWeight: "600",
                fontSize: "1rem",
                margin: "0.5rem 0 0 0",
              }}
            >
              Company *
            </h5>
            <input
              onChange={handleChange}
              type="text"
              list="company"
              id="company"
              defaultValue={state?.element?.company ?? ""}
              name="company"
              placeholder="Ex. Amazon"
              style={{
                width: "95%",
                margin: "0.5rem 0",
                padding: "0.8rem 1rem",
                height: "2.8rem",
                fontSize: "1rem",
                boxSizing: "border-box",
                border: "0.1rem solid rgba(90, 90, 90, 0.4)",
                borderRadius: "0.6rem",
              }}
            />
            <p style={{ color: "red", fontSize: "0.8rem" }}>
              {formErrors.company}
            </p>
            <h5
              style={{
                fontWeight: "600",
                fontSize: "1rem",
                margin: "0.5rem 0 0.5rem 0",
              }}
            >
              Location *
            </h5>
            <select
              onChange={handleChange}
              type="text"
              list="countries"
              id="location"
              defaultValue={state?.element?.location || ""}
              name="location"
              placeholder="Ex. India"
              style={{
                width: "95%",
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
            <p style={{ color: "red", fontSize: "0.8rem" }}>
              {formErrors.location}
            </p>
            {/* {error && (
            <p>Enter Alphanumeric values only</p>
          )} */}
            <div
              style={{
                fontWeight: "600",
                fontSize: "1rem",
                margin: "0.5rem 0 0 0",
              }}
            >
              <input
                type="checkbox"
                id="chkbox"
                name="chkbox"
                className="form-check-input"
                defaultChecked={state?.element?.enddate === "" ? true : false}
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
                  lineHeight: "2rem",
                }}
              />
              <label
                className="form-check-label"
                htmlFor="chkbox"
                style={{
                  fontStyle: "normal",
                  fontWeight: "400",
                  fontSize: "1rem",
                  lineHeight: "1.5rem",
                }}
              >
                &nbsp;&nbsp;I’m currently working here
              </label>
            </div>
            <div
              style={{ display: "flex", width: "95%", margin: "0.8rem 0 0 0" }}
            >
              <div style={{ width: "48%", float: "left" }}>
                <h5 style={{ fontWeight: "600", fontSize: "1rem" }}>
                  Start Date *
                </h5>
                <select
                  id="startmbox"
                  name="startmbox"
                  defaultValue={
                    state?.element
                      ? state?.element?.startdate.split(" ")[0]
                      : "January"
                  }
                  style={{
                    width: "47%",
                    padding: "0px 0.5rem",
                    height: "2.4rem",
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
                  defaultValue={
                    state?.element
                      ? state.element?.startdate.split(" ")[1]
                      : time.getFullYear()
                  }
                  id="startybox"
                  name="startybox"
                  style={{
                    width: "47%",
                    padding: "0px 0.5rem",
                    height: "2.4rem",
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
              <div id="enddatediv" style={{ width: "48%", float: "right" }}>
                <h5 style={{ fontWeight: "600", fontSize: "1rem" }}>
                  End Date *
                </h5>
                <select
                  id="endmbox"
                  name="endmbox"
                  defaultValue={
                    state?.element
                      ? state?.element?.enddate.split(" ")[0]
                      : months[time.getMonth()]
                  }
                  style={{
                    width: "47%",
                    padding: "0px 0.5rem",
                    height: "2.4rem",
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
                  defaultValue={
                    state?.element?.enddate.split(" ")[1] ?? time.getFullYear()
                  }
                  id="endybox"
                  name="endybox"
                  style={{
                    width: "47%",
                    padding: "0px 0.5rem",
                    height: "2.4rem",
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
        <div style={{ width: "100%" }}>
          <progress
            id="progr"
            value="30"
            max="100"
            style={{
              accentColor: "#FFC727",
              height: "0.26rem",
              width: "100%",
            }}
          >
            30%
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
