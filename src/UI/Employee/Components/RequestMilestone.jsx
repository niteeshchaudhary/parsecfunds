import React from "react";
import MileStoneMoneyReq from "./MileStoneMoneyReq";
import dollar from "../../../imges/dollar.svg";

function RequestMilestone(props) {
  return (
    <>
      <div className="fixedreq">
        <p style={{ margin: "1rem", marginBottom: "0", fontSize: "1.1rem" }}>
          Fixed Price
        </p>
        {props?.proposal?.milestone ? (
          <>
            <div style={{ marginLeft: "1rem" }} className="radio-wrap">
              <input
                checked="checked"
                style={{ width: "0.9rem", height: "0.9rem" }}
                type="radio"
                name="milestone-project"
                value="milestone"
              />
              <label
                style={{
                  fontSize: "1rem",
                  margin: "1rem 1rem 2rem 0.5rem",
                  fontWeight: "400",
                }}
                for="milestone"
              >
                By milestone{" "}
              </label>
            </div>

            {props?.proposal?.milestone.map((itm, index) => (
              <MileStoneMoneyReq
                props={itm}
                status={props?.proposal["milestatus" + index]}
                index={index}
                jbid={props?.job?.job_id}
                key={index}
              />
            ))}
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default RequestMilestone;
