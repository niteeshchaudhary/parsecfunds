import React, { useEffect, useState } from "react";

import resumeimg from "../../../imges/hourly.svg";
import { SpinnerDotted } from "spinners-react";
import dollar from "../../../imges/dollar.svg";
import Card from "../../ProfileInfo/card";
import "../../ProfileInfo/Resume.css";
import "./SubmitProposal.css";
import app, { db } from "../../../firebase";
import { getFunctions, httpsCallable } from "firebase/functions";
import { storage, auth } from "../../../firebase";
import { useNavigate, useLocation } from "react-router-dom";
const functions = getFunctions(app, "asia-southeast2");
const getProposedRate = httpsCallable(functions, "getProposedRate");
const getUserProfile = httpsCallable(functions, "getUserProfile");
const getWallet = httpsCallable(functions, "getWallet");
const sendProposal = httpsCallable(functions, "sendProposal");

function SubmitProposal() {
  var today = new Date();
  const navigate = useNavigate();
  const { state } = useLocation();
  const job = state?.job;
  const profile = state?.profile;
  const eproposal = state?.proposal;
  const [name, setname] = useState(profile?.name || "");
  const [pic, setpic] = useState(profile?.pic || "");
  const [role, setrole] = useState(profile?.role || "");
  const [Title, setTitle] = useState(profile?.title || "");
  const [Pending, setPending] = useState("");
  const [Available, setAvailable] = useState("");
  const [connects, setConnects] = useState(0);
  const [filename, setfilename] = useState(eproposal?.documentPath || "");
  const initialValues = eproposal
    ? {
        coverletter: eproposal.coverletter,
        year_of_experience: eproposal.experience,
        hourlyrate: eproposal.hourly_rate,
      }
    : { coverletter: "", year_of_experience: "", hourlyrate: 0 };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [loadingState, setLoadingState] = useState(false);
  const [ProposedRate, setProposedRate] = useState({});

  var t = Math.round((Number(today.getTime()) - Number(job?.time)) / 60000);
  const labels = ["minutes", "hours", "days", "months", "years"];
  const [timepast, settimepast] = useState(
    Math.round(t / 512400)
      ? Math.round(t / 512400)
      : Math.round(t / 42700)
      ? Math.round(t / 42700)
      : Math.round(t / 1400)
      ? Math.round(t / 1400)
      : Math.round(t / 60)
      ? Math.round(t / 60)
      : t
  );
  const [unit, setunit] = useState(
    Math.round(t / 512400)
      ? labels[4]
      : Math.round(t / 42700)
      ? labels[3]
      : Math.round(t / 1400)
      ? labels[2]
      : Math.round(t / 60)
      ? labels[1]
      : labels[0]
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formValues);
    setFormErrors(validate(formValues));
    // =>
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    console.log("^", values);
    var word_length = values.coverletter.trim().split(/[\s]+/).length;
    var word_length_year = values.year_of_experience
      .trim()
      .split(/[\s]+/).length;

    const regex = /^[a-zA-Z0-9,'_ \n]*$/i;
    // const regex_alphabet=/^[a-z]*$/i;
    if (!values.coverletter) {
      errors.coverletter = "*coverletter is required!";
    } else if (!regex.test(values.coverletter)) {
      errors.coverletter = "*This is not a valid coverletter format!";
    } else if (word_length < 10) {
      errors.coverletter = "*Coverletter should be more than 10 words";
    }

    if (!values.year_of_experience) {
      errors.year_of_experience = "*year of experience  is required!";
    } else if (!regex.test(values.year_of_experience)) {
      errors.year_of_experience =
        "*This is not a valid year of experience format!";
    } else if (word_length_year > 10) {
      errors.year_of_experience =
        "*Year of experience cannot exceed more than 10 words";
    }

    if (Number(values.hourlyrate) < 0) {
      errors.hourly_rate = "*Rate should be a positive number";
    }
    if (Object.keys(errors).length === 0) {
      setIsSubmit(true);
      clickhandler();
    }

    return errors;
  };

  useEffect(() => {
    if (!profile) {
      getUserProfile().then((result) => {
        // console.log(result.data);
        if (result.data.result.status == 1) {
          setname(result.data.result.desc.name);
          setpic(result.data.result.desc.pic);
          setrole(result.data.result.desc.role);
          setTitle(result.data.result.desc.Title);
        }
      });
    }
    getProposedRate().then((result) => {
      console.log(result.data.result.desc);
      if (result.data.result.status == 1) {
        setProposedRate(result.data.result.desc);
      }
    });
  }, []);
  useEffect(() => {
    getWallet().then((result) => {
      if (result.data.result.status == 1) {
        setConnects(result.data.result.desc.connects);
        setPending(result.data.result.desc.shadow_wallet);
        setAvailable(result.data.result.desc.wallet);
      }
    });
    calculate();
  });
  const [progress, setProgress] = useState(
    eproposal?.documentPath && eproposal?.documentPath != "" ? 100 : 0
  );
  function calculate(e) {
    console.log("here");
    if (e) {
      handleChange(e);
    }
    try {
      document.getElementById("servicefee").innerHTML =
        (Number(document.getElementById("hourlyrate").value) * 20) / 100;
      document.getElementById("calcamount").innerHTML =
        (Number(document.getElementById("hourlyrate").value) * 80) / 100;
    } catch (err) {}
  }
  const filechoose = (e) => {
    const file = e.currentTarget.files[0];
    uploadFiles(file);
  };
  const uploadFiles = (file) => {
    //temp/uid/uid.pdf/image/video
    //document.getElementById("errordisp").innerHTML = "";
    const flarr = file.name.split(".");
    const ext = flarr[flarr.length - 1];
    console.log(ext, file.name, flarr.length);
    if (ext == "pdf") {
      const uploadTask = storage
        .ref(
          `temp/${job.from}/${job.job_id}/${auth.currentUser.email}/${file.name}`
        )
        .put(file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          //
          const prog = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(prog);
        },
        (error) => {
          console.log(error);
          //document.getElementById("errordisp").innerHTML = error.code;
        },
        () => {
          setfilename(file.name);
          console.log("done");
          //document.getElementById("showprogper").innerHTML = "Completed";
        }
      );
    } else {
      //document.getElementById("errordisp").innerHTML = "upload pdf file only";
    }
  };

  async function clickhandler() {
    setLoadingState(true);
    const data = {
      jobID: job.job_id,
      hourly_rate: Number(document.getElementById("hourlyrate").value),
      coverletter: document.getElementById("coverletter").value,
      experience: document.getElementById("yearexpdetails").value,
      documentPath: filename,
    };
    console.log("heretoo");
    await sendProposal(data)
      .then((result) => {
        console.log(result);

        if (result.data.status == "1") {
          navigate("/Proposal", {
            state: {
              profile: { name: name, pic: pic, role: role, title: Title },
              job: job,
              proposal: data,
              status: "new",
            },
          });
        } else {
          alert(result.data?.desc);
        }
        setLoadingState(false);
      })
      .catch((error) => {
        setLoadingState(false);
      });
  }

  return (
    <>
      <p
        style={{ fontSize: "1.4rem", fontWeight: "600", padding: "0.8rem" }}
        className="jobdetail-box"
      >
        Submit a Proposal
      </p>

      <div className="jobdetail-box">
        <div
          className="proposals"
          style={{
            paddingBottom: "2rem",
            borderBottom: "0.05rem solid rgba(0, 0, 0, 0.2)",
          }}
        >
          <p
            style={{ fontSize: "1.4rem", marginTop: "1rem", fontWeight: "600" }}
          >
            Proposal Settings
          </p>
          <p
            style={{ color: "#006872", fontSize: "1.2rem", marginTop: "1rem" }}
          >
            You have {connects} connects
          </p>
          <p style={{ fontSize: "1.2rem" }}>
            1 connect is required for this proposal
          </p>
          <p style={{ fontSize: "1.2rem" }}>
            When you submit this proposal, you'll have {connects - 1} Connects
            remaining.
          </p>
        </div>
        <p style={{ fontSize: "1.4rem", marginTop: "1rem", fontWeight: "600" }}>
          Job Details
        </p>
        <h4 style={{ color: "#006872", fontSize: "1.2rem", marginTop: "1rem" }}>
          {job?.role}
        </h4>
        <h6 style={{ marginTop: "0.5rem" }}>
          Posted {timepast} {unit} ago
        </h6>
        <div
          className=" d-flex flex-row mt-1 justify-content-start"
          style={{
            paddingBottom: "2rem",
          }}
        >
          <img
            style={{ width: "1rem" }}
            src={require("../../../imges/worldwide.svg").default}
            alt=""
          />
          <p
            style={{
              fontWeight: "normal",
              fontSize: "1rem",
              marginLeft: "0.5rem",
            }}
          >
            Worldwide
          </p>
        </div>
        <p style={{ marginTop: "2rem", fontSize: "1.2rem" }}>{job?.details}</p>
        <p style={{ margin: "1rem 0", fontSize: "1.2rem" }}>
          PLEASE INCLUDE A TIMESCALE AND SUGGESTED BUDGET IN YOUR OFFER
        </p>
        <p style={{ marginTop: "0.5rem", fontSize: "1rem" }}>
          Experience Required: {job?.experience}
        </p>
        <p
          style={{
            paddingBottom: "1.5rem",
            fontSize: "1.2rem",
          }}
        ></p>

        <p
          style={{ fontSize: "1rem", color: "#006872", marginTop: "1rem" }}
        ></p>
        <div
          style={{
            paddingBottom: "1.5rem",
            borderBottom: "0.05rem solid rgba(0, 0, 0, 0.2)",
          }}
          className="d-flex flex-row justify-content-start"
        >
          <div className="partition  ">
            <div className="d-flex flex-row">
              <img
                style={{ width: "0.8rem", marginRight: "0.5rem" }}
                src={require("../../../imges/clock.svg").default}
                alt=""
              />
              <p style={{ fontWeight: "600", fontSize: "1.2rem" }}>
                {job?.job_type}
              </p>
            </div>
            <p
              style={{
                color: "#000000B2",
                fontSize: "1.1rem",
                marginLeft: "1.3rem",
                fontSize: "1.2rem",
              }}
            >
              {/* {job.job_type} */}
            </p>
          </div>
          <div className="partition mx-4 ">
            <div className="d-flex flex-row">
              <img
                style={{ width: "0.8rem", marginRight: "0.5rem" }}
                src={require("../../../imges/calendar.svg").default}
                alt=""
              />
              <p style={{ fontWeight: "600", fontSize: "1.2rem" }}>
                {job?.duration}
              </p>
            </div>
            <p
              style={{
                color: "#000000B2",
                fontSize: "1.1rem",
                marginLeft: "1.3rem",
              }}
            >
              Project Length
            </p>
          </div>
          <div className="partition mx-2  ">
            <div
              style={{ marginTop: "2rem" }}
              className="d-flex flex-row justify-content-start"
            >
              <img
                style={{ width: "0.8rem", marginRight: "0.5rem" }}
                src={require("../../../imges/intermediate.svg").default}
                alt=""
              />
              <p style={{ fontWeight: "600", fontSize: "1.2rem" }}>
                {job?.level}
              </p>
            </div>
            <p
              style={{
                color: "#000000B2",
                fontSize: "1.1rem",
                marginLeft: "1.3rem",
              }}
            >
              {/* I am looking for a mix of <br /> experience and value */}
            </p>
          </div>
        </div>

        <div
          style={{
            paddingBottom: "4rem",
            paddingTop: "2rem",
            borderBottom: "0.05rem solid rgba(0, 0, 0, 0.2)",
          }}
          className="skill-expert"
        >
          <p style={{ fontWeight: "600", fontSize: "1.2rem" }}>
            Skills and Expertise
          </p>

          <div className="skill-button">
            {job?.skill_required.map((skill, index) => (
              <p key={index}>{skill}</p>
            ))}
          </div>
        </div>
        <div
          className="terms"
          style={{
            paddingBottom: "2rem",
            borderBottom: "0.05rem solid rgba(0, 0, 0, 0.2)",
          }}
        >
          <p
            style={{ fontWeight: "600", fontSize: "1.4rem", marginTop: "1rem" }}
          >
            Terms
          </p>
          <p
            style={{ fontWeight: "600", fontSize: "1.2rem", marginTop: "1rem" }}
          >
            What is the rate you'd like to bid for this job?
          </p>
          <p
            style={{
              color: "#006872",
              fontSize: "1rem",
              marginTop: "1rem",
              marginBottom: "2rem",
            }}
          >
            {ProposedRate?.hourly &&
              `Your profile rate: $${ProposedRate.hourly}/hr`}
          </p>
          <div style={{ marginBottom: "1.5rem", width: "45vw" }}>
            <label
              style={{
                width: "60%",
                fontWeight: "600",
                padding: "0.6rem 0.8rem",
                height: "3rem",
                fontSize: "1.1rem",
                boxSizing: "border-box",
                border: "0.1rem solid rgba(90, 90, 90, 0.4)",
                borderRadius: "0.8rem",
              }}
            >
              Hourly Rate
            </label>
            <div
              style={{
                width: "30%",
                float: "right",
                fontWeight: "400",
                fontSize: "1.1rem",
                lineHeight: "100%",
              }}
            >
              <input
                type="number"
                placeholder="0.0"
                id="hourlyrate"
                name="hourlyrate"
                onChange={calculate}
                defaultValue={
                  eproposal?.hourly_rate ? eproposal?.hourly_rate : 0
                }
                className="icoinp"
                style={{
                  width: "70%",
                  padding: "0.6rem 0.8rem",
                  height: "3rem",
                  textAlign: "right",
                  paddingLeft: "1rem",
                  background: `url(${dollar}) no-repeat left`,
                  backgroundImage: `url(${dollar})`,
                  backgroundSize: "1.1rem",
                  fontSize: "1.1rem",
                  boxSizing: "border-box",
                  border: "0.1rem solid rgba(90, 90, 90, 0.4)",
                  borderRadius: "0.8rem",
                }}
              />
              &nbsp;/hr
            </div>
          </div>
          <div style={{ marginBottom: "1.5rem", width: "45vw" }}>
            <label
              style={{
                width: "60%",
                padding: "0.6rem 0.8rem",
                height: "3rem",
                fontSize: "1.1rem",
                boxSizing: "border-box",
                border: "0.1rem solid rgba(90, 90, 90, 0.4)",
                borderRadius: "0.8rem",
              }}
            >
              Service fee (20%)
            </label>
            <div
              style={{
                width: "30%",
                float: "right",
                fontWeight: "400",
                fontSize: "1.1rem",
                lineHeight: "100%",
              }}
            >
              <label
                placeholder="0.0"
                className="icoinp"
                onChange={calculate}
                defaultValue="0.0"
                id="servicefee"
                style={{
                  width: "70%",
                  padding: "0.9rem 1rem 0.8rem 0.8rem",
                  height: "3rem",
                  textAlign: "right",
                  paddingLeft: "1rem",
                  background: `url(${dollar}) no-repeat left`,
                  backgroundImage: `url(${dollar})`,
                  backgroundSize: "1rem",
                  fontSize: "1.1rem",
                  boxSizing: "border-box",
                  border: "0.1rem solid rgba(90, 90, 90, 0.4)",
                  borderRadius: "0.8rem",
                }}
              >
                0
              </label>
              &nbsp;/hr
            </div>
          </div>
          <div style={{ marginBottom: "25px", width: "45vw" }}>
            <label
              style={{
                width: "60%",
                padding: "0.6rem 0.8rem",
                height: "3rem",
                fontSize: "1.1rem",
                boxSizing: "border-box",
                border: "0.1rem solid rgba(90, 90, 90, 0.4)",
                borderRadius: "0.8rem",
              }}
            >
              Amount you’ll receive
            </label>
            <div
              style={{
                width: "30%",
                float: "right",
                fontWeight: "400",
                fontSize: "1.1rem",
                lineHeight: "100%",
              }}
            >
              <label
                type="currency"
                placeholder="0.0"
                className="icoinp"
                id="calcamount"
                style={{
                  width: "70%",
                  padding: "0.8rem 1rem 0.8rem 0.8rem",
                  height: "3rem",
                  textAlign: "right",
                  paddingLeft: "1rem",
                  background: `url(${dollar}) no-repeat left`,
                  backgroundImage: `url(${dollar})`,
                  backgroundSize: "1.1rem",
                  fontSize: "1.1rem",
                  boxSizing: "border-box",
                  border: "0.1rem solid rgba(90, 90, 90, 0.4)",
                  borderRadius: "0.8rem",
                }}
              >
                0
              </label>
              &nbsp;/hr
            </div>
          </div>
          <p style={{ color: "red", fontSize: "0.8rem" }}>
            {formErrors?.hourly_rate}
          </p>
        </div>

        <div className="">
          <p
            style={{
              fontWeight: "600",
              fontSize: "1.2rem",
              marginBottom: "1rem",
              marginTop: "2rem",
            }}
          >
            Cover Letter
          </p>
          <textarea
            style={{ borderRadius: "0.5rem", width: "79vw" }}
            name="coverletter"
            onChange={handleChange}
            defaultValue={eproposal?.coverletter}
            id="coverletter"
            cols="80"
            rows="4"
          ></textarea>
          <p style={{ color: "red", fontSize: "0.8rem" }}>
            {formErrors.coverletter}
          </p>
        </div>
        <div className="">
          <p
            style={{
              fontWeight: "600",
              fontSize: "1.2rem",
              marginBottom: "1rem",
            }}
          >
            How many years of experience do you have working with full stack? 
          </p>
          <textarea
            style={{ borderRadius: "0.5rem", width: "79vw" }}
            name="year_of_experience"
            onChange={handleChange}
            defaultValue={eproposal?.experience}
            id="yearexpdetails"
            cols="80"
            rows="4"
          ></textarea>
          <p style={{ color: "red", fontSize: "0.8rem" }}>
            {formErrors.year_of_experience}
          </p>
        </div>
        <div className="">
          <p style={{ fontWeight: "600", fontSize: "1.2rem" }}>Attachment</p>
          <div className="input-f">
            <input
              type="file"
              name="filechooser"
              id="filechooser"
              className="input"
              onChange={filechoose}
              style={{ display: "none" }}
            />
            <button
              onClick={() => {
                document.getElementById("filechooser").click();
              }}
              className="btn btn-primary"
              style={{
                padding: "1rem",
                width: "79vw",
                fontFamily: "Roboto",
                fontStyle: "normal",
                fontWeight: "500",
                fontSize: "1.2rem",
                lineHeight: "1rem",
                color: "#006872",
                textAlign: "center",
                background: "#fff",
                border: "1px solid rgba(0, 0, 0, 0.4)",
                borderRadius: "0.4rem",
                marginTop: "1rem",
                marginBottom: "1rem",
              }}
            >
              {filename != "" && progress == 100
                ? "File : " + filename
                : "Upload projects file"}
              &nbsp;&nbsp;
              {100 > progress && progress > 0
                ? " Uploading " + progress
                : progress == 100
                ? " Upload completed "
                : ""}
            </button>
          </div>
        </div>
        <p style={{ fontSize: "0.8rem", color: " #000000B2" }}>
          To strengthen your application, include work samples or other
          documents.{" "}
        </p>

        <div
          style={{
            display: "flex",
            height: "10vh",
            justifyContent: "left",
            paddingRight: "10%",
            marginTop: "2rem",
          }}
        >
          {loadingState && <SpinnerDotted style={{ height: "2rem" }} />}
          {!loadingState && (
            <button
              type="submit"
              onClick={handleSubmit}
              className="btn btn-primary"
              style={{
                width: "15%",
                height: "3rem",
                background: "#006872",
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                borderRadius: "0.4rem",
              }}
            >
              Submit Proposal
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default SubmitProposal;
