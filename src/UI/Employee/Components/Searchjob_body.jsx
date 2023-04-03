import React from "react";
import "./Searchjob_body.css";
import JobElement from "./JobElement";
function Searchjob_body(props) {
  console.log(props.jobs);
  return (
    <>
      <div className="browse-job">
        <h4 style={{ paddingBottom: "2rem" }}>Browse jobs</h4>
        {props.jobs.map((job, index) => (
          <JobElement
            key={index}
            job={job}
            savedjobsid={props.savedjobsid}
            chng={props.chng}
            setchng={props.setchng}
          />
        ))}
        {props.jobs.length == 0 && (
          <h5 style={{ textAlign: "center" }}>No Jobs to Show....</h5>
        )}

        {/* <div className="job-posting">
            <div className="title-between">
              <p
                style={{
                  fontWeight: "600",
                  color: "#006872",
                  fontSize: "1.5rem",
                  margin: "0.5rem 1.6rem",
                }}
              >
                Web designer remote job{" "}
              </p>
              <div className="img-wrap">
                <img
                  style={{ width: "1rem", marginRight: "1rem" }}
                  src={require("../../../imges/dislike.svg").default}
                  alt=""
                />
                <img
                  style={{ width: "1rem" }}
                  src={require("../../../imges/heart.svg").default}
                  alt=""
                />
              </div>
            </div>

            <p
              style={{
                fontWeight: "normal",
                color: "rgba(0, 0, 0, 0.5)",
                fontSize: "1rem",
                margin: "0rem 1.6rem",
              }}
            >
              {" "}
              Est. Budget: $4,000 - Posted 43 minutes ago
            </p>
            <p
              style={{
                fontWeight: "normal",
                fontSize: "1.2rem",
                margin: "1rem 1.6rem",
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vitae
              cursus nulla augue sapien. Vitae facilisis imperdiet sed nunc.
              Pellentesque magna tempus aliquet eget amet. Vitae ipsum nisl sit
              nam nulla proin consectetur vitae vel.
            </p>
            <p style={{ fontSize: "1rem", margin: "1rem 1.6rem" }}>
              Proposals:<span> less than 2 </span>
            </p>

            <div className="skill-button">
              <p>Web design</p>
              <p>Web design</p>
              <p>Web design</p>
              <p>Web design</p>
              <p>Web design</p>
              <p>Web design</p>
            </div>
            <div className="d-flex">
              <div className="img-w-txt">
                <img
                  style={{ marginRight: "0.5rem", width: "1.3rem" }}
                  src={require("../../../imges/basic_level.svg").default}
                  alt=""
                />
                <p style={{ fontWeight: "normal" }}>Basic level</p>
              </div>
              <div className="img-w-txt">
                <img
                  style={{ marginRight: "0.5rem", width: "1.4rem" }}
                  src={require("../../../imges/jobtype.svg").default}
                  alt=""
                />
                <p style={{ fontWeight: "normal" }}>Job type: remote</p>
              </div>
              <div className="img-w-txt">
                <img
                  style={{ marginRight: "0.5rem", width: "0.8rem" }}
                  src={require("../../../imges/location.svg").default}
                  alt=""
                />
                <p style={{ fontWeight: "normal" }}>Canada</p>
              </div>
            </div>
            <div className="img-w-txt">
              <img
                style={{ marginRight: "0.5rem", width: "1rem" }}
                src={require("../../../imges/payment.svg").default}
                alt=""
              />
              <p style={{ fontWeight: "normal" }}>Payment verified</p>
            </div>
          </div>

          <div className="job-posting">
            <div className="title-between">
              <p
                style={{
                  fontWeight: "600",
                  color: "#006872",
                  fontSize: "1.5rem",
                  margin: "0.5rem 1.6rem",
                }}
              >
                Full stack development{" "}
              </p>
              <div className="img-wrap">
                <img
                  style={{ width: "1rem", marginRight: "1rem" }}
                  src={require("../../../imges/dislike.svg").default}
                  alt=""
                />
                <img
                  style={{ width: "1rem" }}
                  src={require("../../../imges/heart.svg").default}
                  alt=""
                />
              </div>
            </div>
            <p
              style={{
                fontWeight: "normal",
                color: "rgba(0, 0, 0, 0.5)",
                fontSize: "1rem",
                margin: "0rem 1.6rem",
              }}
            >
              {" "}
              Est. Budget: $4,000 - Posted 43 minutes ago
            </p>
            <p
              style={{
                fontWeight: "normal",
                fontSize: "1rem",
                margin: "1rem 1.6rem",
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vitae
              cursus nulla augue sapien. Vitae facilisis imperdiet sed nunc.
              Pellentesque magna tempus aliquet eget amet. Vitae ipsum nisl sit
              nam nulla proin consectetur vitae vel.
            </p>
            <p style={{ fontSize: "1rem", margin: "1rem 1.6rem" }}>
              Proposals:<span> less than 2 </span>
            </p>

            <div className="skill-button">
              <p>Web design</p>
              <p>Web design</p>
              <p>Web design</p>
              <p>Web design</p>
              <p>Web design</p>
              <p>Web design</p>
            </div>
            <div className="d-flex">
              <div className="img-w-txt">
                <img
                  style={{ marginRight: "0.5rem", width: "1.3rem" }}
                  src={require("../../../imges/basic_level.svg").default}
                  alt=""
                />
                <p style={{ fontWeight: "normal" }}>Basic level</p>
              </div>
              <div className="img-w-txt">
                <img
                  style={{ marginRight: "0.5rem", width: "1.4rem" }}
                  src={require("../../../imges/jobtype.svg").default}
                  alt=""
                />
                <p style={{ fontWeight: "normal" }}>Job type: remote</p>
              </div>
              <div className="img-w-txt">
                <img
                  style={{ marginRight: "0.5rem", width: "0.8rem" }}
                  src={require("../../../imges/location.svg").default}
                  alt=""
                />
                <p style={{ fontWeight: "normal" }}>Canada</p>
              </div>
            </div>
            <div className="img-w-txt">
              <img
                style={{ marginRight: "0.5rem", width: "1rem" }}
                src={require("../../../imges/payment.svg").default}
                alt=""
              />
              <p style={{ fontWeight: "normal" }}>Payment verified</p>
            </div>
          </div>

          <div className="job-posting">
            <div className="title-between">
              <p
                style={{
                  fontWeight: "600",
                  color: "#006872",
                  fontSize: "1.5rem",
                  margin: "0.5rem 1.6rem",
                }}
              >
                Content Writer{" "}
              </p>
              <div className="img-wrap">
                <img
                  style={{ width: "1rem", marginRight: "1rem" }}
                  src={require("../../../imges/dislike.svg").default}
                  alt=""
                />
                <img
                  style={{ width: "1rem" }}
                  src={require("../../../imges/heart.svg").default}
                  alt=""
                />
              </div>
            </div>
            <p
              style={{
                fontWeight: "normal",
                color: "rgba(0, 0, 0, 0.5)",
                fontSize: "1rem",
                margin: "0rem 1.6rem",
              }}
            >
              {" "}
              Est. Budget: $4,000 - Posted 43 minutes ago
            </p>
            <p
              style={{
                fontWeight: "normal",
                fontSize: "1rem",
                margin: "1rem 1.6rem",
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vitae
              cursus nulla augue sapien. Vitae facilisis imperdiet sed nunc.
              Pellentesque magna tempus aliquet eget amet. Vitae ipsum nisl sit
              nam nulla proin consectetur vitae vel.
            </p>
            <p style={{ fontSize: "1rem", margin: "1rem 1.6rem" }}>
              Proposals:<span> less than 2 </span>
            </p>

            <div className="skill-button">
              <p>Web design</p>
              <p>Web design</p>
              <p>Web design</p>
              <p>Web design</p>
              <p>Web design</p>
              <p>Web design</p>
            </div>
            <div className="d-flex">
              <div className="img-w-txt">
                <img
                  style={{ marginRight: "0.5rem", width: "1.3rem" }}
                  src={require("../../../imges/basic_level.svg").default}
                  alt=""
                />
                <p style={{ fontWeight: "normal" }}>Basic level</p>
              </div>
              <div className="img-w-txt">
                <img
                  style={{ marginRight: "0.5rem", width: "1.4rem" }}
                  src={require("../../../imges/jobtype.svg").default}
                  alt=""
                />
                <p style={{ fontWeight: "normal" }}>Job type: remote</p>
              </div>
              <div className="img-w-txt">
                <img
                  style={{ marginRight: "0.5rem", width: "0.8rem" }}
                  src={require("../../../imges/location.svg").default}
                  alt=""
                />
                <p style={{ fontWeight: "normal" }}>Canada</p>
              </div>
            </div>
            <div className="img-w-txt">
              <img
                style={{ marginRight: "0.5rem", width: "1rem" }}
                src={require("../../../imges/payment.svg").default}
                alt=""
              />
              <p style={{ fontWeight: "normal" }}>Payment verified</p>
            </div>
          </div>

          <div className="job-posting">
            <div className="title-between">
              <p
                style={{
                  fontWeight: "600",
                  color: "#006872",
                  fontSize: "1.5rem",
                  margin: "0.5rem 1.6rem",
                }}
              >
                Create a logo{" "}
              </p>
              <div className="img-wrap">
                <img
                  style={{ width: "1rem", marginRight: "1rem" }}
                  src={require("../../../imges/dislike.svg").default}
                  alt=""
                />
                <img
                  style={{ width: "1rem" }}
                  src={require("../../../imges/heart.svg").default}
                  alt=""
                />
              </div>
            </div>
            <p
              style={{
                fontWeight: "normal",
                color: "rgba(0, 0, 0, 0.5)",
                fontSize: "1rem",
                margin: "0rem 1.6rem",
              }}
            >
              {" "}
              Est. Budget: $4,000 - Posted 43 minutes ago
            </p>
            <p
              style={{
                fontWeight: "normal",
                fontSize: "1rem",
                margin: "1rem 1.6rem",
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vitae
              cursus nulla augue sapien. Vitae facilisis imperdiet sed nunc.
              Pellentesque magna tempus aliquet eget amet. Vitae ipsum nisl sit
              nam nulla proin consectetur vitae vel.
            </p>
            <p style={{ fontSize: "1rem", margin: "1rem 1.6rem" }}>
              Proposals:<span> less than 2 </span>
            </p>

            <div className="skill-button">
              <p>Web design</p>
              <p>Web design</p>
              <p>Web design</p>
              <p>Web design</p>
              <p>Web design</p>
              <p>Web design</p>
            </div>
            <div className="d-flex">
              <div className="img-w-txt">
                <img
                  style={{ marginRight: "0.5rem", width: "1.3rem" }}
                  src={require("../../../imges/basic_level.svg").default}
                  alt=""
                />
                <p style={{ fontWeight: "normal" }}>Basic level</p>
              </div>
              <div className="img-w-txt">
                <img
                  style={{ marginRight: "0.5rem", width: "1.4rem" }}
                  src={require("../../../imges/jobtype.svg").default}
                  alt=""
                />
                <p style={{ fontWeight: "normal" }}>Job type: remote</p>
              </div>
              <div className="img-w-txt">
                <img
                  style={{ marginRight: "0.5rem", width: "0.8rem" }}
                  src={require("../../../imges/location.svg").default}
                  alt=""
                />
                <p style={{ fontWeight: "normal" }}>Canada</p>
              </div>
            </div>
            <div className="img-w-txt">
              <img
                style={{ marginRight: "0.5rem", width: "1rem" }}
                src={require("../../../imges/payment.svg").default}
                alt=""
              />
              <p style={{ fontWeight: "normal" }}>Payment verified</p>
            </div>
          </div>

          <div className="job-posting">
            <div className="title-between">
              <p
                style={{
                  fontWeight: "600",
                  color: "#006872",
                  fontSize: "1.5rem",
                  margin: "0.5rem 1.6rem",
                }}
              >
                New website needed{" "}
              </p>
              <div className="img-wrap">
                <img
                  style={{ width: "1rem", marginRight: "1rem" }}
                  src={require("../../../imges/dislike.svg").default}
                  alt=""
                />
                <img
                  style={{ width: "1rem" }}
                  src={require("../../../imges/heart.svg").default}
                  alt=""
                />
              </div>
            </div>
            <p
              style={{
                fontWeight: "normal",
                color: "rgba(0, 0, 0, 0.5)",
                fontSize: "1rem",
                margin: "0rem 1.6rem",
              }}
            >
              {" "}
              Est. Budget: $4,000 - Posted 43 minutes ago
            </p>
            <p
              style={{
                fontWeight: "normal",
                fontSize: "1rem",
                margin: "1rem 1.6rem",
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vitae
              cursus nulla augue sapien. Vitae facilisis imperdiet sed nunc.
              Pellentesque magna tempus aliquet eget amet. Vitae ipsum nisl sit
              nam nulla proin consectetur vitae vel.
            </p>
            <p style={{ fontSize: "1rem", margin: "1rem 1.6rem" }}>
              Proposals:<span> less than 2 </span>
            </p>

            <div className="skill-button">
              <p>Web design</p>
              <p>Web design</p>
              <p>Web design</p>
              <p>Web design</p>
              <p>Web design</p>
              <p>Web design</p>
            </div>
            <div className="d-flex">
              <div className="img-w-txt">
                <img
                  style={{ marginRight: "0.5rem", width: "1.3rem" }}
                  src={require("../../../imges/basic_level.svg").default}
                  alt=""
                />
                <p style={{ fontWeight: "normal" }}>Basic level</p>
              </div>
              <div className="img-w-txt">
                <img
                  style={{ marginRight: "0.5rem", width: "1.4rem" }}
                  src={require("../../../imges/jobtype.svg").default}
                  alt=""
                />
                <p style={{ fontWeight: "normal" }}>Job type: remote</p>
              </div>
              <div className="img-w-txt">
                <img
                  style={{ marginRight: "0.5rem", width: "0.8rem" }}
                  src={require("../../../imges/location.svg").default}
                  alt=""
                />
                <p style={{ fontWeight: "normal" }}>Canada</p>
              </div>
            </div>
            <div className="img-w-txt">
              <img
                style={{ marginRight: "0.5rem", width: "1rem" }}
                src={require("../../../imges/payment.svg").default}
                alt=""
              />
              <p style={{ fontWeight: "normal" }}>Payment verified</p>
            </div>
          </div> */}
      </div>
    </>
  );
}

export default Searchjob_body;
