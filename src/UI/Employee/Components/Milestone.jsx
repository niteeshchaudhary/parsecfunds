import React from "react";
import { useState } from "react";
import dollar from "../../../imges/dollar.svg";

function Milestone({ formErrors, onchange, addMilestone, setaddMilestone }) {
  const addMilestones = () => {
    const prevelement = addMilestone[addMilestone.length - 1];
    if (addMilestone.length > 4) {
      setaddMilestone([...addMilestone]);
    } else if (
      prevelement.description != "" &&
      prevelement.date != "" &&
      prevelement.amount != ""
    ) {
      setaddMilestone([
        ...addMilestone,
        { description: "", date: "", amount: "" },
      ]);
    }
  };
  const onChangeDesc = (e, index) => {
    const elem = e.currentTarget;
    const updatedMilestone = addMilestone.map((user, i) =>
      index == i
        ? Object.assign(user, {
            description: elem.value,
          })
        : addMilestone[i]
    );
    setaddMilestone(updatedMilestone);
  };
  const onChangeDate = (e, index) => {
    const elem = e.currentTarget;
    const updatedMilestone = addMilestone.map((user, i) =>
      index == i
        ? Object.assign(user, {
            date: elem.value,
          })
        : addMilestone[i]
    );
    setaddMilestone(updatedMilestone);
  };
  const onChangeAmt = (e, index) => {
    const elem = e.currentTarget;
    var total = 0;
    const updatedMilestone = addMilestone.map((user, i) => {
      total += index == i ? Number(elem.value) : Number(addMilestone[i].amount);
      return index == i
        ? Object.assign(user, {
            amount: elem.value,
          })
        : addMilestone[i];
    });
    onchange(total);
    setaddMilestone(updatedMilestone);
  };
  const time = new Date();
  const mnth = time.getUTCMonth() + 1;
  const dt = time.getUTCDate();
  const ltm =
    time.getUTCFullYear() +
    "-" +
    (mnth < 10 ? "0" + mnth : mnth) +
    "-" +
    (dt < 10 ? "0" + dt : dt);
  console.log(ltm);
  return (
    <>
      <p style={{ fontSize: "1.2rem", margin: "2rem 1rem", fontWeight: "500" }}>
        How many milestone do you want? ( Max 5 )
      </p>
      {addMilestone.map((milestone, index) => (
        <>
          <div
            className="d-flex flex-row justify-content-around "
            key={index}
            id={"milestone" + index}
          >
            <div className="desc">
              <p
                style={{
                  fontSize: "1rem",
                  margin: "0rem 2rem",
                  fontWeight: "400",
                }}
              >
                Description
              </p>
              <input
                name="description"
                onChange={(e) => {
                  onChangeDesc(e, index);
                }}
                defaultValue={milestone.description}
                style={{
                  width: "22vw",
                  height: "3rem",
                  margin: "1rem 2rem ",
                  padding: "1.3rem",
                  fontSize: "1rem",
                  borderRadius: "0.8rem",
                  border: "0.05rem solid rgba(0,0,0,0.4)",
                }}
                type="text"
              />
            </div>
            <div className="desc">
              <p
                style={{
                  fontSize: "1rem",
                  margin: "0rem 2rem ",
                  fontWeight: "400",
                }}
              >
                Due Date
              </p>
              <input
                name="date"
                onChange={(e) => {
                  onChangeDate(e, index);
                }}
                defaultValue={milestone.date}
                min={index > 0 ? addMilestone[index - 1].date : ltm}
                style={{
                  width: "22vw",
                  height: "3rem",
                  textAlign: "center",
                  margin: "1rem 2rem ",
                  padding: "0.6rem",
                  fontSize: "1rem",
                  borderRadius: "0.8rem",
                  border: "0.05rem solid rgba(0,0,0,0.4)",
                }}
                type="date"
              />
            </div>
            <div className="desc">
              <p
                style={{
                  fontSize: "1rem",
                  margin: "0rem 2rem ",
                  fontWeight: "400",
                }}
              >
                Amount
              </p>
              <input
                name="amount"
                type="number"
                min="0"
                onChange={(e) => {
                  onChangeAmt(e, index);
                }}
                defaultValue={milestone.amount}
                style={{
                  paddingLeft: "2rem",
                  height: "3rem",
                  background: `url(${dollar}) no-repeat left`,
                  backgroundImage: `url(${dollar})`,
                  backgroundSize: "1.1rem",
                  width: "22vw",
                  margin: "1rem 2rem ",
                  padding: "1.3rem",
                  fontSize: "1rem",
                  borderRadius: "0.8rem",
                  border: "0.05rem solid rgba(0,0,0,0.4)",
                }}
              />
            </div>
          </div>
          <div
            className="d-flex flex-row justify-content-around "
            key={index}
            id={"milestone" + index + "e"}
          >
            <p
              style={{
                color: "red",
                fontSize: "0.8rem",
                margin: "0rem 2rem",
                width: "22vw",
              }}
            >
              {formErrors["milestonedesc" + index]}
            </p>
            <p
              style={{
                color: "red",
                fontSize: "0.8rem",
                margin: "0rem 2rem",
                width: "22vw",
              }}
            >
              {formErrors["milestonedate" + index]}
            </p>
            <p
              style={{
                color: "red",
                fontSize: "0.8rem",
                margin: "0rem 2rem",
                width: "22vw",
              }}
            >
              {formErrors["milestoneamount" + index]}
            </p>
          </div>
        </>
      ))}
      <p
        onClick={addMilestones}
        style={{
          color: "#006872",
          fontSize: "1rem",
          margin: " 1rem",
          cursor: "pointer",
          fontWeight: "400",
        }}
      >
        + Add Milestone
      </p>
    </>
  );
}

export default Milestone;
