import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getFunctions, httpsCallable } from "firebase/functions";
import app from "../../../firebase";
import Heart from "./Heart";

export default function JobElement(props) {
  var today = new Date();
  var t = Math.round(
    (Number(today.getTime()) - Number(props.job.time)) / 60000
  );
  const [act, setact] = useState(false);
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
    if (props.savedjobsid.includes(props.job.job_id) && !act) {
      setact(true);
    } else if (!props.savedjobsid.includes(props.job.job_id) && act) {
      setact(false);
    }
  });

  const navigate = useNavigate();
  //const { state } = useLocation();
  //console.log(state);
  console.log(props.savedjobsid);
  function gotoJob(e) {
    var st = {};
    //console.log(props.job);
    st["job"] = props.job;
    st["isfav"] = !props?.chng ? act : props?.chng;
    console.log(st);
    navigate("/Jobdetails", { state: st });
  }

  return (
    <div className="job-posting">
      <div className="title-between">
        <p
          onClick={gotoJob}
          style={{
            cursor: "pointer",
            fontWeight: "600",
            color: "#006872",
            fontSize: "1.5rem",
            margin: "0.5rem 1.6rem",
          }}
        >
          {props.job.title}{" "}
        </p>

        <Heart
          jobid={props.job.job_id}
          active={act}
          chng={props.chng}
          setchng={props.setchng}
        />
        {/* <img
            style={{ width: "1rem", marginRight: "1rem" }}
            src={require("../../../imges/dislike.svg").default}
            alt=""
          /> */}
      </div>
      <div onClick={gotoJob} style={{ cursor: "pointer" }}>
        <p
          style={{
            fontWeight: "normal",
            color: "rgba(0, 0, 0, 0.5)",
            fontSize: "1rem",
            margin: "0rem 1.6rem",
          }}
        >
          {" "}
          Est. Budget: ${props.job?.budget} - Posted {timepast} {unit} ago
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
          {props.job.job_category ? (
            <>
              <br />
              Job Category: {props.job.job_category}
            </>
          ) : (
            ""
          )}
        </p>
        <p
          style={{
            fontWeight: "normal",
            fontSize: "1.2rem",
            margin: "1rem 1.6rem",
          }}
        >
          {props.job?.details}
        </p>
        <p style={{ fontSize: "1rem", margin: "1rem 1.6rem" }}>
          Proposals:<span> {props.job.bidc} </span>
        </p>

        <div className="skill-button">
          {props.job?.skill_required.map((skl, index) => (
            <p key={index}>{skl}</p>
          ))}
        </div>
        <div className="d-flex">
          <div className="img-w-txt">
            <img
              style={{ marginRight: "0.5rem", width: "1.3rem" }}
              src={require(`../../../imges/basic_level.svg`).default}
              alt=""
            />
            <p style={{ fontWeight: "normal" }}>{props.job.level}</p>
          </div>
          <div className="img-w-txt">
            <img
              style={{ marginRight: "0.5rem", width: "1.4rem" }}
              src={require("../../../imges/jobtype.svg").default}
              alt=""
            />
            <p style={{ fontWeight: "normal" }}>{props.job.job_type}</p>
          </div>
          <div className="img-w-txt">
            <img
              style={{ marginRight: "0.5rem", width: "0.8rem" }}
              src={require("../../../imges/location.svg").default}
              alt=""
            />
            <p style={{ fontWeight: "normal" }}>
              {props.job.location || "Remote"}
            </p>
          </div>
        </div>
        <div className="img-w-txt">
          <img
            style={{ marginRight: "0.5rem", width: "1rem" }}
            src={require("../../../imges/payment.svg").default}
            alt=""
          />
          <p style={{ fontWeight: "normal" }}>
            {props.job.payment_verification || "Verified"}
          </p>
        </div>
      </div>
    </div>
  );
}
