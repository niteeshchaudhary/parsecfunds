import React, { useState, useEffect } from "react";
import descimg from "../../../imges/socialbio.svg";
import { SpinnerDotted } from "spinners-react";
import upimg from "../../../imges/upload.png";
import Chips from "./chips";
import "./chips.css";

import app, { db, auth } from "../../../firebase";
import { useNavigate, useLocation } from "react-router-dom";
import { getFunctions, httpsCallable } from "firebase/functions";
import { useUserAuth } from "../../../context/UserAuthContext";
import { ref, getDatabase } from "firebase/database";
import { useList } from "react-firebase-hooks/database";
const functions = getFunctions(app, "asia-southeast2");
const setRequirements = httpsCallable(functions, "setRequirements");

const database = getDatabase();
export default function Profiledetails({ setUserStatus }) {
  const { user, logOut } = useUserAuth();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [loadingState, setLoadingState] = useState(false);
  const [Country, loading, snperror] = useList(ref(database, "country"));

  const [onstate, setonstate] = useState(false);
  const [pic, setpic] = useState(
    auth?.currentUser?.photoURL ? auth?.currentUser?.photoURL : null
  );
  const initialValues = {
    fullname:
      auth?.currentUser?.displayName ||
      user?.profile?.name ||
      state?.profile?.name,
    line_1: "",
    line_2: "",
    pincode: "",
    pic: pic,
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  useEffect(() => {
    if (pic == null && auth?.currentUser?.photoURL) {
      setpic(auth?.currentUser?.photoURL);
    }
    if (auth?.currentUser?.displayName) {
      setFormValues({
        ...formValues,
        ["fullname"]: auth?.currentUser?.displayName,
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoadingState(true);
    console.log("Reached");
    setFormErrors(validate(formValues));
    console.log(formValues);
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
    }
  }, [formErrors]);
  const validate = (values) => {
    const errors = {};
    // var word_length = values.institute.trim().split(/[\s]+/).length;
    const regex = /^[a-zA-Z0-9/_ ]*$/i;
    const regex_num = /^[0-9]*$/i;
    const regex_alphabet = /^[a-zA-Z ]*$/i;
    // const regex_alphabet=/^[a-z]*$/i;
    if (!values.fullname) {
      errors.fullname = "*Full name is required!";
    } else if (!regex_alphabet.test(values.fullname)) {
      errors.fullname = "*This is not a valid name format!";
    } else if (values.fullname.length > 30) {
      errors.fullname = "*Name name cannot exceed more than 30 characters";
    } else if (values.fullname.length < 2) {
      errors.fullname = "*fullname name is too short";
    } else if (values.fullname.length > 30) {
      errors.fullname = "*fullname name cannot exceed more than 30 characters";
    }
    if (!values.line_1) {
      errors.line_1 = "*Address is required!";
    } else if (!regex.test(values.line_1)) {
      errors.line_1 = "*This is not a valid address format!";
    } else if (values.line_1.length > 30) {
      errors.line_1 = "*Name name cannot exceed more than 30 characters";
    } else if (values.line_1.length < 2) {
      errors.line_1 = "*Address is too short";
    } else if (values.line_1.length > 30) {
      errors.line_1 =
        "*Address Line-1 name cannot exceed more than 30 characters";
    }
    if (!values.line_2) {
      errors.line_2 = "*Address is required!";
    } else if (!regex.test(values.line_2)) {
      errors.line_2 = "*This is not a valid address format!";
    } else if (values.line_2.length > 50) {
      errors.line_2 = "*Address Line-1 cannot exceed more than 50 characters";
    } else if (values.line_2.length < 2) {
      errors.line_2 = "*Address is too short";
    } else if (values.line_2.length > 50) {
      errors.line_2 =
        "*Address Line-2 name cannot exceed more than 50 characters";
    }
    if (!values.pincode) {
      errors.pincode = "*Pincode is required!";
    } else if (!regex_num.test(values.pincode)) {
      errors.pincode = "*This is not a valid pincode format!";
    } else if (!values.pincode.length == 6) {
      errors.pincode = "*Pincode can only be 6 digits";
    }
    if (!pic) {
      errors.pic = "*Profile picture is required";
    } else if (pic.length > 916075) {
      errors.pic = "*Profile picture size is too large (allowed 550Kb)";
    }

    if (Object.keys(errors).length === 0) {
      setIsSubmit(true);
      clickhandler();
    } else {
      setLoadingState(false);
    }
    return errors;
  };
  function clickhandler() {
    console.log("reached here345");
    const name = document.getElementById("selectName").value;
    const profilepic = pic;
    const dob = document.getElementById("selectdob").value;
    const gender = document.getElementById("selectgender").value;
    const address = {
      address:
        document.getElementById("selechouseno").value +
        " " +
        document.getElementById("selectstreet").value,
      country: document.getElementById("selectcountry").value,
      pincode: document.getElementById("pincode").value,
    };

    setRequirements({
      req: state?.edata,
      profile: {
        name: name,
        pic: profilepic,
        dob: dob,
        gender: gender,
        address: address,
      },
    })
      .then((result) => {
        console.log(result.data);
        if (result.data?.status == 1) {
          setUserStatus();
          var pro = state?.profile || {};
          pro["name"] = name;
          pro["pic"] = profilepic;

          navigate("/PostJob", {
            state: { profile: pro, edata: state?.edata },
          });
        } else {
          alert(result.data?.desc);
        }
        setLoadingState(false);
      })
      .catch((error) => {
        console.log(error);
        setLoadingState(false);
      });
  }

  function setImage(e) {
    var reader = new FileReader();
    reader.addEventListener(
      "load",
      function () {
        console.log("123");
        setpic(reader.result);
      },
      false
    );
    if (document.getElementById("uploadimg").files[0]) {
      if (
        document.getElementById("uploadimg").files[0]?.type.split("/")[0] ==
        "image"
      )
        // getExtension(document.getElementById("uploadimg").files[0].)
        reader.readAsDataURL(document.getElementById("uploadimg").files[0]);
      else {
        alert("Please Upload a valid image file");
      }
    }
    //setpic(URL.createObjectURL(document.getElementById("uploadimg").files[0]));
  }

  return (
    <>
      <div className="main-logr">
        <div
          className="Scroll"
          style={{
            display: "flex",
            overflow: "auto",
            justifyContent: "center",
            paddingTop: "0%",
            width: "50%",
            height: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              weight: "5rem",
              width: "40rem",
              marginTop: "10%",
              // backgroundColor: "green",
            }}
          >
            <div
              style={{
                display: "flex",
                weight: "5rem",
                borderRadius: "50%",
                justifyContent: "center",
              }}
            >
              <input
                type="file"
                onChange={setImage}
                name="uploadimg"
                id="uploadimg"
                accept="image/png, image/jpeg, image/jpg"
              />
              <img
                src={pic ? pic : upimg}
                onClick={() => {
                  document.getElementById("uploadimg").click();
                }}
                alt=""
                style={{
                  cursor: "pointer",
                  height: "18rem",
                  width: "18rem",
                  borderRadius: "50%",
                }}
              />
            </div>
            <p style={{ color: "red", fontSize: "0.8rem" }}>{formErrors.pic}</p>
          </div>
        </div>
        <form onSubmit={handleSubmit} style={{ width: "50%" }}>
          <div
            className="Scroll"
            style={{
              overflow: "auto",
              width: "100%",
              padding: "0.6% 2% 2% 2%",
              height: "75vh",
            }}
          >
            <p
              style={{
                fontFamily: "roboto",
                fontStyle: "normal",
                width: "80%",
                fontWeight: "700",
                fontSize: "1.5rem",
                textAlign: "justify",
                textJustify: "inter-word",
                lineHeight: "2.8rem",
              }}
            >
              Just a few more details.
            </p>
            <div>
              <input
                onChange={handleChange}
                type="text"
                id="selectName"
                placeholder="Full Name"
                defaultValue={
                  auth?.currentUser?.displayName ||
                  user?.profile?.name ||
                  state?.profile?.name ||
                  ""
                }
                name="fullname"
                style={{
                  width: "90%",
                  padding: "0.5rem 0.8rem",
                  height: "2.8rem",
                  margin: "5% 0px 0.01rem 0",
                  fontSize: "1rem",
                  boxSizing: "border-box",
                  border: "0.1rem solid rgba(90, 90, 90, 0.4)",
                  borderRadius: "0.6rem",
                }}
              />
              <p style={{ color: "red", fontSize: "0.8rem" }}>
                {formErrors.fullname}
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "90%",
                }}
              >
                <input
                  type="date"
                  id="selectdob"
                  placeholder="DOB"
                  max="2010-12-31"
                  min="1940-12-31"
                  required
                  style={{
                    width: "48%",
                    padding: "0.5rem 0.8rem",
                    height: "2.8rem",
                    margin: "0.7rem 0px 0.01rem 0",
                    fontSize: "1rem",
                    boxSizing: "border-box",
                    border: "0.1rem solid rgba(90, 90, 90, 0.4)",
                    borderRadius: "0.6rem",
                  }}
                />
                <select
                  id="selectgender"
                  placeholder="gender"
                  style={{
                    width: "48%",
                    padding: "0.5rem 0.8rem",
                    height: "2.8rem",
                    margin: "0.7rem 0px 0.01rem 0",
                    fontSize: "1rem",
                    boxSizing: "border-box",
                    border: "0.1rem solid rgba(90, 90, 90, 0.4)",
                    borderRadius: "0.6rem",
                  }}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Others">Others</option>
                </select>
              </div>
            </div>
            <div style={{ margin: "1.1rem 0 0 0" }}>
              <h5>Address</h5>
              <input
                name="line_1"
                onChange={handleChange}
                type="text"
                id="selechouseno"
                placeholder="Address Line 1"
                style={{
                  width: "90%",
                  padding: "0.5rem 0.8rem",
                  height: "2.8rem",
                  margin: "0.4rem 0px 0.01rem 0",
                  fontSize: "1rem",
                  boxSizing: "border-box",
                  border: "0.1rem solid rgba(90, 90, 90, 0.4)",
                  borderRadius: "0.6rem",
                }}
              />
              <p style={{ color: "red", fontSize: "0.8rem" }}>
                {formErrors.line_1}
              </p>
              <input
                onChange={handleChange}
                name="line_2"
                type="text"
                id="selectstreet"
                placeholder="Address Line 2"
                style={{
                  width: "90%",
                  padding: "0.5rem 0.8rem",
                  height: "2.8rem",
                  margin: "0.7rem 0px 0.01rem 0",
                  fontSize: "1rem",
                  boxSizing: "border-box",
                  border: "0.1rem solid rgba(90, 90, 90, 0.4)",
                  borderRadius: "0.6rem",
                }}
              />
              <p style={{ color: "red", fontSize: "0.8rem" }}>
                {formErrors.line_2}
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "90%",
                }}
              >
                <select
                  id="selectcountry"
                  defaultValue="India"
                  style={{
                    width: "48%",
                    padding: "0.5rem 0.8rem",
                    height: "2.8rem",
                    margin: "0.7rem 0px 0.01rem 0",
                    fontSize: "1rem",
                    boxSizing: "border-box",
                    border: "0.1rem solid rgba(90, 90, 90, 0.4)",
                    borderRadius: "0.6rem",
                  }}
                >
                  {Country.map((result, index) => (
                    <option
                      text={result.val()}
                      value={result.val()}
                      key={index}
                    >
                      {result.val()}
                    </option>
                  ))}
                </select>
                <input
                  onChange={handleChange}
                  type="text"
                  name="pincode"
                  id="pincode"
                  placeholder="pincode"
                  style={{
                    width: "48%",
                    padding: "0.5rem 0.8rem",
                    height: "2.8rem",
                    margin: "0.7rem 0px 0.01rem 0rem",
                    fontSize: "1rem",
                    boxSizing: "border-box",
                    border: "0.1rem solid rgba(90, 90, 90, 0.4)",
                    borderRadius: "0.6rem",
                  }}
                />
              </div>
              <p
                style={{
                  marginLeft: "22rem",
                  color: "red",
                  fontSize: "0.8rem",
                }}
              >
                {formErrors.pincode}
              </p>
            </div>
          </div>
          <input
            type="submit"
            id="prosub"
            style={{ display: "none", visibility: "hidden" }}
          />
        </form>
      </div>
      <div style={{ height: "10vh" }}>
        <progress
          id="progr"
          value="99"
          max="100"
          style={{
            accentColor: "#FFC727",
            height: "0.26rem",
            width: "100%",
          }}
        >
          99%
        </progress>
        <div
          style={{
            display: "flex",
            height: "3.1rem",
            justifyContent: "right",
            paddingRight: "10%",
          }}
        >
          {loadingState && <SpinnerDotted />}
          {!loadingState && (
            <button
              type="submit"
              id="submitbutton"
              className="btn btn-primary"
              disabled={onstate}
              onClick={() => {
                document.getElementById("prosub").click();
              }}
              style={{
                width: "15%",
                height: "3rem",
                background: "#006872",
                boxShadow: "0px 0.2rem 0.2rem rgba(0, 0, 0, 0.25)",
                borderRadius: "2rem",
              }}
            >
              Next, Your Profile
            </button>
          )}
        </div>
      </div>
    </>
  );
}
