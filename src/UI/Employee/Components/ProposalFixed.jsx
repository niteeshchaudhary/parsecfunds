import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { SpinnerDotted } from "spinners-react";
import resumeimg from "../../../imges/hourly.svg";
import dollar from "../../../imges/dollar.svg";
import Card from "../../ProfileInfo/card";
import "../../ProfileInfo/Resume.css";
import "./SubmitProposal.css";
import Milestone from "./Milestone";
import app, { db } from "../../../firebase";
import { getFunctions, httpsCallable } from "firebase/functions";
import { storage, auth } from "../../../firebase";
const functions = getFunctions(app, "asia-southeast2");
const getProposedRate = httpsCallable(functions, "getProposedRate");
const getUserProfile = httpsCallable(functions, "getUserProfile");
const getWallet = httpsCallable(functions, "getWallet");
const sendProposal = httpsCallable(functions, "sendProposal");

function ProposalFixed() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const profile = state?.profile;
  const job = state?.job;
  const eproposal = state?.proposal;
  console.log(state);
  const [error, setError] = useState(false);
  const [filename, setFilename] = useState(eproposal?.documentPath || "");
  const initialValues = eproposal
    ? {
        coverletter: eproposal.coverletter,
        year_of_experience: eproposal.experience,
        hourly_rate: eproposal.hourlyrate,
      }
    : { coverletter: "", year_of_experience: "", hourlyrate: 0 };
  const [loadingState, setLoadingState] = useState(false);
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [addMilestone, setaddMilestone] = useState(
    eproposal?.milestone || [{ description: "", date: "", amount: "" }]
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
    if (showMilestone && addMilestone) {
      addMilestone.forEach((mile, index) => {
        const lastele = mile;
        if (lastele.description == "") {
          errors["milestonedesc" + index] = "*Please Provide a description";
        } else if (!regex.test(lastele.description)) {
          errors["milestonedesc" + index] =
            "*Description do not follow the format";
        }
        if (lastele.date == "") {
          errors["milestonedate" + index] =
            "*Please Provide date to your Milestone";
        }
        if (lastele.amount == "") {
          errors["milestoneamount" + index] = "*Please Provide amount";
        }
      });
    }
    if (Number(values.hourlyrate) < 0) {
      errors.hourly_rate = "*Rate should be a positive number";
    }
    console.log("23456789");
    if (Object.keys(errors).length === 0) {
      setIsSubmit(true);
      clickhandler();
    }

    // } else if (values.location.length < 4) {
    //   errors.location = "*Location must be more than 4 characters";
    // } else if (word_length_location > 10) {
    //   errors.location = "*Location cannot exceed more than 10 characters";
    // }
    return errors;
  };
  const [showMilestone, setShowMilestone] = useState(
    eproposal?.milestone ? true : false
  );
  const [showProject, setShowProject] = useState(false);

  var today = new Date();
  const [name, setname] = useState(profile?.name || "");
  const [pic, setpic] = useState(profile?.pic || "");
  const [role, setrole] = useState(profile?.role || "");
  const [Title, setTitle] = useState(profile?.title || "");
  const [Pending, setPending] = useState("");
  const [Available, setAvailable] = useState("");
  const [connects, setConnects] = useState(0);

  const [ProposedRate, setProposedRate] = useState({});
  const [Ongoing, setOngoing] = useState("");
  const [Cancelled, setCancelled] = useState("");

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
    calculate();
  }, []);
  useEffect(() => {
    getWallet().then((result) => {
      if (result.data.result.status == 1) {
        setConnects(result.data.result.desc.connects);
        setPending(result.data.result.desc.shadow_wallet);
        setAvailable(result.data.result.desc.wallet);
      }
    });
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

  async function clickhandler() {
    setLoadingState(true);
    console.log("reached clickhandle");
    const data = {
      jobID: job?.job_id,
      hourly_rate: Number(document.getElementById("hourlyrate").value),
      coverletter: document.getElementById("coverletter").value,
      experience: document.getElementById("yearexpdetails").value,
      expected_time: document.getElementById("expected_time").value,
      documentPath: filename,
    };
    if (showMilestone) {
      data["milestone"] = addMilestone;
    }
    await sendProposal(data)
      .then((result) => {
        console.log(result);
        if (result.data.status == "1") {
          if (!profile) {
            state["profile"] = {
              name: name,
              pic: pic,
              role: role,
              title: Title,
            };
          }
          state["proposal"] = data;
          state["status"] = "new";
          navigate("/Proposal", { state: state });
        } else {
          setLoadingState(false);
        }
      })
      .catch((error) => {
        setLoadingState(false);
      });
  }

  const sethourly = (e) => {
    console.log("rs", e);
    document.getElementById("hourlyrate").value = e;
    calculate();
  };

  const filechoose = (e) => {
    e.preventDefault();
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
          setFilename(file.name);
          console.log("done");
          //document.getElementById("showprogper").innerHTML = "Completed";
        }
      );
    } else {
      //document.getElementById("errordisp").innerHTML = "upload pdf file only";
    }
  };
  return (
    <>
      <p
        style={{ fontSize: "1.4rem", fontWeight: "600", padding: "0.8rem" }}
        className="jobdetail-box"
      >
        Submit a Proposal
      </p>

      <div className="jobdetail-box p-5">
        <div
          className="proposals"
          style={{
            paddingBottom: "2rem",
            borderBottom: "0.05rem solid rgba(0, 0, 0, 0.2)",
          }}
        >
          {!eproposal && (
            <>
              <p
                style={{
                  fontSize: "1.4rem",
                  marginTop: "1rem",
                  fontWeight: "600",
                }}
              >
                Proposal Settings
              </p>
              <p
                style={{
                  color: "#006872",
                  fontSize: "1.2rem",
                  marginTop: "1rem",
                }}
              >
                You have {connects} connects
              </p>
              <p style={{ fontSize: "1.2rem" }}>
                1 connect is required for this proposal
              </p>
              {connects - 1 >= 0 ? (
                <p style={{ fontSize: "1.2rem" }}>
                  When you submit this proposal, you'll have {connects - 1}{" "}
                  Connects remaining.
                </p>
              ) : (
                <p style={{ fontSize: "1.2rem" }}>
                  You Don't have enough connects to send proposal.
                </p>
              )}
            </>
          )}
        </div>
        <p style={{ fontSize: "1.4rem", marginTop: "1rem", fontWeight: "600" }}>
          Job Details
        </p>
        <h4 style={{ color: "#006872", fontSize: "1.2rem", marginTop: "1rem" }}>
          Full stack Developer
        </h4>
        <h6 style={{ marginTop: "0.5rem" }}>
          Posted {timepast} {unit} minutes ago
        </h6>
        <div
          className=" d-flex flex-row mt-1 justify-content-start"
          style={{
            paddingBottom: "1rem",
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
        <p style={{ marginTop: "0.5rem", fontSize: "1.2rem" }}>
          {job?.details}
        </p>
        {/* <p style={{ margin: "1rem 0", fontSize: "1.2rem" }}>
        </p> */}
        <p style={{ marginTop: "0.5rem", fontSize: "1rem" }}>
          Experience Required: {job?.experience}
        </p>
        {/* <p
          style={{
            paddingBottom: "1.5rem",
            fontSize: "1.2rem",
          }}
        >
          
        </p> */}
        <p style={{ fontSize: "1rem", color: "#006872", marginTop: "1rem" }}>
          View Job posting
        </p>
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
              {/* Hourly */}
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
        {connects - 1 >= 0 || eproposal ? (
          <>
            <div
              className="terms"
              style={{
                paddingBottom: "2rem",
                borderBottom: "0.05rem solid rgba(0, 0, 0, 0.2)",
              }}
            >
              <div className="d-flex flex-row justify-content-between">
                <p
                  style={{
                    fontWeight: "600",
                    fontSize: "1.4rem",
                    marginTop: "1rem",
                  }}
                >
                  Terms
                </p>
                <p style={{ color: "#006872", fontSize: "1rem" }}>
                  Employer Budget: ${job?.budget || 400.0}
                </p>
              </div>
              <p
                style={{
                  fontWeight: "600",
                  fontSize: "1.2rem",
                  marginTop: "1rem",
                }}
              >
                How do you want to be paid?
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

              <div className="milestone-project d-flex flex-column justify-content-center align-items-start">
                <div className="radio-wrap">
                  <input
                    defaultChecked={eproposal?.milestone ? true : false}
                    onClick={() => {
                      setShowMilestone(true);
                      document.getElementById("hourlyrate").value = 0;
                      setShowProject(false);
                    }}
                    style={{ width: "0.9rem", height: "0.9rem" }}
                    type="radio"
                    name="milestone-project"
                    value="milestone"
                  />
                  <label
                    style={{
                      fontSize: "1rem",
                      margin: "1rem 1rem 0rem 0.5rem",
                      fontWeight: "400",
                    }}
                    for="milestone"
                  >
                    By milestone{" "}
                  </label>
                  <p
                    style={{
                      fontSize: "1rem",
                      marginLeft: "1.4rem",
                      color: "rgba(0,0,0,0.7)",
                    }}
                  >
                    Divide the project into smaller segments, called milestones.
                    You'll be paid for milestones as they are completed and
                    approved.
                  </p>
                </div>
                <div className="radio-wrap">
                  <input
                    defaultChecked={eproposal?.milestone ? false : true}
                    onClick={() => {
                      setShowMilestone(false);
                      document.getElementById("hourlyrate").value = 0;
                      setShowProject(true);
                    }}
                    style={{ width: "0.9rem", height: "0.9rem" }}
                    name="milestone-project"
                    value="project"
                    type="radio"
                  />
                  <label
                    style={{
                      fontSize: "1rem",
                      margin: "0rem 1rem 0rem 0.5rem",
                      fontWeight: "400",
                    }}
                    for="project"
                  >
                    By project
                  </label>
                  <p
                    style={{
                      fontSize: "1rem",
                      marginLeft: "1.4rem",
                      marginBottom: "1rem",
                      color: "rgba(0,0,0,0.7)",
                    }}
                  >
                    Get your entire payment at the end, when all work has been
                    delivered.
                  </p>
                </div>
                {showMilestone && (
                  <Milestone
                    formErrors={formErrors}
                    onchange={sethourly}
                    addMilestone={addMilestone}
                    setaddMilestone={setaddMilestone}
                  />
                )}
                <>
                  <p
                    style={{
                      fontSize: "1.2rem",
                      margin: "2rem 1rem",
                      fontWeight: "500",
                    }}
                  >
                    What is the full amount you'd like to bid for this job?
                  </p>
                  <div style={{ marginBottom: "25px", width: "45vw" }}>
                    <label
                      style={{
                        width: "60%",
                        fontWeight: "600",
                        padding: "0rem",
                        marginLeft: "1rem",

                        fontSize: "1.1rem",
                      }}
                    >
                      Bid
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
                        disabled={showMilestone}
                        min="0"
                        defaultValue={
                          eproposal?.hourly_rate ? eproposal?.hourly_rate : 0
                        }
                        onChange={calculate}
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
                      {/* &nbsp;/hr */}
                    </div>
                    <p
                      style={{
                        marginLeft: "1rem",
                        fontSize: "1rem",
                        color: "rgba(0,0,0,0.7)",
                      }}
                    >
                      Total amount the client will see on your proposal
                    </p>
                  </div>
                  <div style={{ marginBottom: "25px", width: "45vw" }}>
                    <label
                      style={{
                        width: "60%",
                        fontWeight: "600",
                        padding: "0rem",
                        marginLeft: "1rem",

                        fontSize: "1.1rem",
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
                      {/* &nbsp;/hr */}
                    </div>
                  </div>
                  <div style={{ marginBottom: "25px", width: "45vw" }}>
                    <label
                      style={{
                        width: "60%",
                        fontWeight: "600",
                        padding: "0rem",
                        marginLeft: "1rem",

                        fontSize: "1.1rem",
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
                          padding: "0.9rem 1rem 0.8rem 0.8rem",
                          height: "3rem",
                          textAlign: "right",
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
                      {/* &nbsp;/hr */}
                    </div>
                  </div>
                </>
              </div>
              <p style={{ color: "red", fontSize: "0.8rem" }}>
                {formErrors?.hourly_rate}
              </p>
            </div>
            <form onSubmit={handleSubmit}>
              <div
                style={{
                  paddingBottom: "3rem",
                  borderBottom: "0.01rem solid rgba(0,0,0,0.2)",
                }}
                className="projectlength"
              >
                <p
                  style={{
                    fontWeight: "600",
                    fontSize: "1.2rem",
                    margin: "1rem 0",
                  }}
                >
                  How long will this project take?
                </p>

                <select
                  id="expected_time"
                  style={{
                    borderRadius: "0.8rem",
                    border: "0.01rem solid #333",
                    fontSize: "1rem",
                    width: "15rem",
                    padding: "0.5rem",
                    color: "rgba(0,0,0,0.7)",
                  }}
                  defaultValue={eproposal?.expected_time || ""}
                  required
                >
                  <option disabled selected value="">
                    Select project length
                  </option>
                  <option value="1 month">1 month</option>
                  <option value="2 months">2 months</option>
                  <option value="3 months">3 months</option>
                  <option value="more than 3 months">more than 3 months</option>
                </select>
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
                  style={{ borderRadius: "0.5rem", fontSize: "1rem" }}
                  onChange={handleChange}
                  defaultValue={eproposal?.coverletter}
                  name="coverletter"
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
                  How many years of experience do you have working with full
                  stack? 
                </p>
                <textarea
                  style={{ borderRadius: "0.5rem", fontSize: "1rem" }}
                  onChange={handleChange}
                  defaultValue={eproposal?.experience}
                  name="year_of_experience"
                  id="yearexpdetails"
                  cols="80"
                  rows="4"
                ></textarea>
                <p style={{ color: "red", fontSize: "0.8rem" }}>
                  {formErrors.year_of_experience}
                </p>
              </div>
              <div className="">
                <p style={{ fontWeight: "600", fontSize: "1.2rem" }}>
                  Attachment
                </p>
                <div className="input-f">
                  <input
                    type="file"
                    name="filechooser"
                    id="filechooser"
                    className="input"
                    onChange={filechoose}
                    style={{ display: "none" }}
                    accept="document/*"
                  />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
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
            </form>
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default ProposalFixed;
