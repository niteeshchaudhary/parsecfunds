import React, { useEffect, useState } from "react";
import "./ebody.css";
import { NavLink } from "react-router-dom";
import Popup from "../../../Offers/PopUp";
import Popd from "../../../Offers/Popd";
import AddWallet from "../../../Offers/AddWallet";
import Withdrawal from "../../../Offers/Withdrawal";
import { useNavigate, useLocation } from "react-router-dom";
// import pen from '../../imges/pen.svg'
function Ebody(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [withdraw, setWithdraw] = useState(false);
  const [addWallet, setAddWallet] = useState(false);
  const navigate = useNavigate();
  const togglePopup = async () => {
    setWithdraw(false);
    setAddWallet(false);
    setIsOpen(!isOpen);
  };

  function gotoChats() {
    navigate("/chats", { state: { profile: props } });
  }
  function gotoJobs() {
    navigate("/Postedjob", { state: { profile: props } });
  }

  return (
    <>
      <div className="wrap-left">
        <div className="container ">
          {/* <div className="boxcust">
            <div className="minboxcust"></div>
            <h5 className="mt-2 mb-3">New messages</h5>
            <p style={{ color: "#006872" }}>Click to view</p>
          </div>
          <div className="boxcust">
            <div className="minboxcust"></div>
            <h5 className="mt-2 mb-3">Latest proposals</h5>
            <p style={{ color: "#006872" }}>Click to view</p>
          </div> */}
          <div className="boxcust  ">
            <h3 className="mt-3 mb-3"> Welcome, {props.name}</h3>
            <h6>{new Date().toLocaleString()}</h6>
          </div>
          {/* <div className="boxcust">
            <div className="minboxcust"></div>
            <h5 className="mt-2 mb-3">Check package expiry</h5>
            <p style={{ color: "#006872" }}>Upgrade | See all plans</p>
          </div> */}

          {/* <div className="boxcust">
          <h3 className="mt-3 mb-3"> Welcome, Rohan</h3>
          <h6>Thursday, 5th May</h6>
          </div> */}
          <div className="boxcust boxcust-m p-4">
            {/* <div className="minboxcust"></div> */}
            <h5 className="mt-3 mb-3">Check package expiry</h5>
            <p style={{ color: "#006872" }}>Upgrade | See all plans</p>
          </div>

          <div className="boxcust boxcust-l">
            <h5 className="mt-3 mb-3"> Services</h5>
            {/* <h6>Thursday, 5th May</h6> */}
            <div className="row m-3 d-flex justify-center circle_3">
              <div className="row-item m-4 outline-yellow outline-yellow-align  ">
                <h5>{props.Completed}</h5>
                <p>Completed</p>
              </div>
              <div className="row-item m-4 outline-yellow-align outline-yellow  outline-yellow-half">
                <h5>{props.Ongoing}</h5>
                <p>Ongoing</p>
              </div>
              <div className="row-item m-4 outline-yellow-align outline-yellow outline-yellow-fade">
                <h5>{props.Cancelled}</h5>
                <p>Cancelled</p>
              </div>
            </div>
          </div>
          {/* <div className="boxcust">
            <div className="minboxcust"></div>
            <h5 className="mt-2 mb-3">Check package expiry</h5>
            <p style={{ color: "#006872" }}>Upgrade | See all plans</p>
          </div> */}

          <div className="boxcust boxcust-l">
            <div className=" posting-wrap ">
              <h5 className="mt-3 mb-3"> Your postings</h5>
              <h5
                className="mt-3 mb-3 "
                style={{ color: "#006872", cursor: "pointer" }}
                onClick={() => navigate("/Postedjob")}
              >
                See all postings
              </h5>
            </div>
            <div className="m-5 text-center  ">
              <img
                style={{ width: "3rem" }}
                src={require("../../../imges/notepad.svg").default}
              />
              <p className=""> No active job post</p>
              <NavLink to="/Postjob">
                <button className="postbut1 mt-4" type="submit">
                  Post a job
                </button>
              </NavLink>
            </div>
            {/* <h6>Thursday, 5th May</h6> */}
          </div>

          <div className="boxcust boxcust-l mb-2">
            <h5 className="mt-3 mb-3"> Past Earnings</h5>
            <div className="m-3 text-center earning-img">
              <img
                style={{ width: "3rem" }}
                src={require("../../../imges/earnings.svg").default}
              />
              {/* <h6>Thursday, 5th May</h6> */}
            </div>
          </div>
          {/* <div className="row">
          <div className="boxcust">
            <div className="minboxcust">0</div>
            <h5 className="mt-2 mb-3">View saved items</h5>
          </div>
          <div className="boxcust">
            <div className="minboxcust">0</div>
            <h5 className="mt-2 mb-3">Pending balance</h5>
          </div>
          <div className="boxcust">
            <div className="minboxcust">0</div>
            <h5 className="mt-2 mb-3">Available balance</h5>
          </div>
        </div>
        <div className="row">
          <div className="boxcust">
            <div className="minboxcust">0</div>
            <h5 className="mt-2 mb-3">Total completed services</h5>
          </div>
          <div className="boxcust">
            <div className="minboxcust">0</div>
            <h5 className="mt-2 mb-3">Total cancelled services</h5>
          </div>
          <div className="boxcust">
            <div className="minboxcust">0</div>
            <h5 className="mt-2 mb-3">Total ongoing services</h5>
          </div>
        </div>
        <div className="row">
          <div className="boxcust">
            <div className="minboxcust">0</div>
            <h5 className="mt-2 mb-3">Total completed services</h5>
          </div>
          <div className="boxcust">
            <div className="minboxcust">0</div>
            <h5 className="mt-2 mb-3">Total cancelled services</h5>
          </div>
          <div className="boxcust">
            <div className="minboxcust">0</div>
            <h5 className="mt-2 mb-3">Total sold services</h5>
          </div>
        </div>

        <h5 style={{marginLeft: "70px"}} className="mt-5">Ongoing Projects</h5>
        <div className="boxcust1"></div>
        <h5 style={{marginLeft: "70px"}} className="mt-5">Past Earnings</h5>
        <div className="boxcust1"></div> */}
        </div>
        <div className="wrapped">
          <div className="boxcust boxcust-m">
            {/* <div className="minboxcust">0</div> */}

            <div className="d-flex flex-column">
              <div className="d-flex post-talent-project">
                <img
                  style={{ width: "1.8rem" }}
                  src={require("../../../imges/post.svg").default}
                  alt=""
                />
                <a style={{ color: "black", fontWeight: "bold" }} href="/">
                  Edit your Post
                </a>
              </div>
              <div className="d-flex post-talent-project">
                <img
                  style={{ width: "1.5rem" }}
                  src={require("../../../imges/explore.svg").default}
                  alt=""
                />
                <a style={{ color: "black", fontWeight: "bold" }} href="/">
                  Explore more talent
                </a>
              </div>
              <div className="d-flex post-talent-project">
                <img
                  style={{ width: "1.5rem" }}
                  src={require("../../../imges/exp_project.svg").default}
                  alt=""
                />
                <a style={{ color: "black", fontWeight: "bold" }} href="/">
                  Explore projects
                </a>
              </div>
            </div>
          </div>
          {/* right column  */}

          <div className="boxcust boxcust-s ">
            {/* <div className="minboxcust">0</div> */}
            <div className="n-msg" onClick={gotoChats}>
              <h5 className="mt-2 ">Messages</h5>
              <img
                style={{ width: "1.5rem", marginRight: "1rem" }}
                src={require("../../../imges/msg.svg").default}
              />
            </div>
            <a style={{ color: "#006872" }} href="" onClick={gotoChats}>
              Click to view
            </a>
          </div>

          <div className="boxcust boxcust-m">
            {/* <div className="minboxcust">0</div> */}
            <h5 className="mt-2 mb-3">Latest proposals</h5>

            <div
              style={{ color: "#006872", cursor: "pointer" }}
              onClick={gotoJobs}
            >
              {" "}
              Click to view
            </div>
            <p>See all your posted Jobs and Proposala on them</p>
          </div>

          <div className="boxcust boxcust-project">
            {/* <div className="minboxcust">0</div> */}
            <h5 className="mt-2 mb-3">Balance</h5>
            <div
              className="outline-blue outline-blue-thick"
              style={{ cursor: "pointer" }}
              onClick={async () => {
                togglePopup();
              }}
            >
              <div className="outline-yellow outline-yellow-heightls">
                <img src={require("../../../imges/wallet.svg").default} />
              </div>
            </div>
            <div className="ab-flex">
              <div className="checkbox-blue"></div>
              <p>Available Connects - {props.connects}</p>
            </div>
            <div className="ab-flex">
              <div className="checkbox-blue"></div>
              <p>Available Balance - ${props.Available}</p>
            </div>
            <div className="ab-flex m-bottom">
              <div className="checkbox-yellow"></div>
              <p>Pending Balance - ${props.Pending}</p>
            </div>
          </div>

          <div className="boxcust boxcust-project ">
            {/* <div className="minboxcust">0</div> */}
            <h5 className="mt-2 mb-5">Completed Projects</h5>
            <div className="outline-blue m-bottom">
              <h4>{props.Completed}</h4>
            </div>
          </div>
        </div>
      </div>
      {isOpen && (
        <Popup
          left={withdraw ? "65%" : addWallet ? "60%" : "80%"}
          content={
            <>
              {!withdraw && !addWallet && (
                <Popd
                  connects={props.connects}
                  available={props.Available}
                  pending={props.Pending}
                  all={props}
                  setWithdraw={setWithdraw}
                  setAddWallet={setAddWallet}
                />
              )}
              {!withdraw && addWallet && (
                <AddWallet
                  connects={props.connects}
                  available={props.Available}
                  pending={props.Pending}
                  all={props}
                  handleClose={togglePopup}
                />
              )}
              {withdraw && !addWallet && (
                <Withdrawal
                  connects={props.connects}
                  available={props.Available}
                  pending={props.Pending}
                  all={props}
                  handleClose={togglePopup}
                />
              )}
            </>
          }
          handleClose={togglePopup}
        />
      )}
    </>
  );
}

export default Ebody;
