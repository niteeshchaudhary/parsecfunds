import React, { useState, useEffect } from "react";
import app, { auth } from "../../firebase";
import { SpinnerDotted } from "spinners-react";
import {
  collection,
  addDoc,
  doc,
  getDoc,
  getFirestore,
} from "firebase/firestore";
import { getFunctions, httpsCallable } from "firebase/functions";
import { useUserAuth } from "../../context/UserAuthContext";
import NotificationEle from "./NotificationEle";
import { NavLink } from "react-router-dom";
const functions = getFunctions(app, "asia-southeast2");
const getUserProfile = httpsCallable(functions, "getUserProfile");

export default function Navbar(props) {
  const { user } = useUserAuth();
  const [loadingState, setLoadingState] = useState(true);
  const [notice, setNotice] = useState(false);
  const [nname, setnname] = useState(props?.name || "");
  const [npic, setnpic] = useState(props?.pic || "");
  const [nrole, setnrole] = useState(props?.role || "");
  const [notif, setNotif] = useState([]);
  const [neew, setNeew] = useState(false);
  const fdb = getFirestore(app);

  const style = {
    tabs: {
      cursor: "pointer",
      padding: "0.5rem 0.5rem",
    },
  };

  useEffect(() => {
    if (!props?.name && !props?.pic) {
      // console.log(result.data);
      if (user?.profile) {
        setnname(user?.profile?.name);
        setnpic(user?.profile?.pic);
        setnrole(user?.profile?.role);
        setLoadingState(false);
      }
    } else if (props?.name || props?.pic) {
      setnname(props?.name);
      setnpic(props?.pic);
      setnrole(props?.role ? props?.role : "");
      setLoadingState(false);
    } else {
      setLoadingState(false);
    }
  }, [user]);

  useEffect(() => {
    console.log("hel");
    if (neew == false) {
      const notifloader = async () => {
        console.log("lo");
        try {
          const querySnapshot = await getDoc(
            doc(fdb, "Notifications/" + auth.currentUser.uid)
          );

          setNotif(Object.values(querySnapshot.data()));
          if (
            Object.values(querySnapshot.data()).filter((x) => x.status == "new")
              .length > 0
          ) {
            setNeew(true);
          }
        } catch (e) {
          //notifloader();
        }
      };
      notifloader();
    }
  });

  return (
    <div
      style={{
        display: "flex",
        backgroundColor: "#f8f9fa",
        height: "5rem",
        width: "100%",
        padding: "1rem 4rem",
        borderBottom: "0.1rem solid rgba(10, 10, 10, 0.2)",
      }}
    >
      <div>
        <img
          alt=""
          src={require("../../imges/logo.svg").default}
          style={{ width: "7.5rem", marginTop: "0.5rem" }}
          className="d-inline-block align-center"
        />{" "}
      </div>
      <div style={{ width: "55%" }}></div>
      <div style={{ width: "35rem" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <NavLink
            to={
              user?.profile?.role == "Freelancer"
                ? "/dashboard"
                : user?.profile?.role == "Employer"
                ? "/Edashboard"
                : "/"
            }
            style={style.tabs}
          >
            Dashboard
          </NavLink>
          {user?.profile?.role == "Freelancer" ? (
            <NavLink to="/SearchJobs" style={style.tabs}>
              Browse Jobs
            </NavLink>
          ) : user?.profile?.role == "Employer" ? (
            <NavLink to="/PostJob" style={style.tabs}>
              Post Job
            </NavLink>
          ) : (
            ""
          )}
          {user?.profile?.role == "Freelancer" && (
            <NavLink to="/LatestProposal" style={style.tabs}>
              My Proposals
            </NavLink>
          )}
          {user?.profile?.role == "Employer" && (
            <NavLink to="#" style={style.tabs}>
              View Freelancers
            </NavLink>
          )}
          <img
            onClick={() => {
              if (notice == false) {
                setNotice(true);
                setNeew(false);
              } else {
                setNotice(false);
              }
            }}
            style={{
              width: "1.5rem",
              marginRight: "1rem",
              cursor: "pointer",
            }}
            src={
              neew
                ? require("../../imges/notify.svg").default
                : require("../../imges/notif.svg").default
            }
          />
          {notice && (
            <div
              style={{
                position: "absolute",
                top: "4.5rem",
                right: "17rem",
                background: "#FFFFFF",
                boxShadow: " 0rem 0.25rem 0.25rem rgba(0, 0, 0, 0.25)",
                fontSize: "1rem",
                zIndex: "2",
                margin: "1.5rem",
                borderRadius: "0.8rem",
                overflowY: "scroll",
                width: "20vw",
                maxHeight: "20rem",
                padding: "1rem",
                fontWeight: "normal",
                width: "20vw",
                margin: "auto",
              }}
            >
              {notif.map((note, index) => (
                <NotificationEle
                  key={index}
                  status={note.status}
                  additional={note.additional}
                  link={note?.link}
                  image={note.image}
                  title={note.title}
                  details={note.details}
                />
              ))}
            </div>
          )}
          <div>
            <div style={{ display: "flex" }}>
              <img
                src={
                  props?.pic
                    ? props?.pic
                    : npic
                    ? npic
                    : "https://cdn-icons-png.flaticon.com/512/147/147142.png"
                }
                style={{
                  width: "3.2rem",
                  height: "3.2rem",
                  borderRadius: "50%",
                }}
              />
              {loadingState ? (
                <SpinnerDotted size={"2rem"} />
              ) : (
                <div
                  style={{
                    marginLeft: "10px",
                    justifyContent: "center",
                    paddingTop: "0.5rem",
                  }}
                >
                  <h5 style={{ fontSize: "1rem" }}>
                    {props?.name
                      ? props?.name.split(" ")[0]
                      : nname
                      ? nname.split(" ")[0]
                      : "Mr. X"}
                  </h5>
                  <h6 style={{ fontSize: "0.8rem", marginTop: "-0.2rem" }}>
                    {props?.role ? props?.role : nrole || " "}
                  </h6>
                </div>
              )}
              {/* <p style={{ marginBottom: "1px", marginLeft: "10px" }}>
              {props.name ? props.name.slice(0, props.name.search(" ")) : ""}
              <br />
              {props.role ? props.role : ""}
            </p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
