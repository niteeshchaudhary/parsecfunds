import React, { useState, useEffect } from "react";
import "./Dropdown.css";
import { BiChevronDown } from "react-icons/bi";
import { ref, getDatabase } from "firebase/database";
import { useList } from "react-firebase-hooks/database";
import { duration } from "@material-ui/core";

const database = getDatabase();
function Dropdown({ selected, setselected, search }) {
  const [showexp, setshowexp] = useState(false);
  const [showproposal, setshowproposal] = useState(false);
  const [categories, setcategories] = useState(false);
  const [jobtype, setjobtype] = useState(false);
  const [hourly, sethourly] = useState(false);
  const [fixed, setfixed] = useState(false);
  const [projectlength, setprojectlength] = useState(false);
  const [hoursper, sethoursper] = useState(false);
  const [clienthistory, setclienthistory] = useState(false);

  const [jobduration, jobdloading, jobderror] = useList(
    ref(database, "job_duration")
  );
  const [projectlevel, plloading, plerror] = useList(
    ref(database, "project_level")
  );
  const [languagelist, lloading, llerror] = useList(ref(database, "language"));
  const [yoe, yoeloading, yoeerror] = useList(
    ref(database, "year_of_experience")
  );
  const [skillslist, sklloading, sklerror] = useList(ref(database, "skills"));

  const [procount, proloading, proerror] = useList(
    ref(database, "ProposalCount")
  );

  const [job_type, jbloading, jberror] = useList(ref(database, "job_type"));

  const [categies, setCategies] = useList(ref(database, "category"));

  useEffect(() => {
    console.log(selected);
    search();
  }, [selected]);
  return (
    <>
      <div className="dropdown">
        <div
          onClick={() => {
            if (showexp == false) {
              setshowexp(true);
            } else {
              setshowexp(false);
              var sel = selected;
              if (sel?.joblevel) {
                delete sel.joblevel;
              }
              setselected({ ...sel });
            }
          }}
          className="dropdown-btn "
        >
          Experience level{" "}
          <BiChevronDown
            style={{ width: "3rem", fontSize: "1.4rem", marginLeft: "3.4rem" }}
          />
        </div>

        {showexp && (
          <div className="dropdown-content">
            {projectlevel.map((ele, index) => {
              return (
                <div className="dropdown-items" key={index}>
                  <input
                    style={{ marginRight: "0.5rem" }}
                    onClick={() =>
                      setselected({ ...selected, joblevel: ele.val() })
                    }
                    type="radio"
                    id={ele.val()}
                    name="experience"
                    value={ele.val()}
                  />
                  <label style={{ cursor: "pointer" }} htmlFor={ele.val()}>
                    {ele.val()}
                  </label>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="dropdown">
        <div
          onClick={() => {
            if (showproposal == false) {
              setshowproposal(true);
            } else {
              setshowproposal(false);
              var sel = selected;
              if (sel?.proposals) {
                delete sel.proposals;
              }
              setselected({ ...sel });
            }
          }}
          className="dropdown-btn"
        >
          Number of Proposals{" "}
          <BiChevronDown
            style={{ width: "3rem", fontSize: "1.4rem", marginLeft: "1rem" }}
          />
        </div>
        {showproposal && (
          <div className="dropdown-content">
            {procount.map((ele, index) => {
              return (
                <div className="dropdown-items" key={index}>
                  <input
                    style={{ marginRight: "0.5rem" }}
                    onClick={() =>
                      setselected({
                        ...selected,
                        proposals: ele.key,
                      })
                    }
                    type="radio"
                    name="proposals"
                    id={ele.val()}
                    value={ele.key}
                  />
                  <label style={{ cursor: "pointer" }} htmlFor={ele.val()}>
                    {ele.val()}
                  </label>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="dropdown">
        <div
          onClick={() => {
            if (categories == false) {
              setcategories(true);
            } else {
              setcategories(false);
              var sel = selected;
              if (sel?.category) {
                delete sel.category;
              }
              setselected({ ...sel });
            }
          }}
          className="dropdown-btn"
        >
          Categories{" "}
          <BiChevronDown
            style={{ width: "3rem", fontSize: "1.4rem", marginLeft: "5.8rem" }}
          />
        </div>
        {categories && (
          <div className="dropdown-content">
            <select
              name="catt"
              id="cat"
              onChangeCapture={(e) =>
                setselected({ ...selected, category: e.currentTarget.value })
              }
              style={{
                width: "80%",
                padding: "0.5rem",
                margin: "0rem",
                fontSize: "1rem",
                boxSizing: "border-box",
                border: "0.1rem solid rgba(90, 90, 90, 0.4)",
                borderRadius: "0.6rem",
              }}
              defaultValue=""
            >
              <option value="">Select a Category</option>
              {categies && categies !== undefined
                ? categies.map((ctr, index) => {
                    return (
                      <option key={index} value={ctr.val()}>
                        {ctr.val()}
                      </option>
                    );
                  })
                : "No category"}
              {/* <option value="">Select a Category</option>
            <option value="A">Vulnerability accessment and penetration testing</option>
            <option value="B">Forensics</option>
            <option value="C">Consultancy</option> */}
              {/* <option value="D">D</option> */}
            </select>
            {/* <select name="" id=""></select> */}
          </div>
        )}
      </div>

      <div className="dropdown">
        <div
          onClick={() => {
            if (jobtype == false) {
              setjobtype(true);
            } else {
              setjobtype(false);
              var sel = selected;
              if (sel?.jobtype) {
                delete sel.jobtype;
              }
              setselected({ ...sel });
            }
          }}
          className="dropdown-btn"
        >
          Job Type{" "}
          <BiChevronDown
            style={{ width: "3rem", fontSize: "1.4rem", marginLeft: "6.6rem" }}
          />
        </div>
        {jobtype && (
          <div className="dropdown-content">
            {job_type.map((ele, index) => {
              return (
                <div className="dropdown-items" key={index}>
                  <input
                    style={{ marginRight: "0.5rem" }}
                    onClick={() =>
                      setselected({ ...selected, jobtype: ele.val() })
                    }
                    type="radio"
                    name="jobtype"
                    id={ele.val()}
                    value={ele.val()}
                  />
                  <label style={{ cursor: "pointer" }} htmlFor={ele.val()}>
                    {ele.val()}
                  </label>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="dropdown">
        <div
          onClick={() => {
            if (projectlength == false) {
              setprojectlength(true);
            } else {
              setprojectlength(false);
              var sel = selected;
              if (sel?.jobduration) {
                delete sel.jobduration;
              }
              setselected({ ...sel });
            }
          }}
          className="dropdown-btn"
        >
          Project Length{" "}
          <BiChevronDown
            style={{ width: "3rem", fontSize: "1.4rem", marginLeft: "4.1rem" }}
          />
        </div>
        {projectlength && (
          <div className="dropdown-content">
            {jobduration.map((jd, index) => {
              return (
                <div className="dropdown-items" key={index}>
                  <input
                    style={{ marginRight: "0.5rem" }}
                    type="radio"
                    name="project_length"
                    onClick={() =>
                      setselected({ ...selected, jobduration: jd.val() })
                    }
                    id={jd.val()}
                    value={jd.val()}
                  />
                  <label style={{ cursor: "pointer" }} htmlFor={jd.val()}>
                    {jd.val()}
                  </label>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}

export default Dropdown;
