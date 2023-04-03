import React, { useEffect, useState } from "react";
import Search_sidebar from "./Search_sidebar";
import Searchjob_body from "./Searchjob_body";
import { SpinnerDotted } from "spinners-react";

import { useNavigate, useLocation } from "react-router-dom";

import { getFunctions, httpsCallable } from "firebase/functions";
import app from "../../../firebase";
const functions = getFunctions(app, "asia-southeast2");
const searchJob = httpsCallable(functions, "searchJob");
const getFavourites = httpsCallable(functions, "getFavourites");
function Searchjob() {
  const { search } = useLocation();
  const args = search.split(/[&?]+/).filter((x) => x != "");
  const [selected, setselected] = useState({});
  const [savedjobsid, setsavedjobsid] = useState([]);
  const [chng, setchng] = useState(false);
  const [showsavedjobs, setshowsavedjobs] = useState(false);
  const [loadingState, setLoadingState] = useState(true);
  const [jobs, setjobs] = useState([]);
  const [loadedjobs, setloadedjobs] = useState([]);
  const [filters, setfilters] = useState({});
  const { state } = useLocation();
  useEffect(() => {
    getFavourites().then((result) => {
      if (result.data.status == 1) {
        setsavedjobsid(Object.keys(result.data.desc));
      }
    });
  }, [chng]);
  useEffect(() => {
    if (jobs.length === 0) {
      searchJob().then((result) => {
        //console.log(result.data.result.desc);
        if (result.data.result.status == 1) {
          var arr = Object.values(result.data.result.desc);
          setloadedjobs(arr);
          if (args.length > 0 && args[0] == "saved") {
            getFavourites().then((result) => {
              if (result.data.status == 1) {
                saveditms(arr, Object.keys(result.data.desc));
              }
            });
          } else {
            setjobs(arr);
          }
          setLoadingState(false);
        } else {
          setLoadingState(false);
          alert("Something went Wrong");
          console.log(result.data.result.desc);
        }
      });
    }
  }, []);

  function saveditms(arr, svd) {
    setshowsavedjobs(!showsavedjobs);
    arr = arr.filter((x) => svd.includes(x.job_id));
    setjobs(arr);
  }

  function findfav() {
    var arr = jobs;
    if (!showsavedjobs) {
      arr = arr.filter((x) => savedjobsid.includes(x.job_id));
      setjobs(arr);
    } else {
      setjobs(loadedjobs);
    }
    setshowsavedjobs(!showsavedjobs);
  }
  async function jobResults(condition) {
    console.log(condition);
    if (selected?.joblevel) condition["level"] = selected?.joblevel;
    if (selected?.category) condition["category"] = selected?.category;
    if (selected?.jobtype) condition["jobtype"] = selected?.jobtype;
    if (selected?.jobduration) condition["jobduration"] = selected?.jobduration;

    searchJob(condition).then((result) => {
      //console.log(result.data.result.desc);
      if (result.data.result.status == 1) {
        var arr = Object.values(result.data.result.desc);
        setloadedjobs(arr);
        if (selected?.proposals) {
          arr = arr.filter((x) => {
            if (selected?.proposals != 4) {
              return (
                x?.bidc >= Number(selected?.proposals) * 5 &&
                x?.bidc <= (Number(selected?.proposals) + 1) * 5
              );
            } else {
              return x?.bidc >= Number(selected?.proposals) * 5;
            }
          });
        }
        if (showsavedjobs) {
          arr = arr.filter((x) => savedjobsid.includes(x.job_id));
        }

        //console.log(arr);
        setjobs(arr);
      } else {
        setjobs([]);
        console.log(result.data.result.desc);
      }
    });
  }
  function findjobResults() {
    const condition = {
      exp: document.getElementById("searchbar").value.toLowerCase(),
    };
    console.log("hhere");
    jobResults(condition);
  }

  return (
    <>
      <div className="d-flex flex-row align-items-start justify-content-start">
        <Search_sidebar
          setselected={setselected}
          selected={selected}
          search={findjobResults}
        />
        <div className="wrapper">
          <div className="inwrapper d-flex" style={{ width: "71.2vw" }}>
            <div className="d-flex search-jobs">
              <img
                style={{
                  width: "1.4rem",
                  marginRight: "1.5rem",
                  marginLeft: "1rem",
                  color: "#006872",
                }}
                src={require("../../../imges/searchicon.svg").default}
                alt=""
              />
              <input
                style={{
                  color: "000000B2",
                  border: "none",
                  margin: "0.5rem 0",
                  fontSize: "1.1rem",
                  height: "2rem",
                }}
                type="text"
                id="searchbar"
                placeholder="Search  jobs"
                onChange={findjobResults}
              />
            </div>
            <div
              className="d-flex search-jobs"
              onClick={() => {
                findfav();
              }}
              style={{
                width: "15vw",
                cursor: "pointer",
                justifyContent: "center",
                backgroundColor: showsavedjobs ? "#aea" : "#fff",
              }}
            >
              <img
                style={{
                  width: "1.4rem",
                  color: "#006872",
                }}
                src={require("../../../imges/heart.svg").default}
                alt=""
              />
              <button
                style={{
                  backgroundColor: showsavedjobs ? "#aea" : "#fff",
                  color: "#006872",
                  outline: "none",
                  border: "0",
                }}
              >
                Saved Jobs
              </button>
            </div>
          </div>
          {loadingState && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                width: "100%",
                height: "20vh",
                alignItems: "center",
              }}
            >
              <SpinnerDotted />
            </div>
          )}
          {!loadingState && (
            <Searchjob_body
              jobs={jobs}
              savedjobsid={savedjobsid}
              jobResults={jobResults}
              filters={filters}
              setfilters={setfilters}
              chng={chng}
              setchng={setchng}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default Searchjob;
