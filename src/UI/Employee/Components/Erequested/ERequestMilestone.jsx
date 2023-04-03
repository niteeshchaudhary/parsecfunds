import React from "react";
import dollar from "../../../../imges/dollar.svg";
import MileStoneList from "./MileStonelist";

function ERequestMilestone(props) {
  return (
    <>
      <div className="fixedreq">
        {props?.proposal?.milestone.map((itm, index) => {
          return (
            <MileStoneList
              key={index}
              itm={itm}
              index={index}
              to={props?.proposal?.info?.from}
              jbid={props?.proposal?.jobID}
              status={props?.proposal["milestatus" + index]}
            />
          );
        })}
      </div>
    </>
  );
}

export default ERequestMilestone;
