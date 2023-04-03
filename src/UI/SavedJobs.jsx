import React from "react";

function SavedJobs() {
  const commonStyle = {
    background: "#FFFFFF",
    boxShadow: " 0rem 0.25rem 0.25rem rgba(0, 0, 0, 0.25)",
    borderRadius: "0.8rem",
    margin: "1rem",
    padding: "1rem",
  };
  return (
    <>
      <div className="">
        <p
          style={{
            background: "#FFFFFF",
            boxShadow: " 0rem 0.25rem 0.25rem rgba(0, 0, 0, 0.25)",
            borderRadius: "0.8rem",
            margin: "1rem 1rem",
            padding: "1rem",
            fontWeight: "600",
            fontSize: "1.3rem",
          }}
        >
          Saved Jobs
        </p>
      </div>
      <div style={commonStyle} className="job-posting">
        <div className="title-between">
          <p
            style={{
              fontWeight: "500",

              fontSize: "1.2rem",
              margin: "0.5rem 1.6rem",
            }}
          >
            Web designer remote job{" "}
          </p>
          {/* <div className="img-wrap">
                <img
                  style={{ width: "1rem", marginRight: "1rem" }}
                  src={require("../imges/dislike.svg").default}
                  alt=""
                />
                <img
                  style={{ width: "1rem" }}
                  src={require("../imges/heart.svg").default}
                  alt=""
                />
              </div> */}
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
          Est. Budget: $4,000, Hourly rate-$45.00
        </p>
        <p
          style={{
            fontWeight: "300",
            fontSize: "1rem",
            margin: "1rem 1.6rem",
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vitae cursus
          nulla augue sapien. Vitae facilisis imperdiet sed nunc. Pellentesque
          magna tempus aliquet eget amet. Vitae ipsum nisl sit nam nulla proin
          consectetur vitae vel.
        </p>
        {/* <p style={{ fontSize: "1rem", margin: "1rem 1.6rem" }}>
              Proposals:<span> less than 2 </span>
            </p> */}

        <div style={{ margin: "1rem" }} className="skill-button">
          <p>Web design</p>
          <p>Web UI</p>
          <p>User Experience</p>
        </div>
        {/* <div className="d-flex">
              <div className="img-w-txt">
                <img
                  style={{ marginRight: "0.5rem", width: "1.3rem" }}
                  src={require("../imges/basic_level.svg").default}
                  alt=""
                />
                <p style={{ fontWeight: "normal" }}>Basic level</p>
              </div>
              <div className="img-w-txt">
                <img
                  style={{ marginRight: "0.5rem", width: "1.4rem" }}
                  src={require("../imges/jobtype.svg").default}
                  alt=""
                />
                <p style={{ fontWeight: "normal" }}>Job type: remote</p>
              </div>
              <div className="img-w-txt">
                <img
                  style={{ marginRight: "0.5rem", width: "0.8rem" }}
                  src={require("../imges/location.svg").default}
                  alt=""
                />
                <p style={{ fontWeight: "normal" }}>Canada</p>
              </div>
            </div> */}
        {/* <div className="img-w-txt">
              <img
                style={{ marginRight: "0.5rem", width: "1rem" }}
                src={require("../imges/payment.svg").default}
                alt=""
              />
              <p style={{ fontWeight: "normal" }}>Payment verified</p>
            </div> */}

        <div className="title-between">
          <p
            style={{
              fontWeight: "500",

              fontSize: "1.2rem",
              margin: "0.5rem 1.6rem",
            }}
          >
            Create a logo{" "}
          </p>
          {/* <div className="img-wrap">
                <img
                  style={{ width: "1rem", marginRight: "1rem" }}
                  src={require("../imges/dislike.svg").default}
                  alt=""
                />
                <img
                  style={{ width: "1rem" }}
                  src={require("../imges/heart.svg").default}
                  alt=""
                />
              </div> */}
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
          Est. Budget: $4,000, Hourly rate-$45.00
        </p>
        <p
          style={{
            fontWeight: "300",
            fontSize: "1rem",
            margin: "1rem 1.6rem",
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vitae cursus
          nulla augue sapien. Vitae facilisis imperdiet sed nunc. Pellentesque
          magna tempus aliquet eget amet. Vitae ipsum nisl sit nam nulla proin
          consectetur vitae vel.
        </p>
        {/* <p style={{ fontSize: "1rem", margin: "1rem 1.6rem" }}>
              Proposals:<span> less than 2 </span>
            </p> */}

        <div style={{ margin: "1rem" }} className="skill-button">
          <p>Web design</p>
          <p>Web UI</p>
          <p>User Experience</p>
        </div>
      </div>
    </>
  );
}

export default SavedJobs;
