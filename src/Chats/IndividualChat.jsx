import React, { useState, useEffect } from "react";
import app from "../firebase";
import { getAuth } from "firebase/auth";
import {
  getDatabase,
  ref,
  set,
  onValue,
  get,
  query,
  orderByChild,
} from "firebase/database";
import { useNavigate, useLocation } from "react-router-dom";
import { getFunctions, httpsCallable } from "firebase/functions";
import SenderMsg from "./SenderMsg";
import RecieverMsg from "./RecieverMsg";
import "./Chatbox.css";
import NormalMsg from "./NormalMsg";
// import { useList } from "react-firebase-hooks/database";

const functions = getFunctions(app, "asia-southeast2");
const sendMessage = httpsCallable(functions, "sendMessageRTB");
const getChatAddress = httpsCallable(functions, "getChatAddress");
const markMsgSeen = httpsCallable(functions, "markMsgSeen");

function IndividualChat({ auth, currentUser, setCurrentUser }) {
  //console.log(currentUser, "*&&&&&&&&&&&&&&");
  const db = getDatabase();
  const navigate = useNavigate();
  const tod = new Date();
  const friend = currentUser?.email || "";

  const today =
    tod.getUTCFullYear() +
    "-" +
    (tod.getUTCMonth() + 1) +
    "-" +
    tod.getUTCDate();
  const [curMsg, setCurMsg] = useState("");
  const [msgobj, setmsgobj] = useState({});
  const [msglist, setmsglist] = useState([]);
  const [msginp, setmsginp] = useState([]);
  const [check, setcheck] = useState(false);
  const [lastmsg, setlastmsg] = useState("");
  const [entered, setentered] = useState(false);
  const [chatAddress, setChatAddress] = useState("");
  // const [snap, loading, error] = useList(
  //   ref(db, `/chats/${chatAddress}/${today}`)
  // );

  // const getMessagedecrypt = httpsCallable(functions, "getMessagedecrypt");

  const voicehandler = (e) => {};
  const sendhandler = (e) => {
    var objDiv = document.getElementById("msgholder");
    const msg = curMsg;
    document.getElementById("chat-input").value = "";
    const obj = {
      message: msg,
    };
    setmsginp([...msginp, obj]);
    setTimeout(() => {
      objDiv.scrollTop = objDiv.scrollHeight;
    }, 150);
    console.log(1);
    sendMessage({
      toemail: friend,
      //toemail: "trupenofficial@gmail.com",
      message: msg,
    })
      .then((result) => {
        console.log(2);
        console.log(result);
        setcheck(!check);
      })
      .catch((err) => {
        console.log("err: ", err);
      });
    console.log(3);
  };

  useEffect(() => {
    getChatAddress({
      toemail: friend,
    }).then((result) => {
      console.log(result.data);
      if (result.data.status == 1) {
        setChatAddress(result.data.desc);
        console.log(result.data.desc);
      }
    });
  }, []);
  useEffect(() => {
    var objDiv = document.getElementById("msgholder");

    if (msglist.length == 0) {
      get(ref(db, `/chats/${chatAddress}/`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            var lst = [];
            var obj = {};
            snapshot.forEach((chld) => {
              if (chld.key.match(/^\d{4}-\d{1,2}-\d{1,2}$/)) {
                obj[chld.key] = chld.key;
                if (chld.hasChildren()) {
                  chld.forEach((msg) => {
                    //console.log("msg", msg.val());
                    lst.push(msg.val());
                    obj[msg.key] = msg.val();
                  });
                  // console.log("chld ", chld.key);
                  // console.log(lst);
                }
              }
            });

            setmsgobj((msgobj) => ({ ...msgobj, ...obj }));
            setmsginp([]);
            console.log("nkc", 5, lst);
            setmsglist(lst);

            objDiv.scrollTop = objDiv.scrollHeight;
          } else {
            console.log("No data available");
          }
        })
        .catch((error) => {
          console.error(error);
        });
      // onValue(starCountRef, (snapshot) => {

      // });
    }
    objDiv.scrollTop = objDiv.scrollHeight;
  }, [chatAddress]);

  useEffect(() => {
    var objDiv = document.getElementById("msgholder");
    const starCountRef = ref(db, `/chats/${chatAddress}/${today}`);
    var obj = {};
    onValue(starCountRef, (snapshot) => {
      console.log("nkc", snapshot.key);
      if (snapshot.key.match(/^\d{4}-\d{1,2}-\d{1,2}$/)) {
        snapshot.forEach((chld) => {
          //console.log("msg", msg.val());
          obj[chld.key] = chld.val();
        });
      }
      if (Object.values(obj).length != 0) {
        setmsgobj((msgobj) => ({ ...msgobj, ...obj }));
        setmsginp([]);
        objDiv.scrollTop = objDiv.scrollHeight;
      }
      if (chatAddress != "") {
        console.log(chatAddress);
        markMsgSeen({
          dc: chatAddress,
        }).then((result) => {
          console.log("###", result);
        });
      }
    });
  }, [check]);

  useEffect(() => {
    console.log("****");
    if (chatAddress != "" && !entered) {
      markMsgSeen({
        dc: chatAddress,
      }).then((result) => {
        console.log("###", result);
        setentered(true);
      });
    }
    console.log("****");
    //setmsglist(Object.values(msgobj));
    //console.log(msglist);
    // snap.forEach((data) => {
    //   console.log(data.toJSON());
    //   obj[data.key] = data.val();
    // });
  }, [chatAddress]);
  //console.log(msglist);

  return (
    <>
      <div>
        <div
          onClick={() => {
            setCurrentUser({ from: undefined });
          }}
          style={{ cursor: "pointer" }}
        >
          ⬅️Back{" "}
        </div>
        <div className="head-vc d-flex flex-row justify-content-between">
          <div className=" d-flex flex-row">
            &nbsp;&nbsp;&nbsp;&nbsp;
            <img
              style={{ width: "3rem", height: "3rem" }}
              src={currentUser?.pic}
              alt=""
            />
            <div style={{ margin: "0 1rem" }} className="details">
              <p
                style={{
                  color: "#303030",
                  fontWeight: "600",
                  fontSize: "1rem",
                  margin: "0",
                }}
              >
                {currentUser?.name}
              </p>
              <p
                style={{
                  color: "rgba(48, 48, 48,0.8)",
                  fontWeight: "300",
                  fontSize: "0.7rem",
                }}
              >
                {/* Online - Last seen, {new Date().toJSON()} */}
              </p>
            </div>
          </div>
          <div className="c-vc-dots d-flex flex-row justify-content-around">
            {/* <img
              style={{
                width: "1.1rem",
                marginRight: "2rem",
                cursor: "pointer",
              }}
              src={require("../imges/call.svg").default}
              alt=""
            />
            <img
              style={{
                width: "1.1rem",
                marginRight: "2rem",
                cursor: "pointer",
              }}
              src={require("../imges/videocall.svg").default}
              alt=""
            />
            <img
              style={{ width: "0.3rem" }}
              src={require("../imges/dots3.svg").default}
              alt=""
            /> */}
          </div>
        </div>

        <div
          className="Scroll"
          id="msgholder"
          style={{ height: "25rem", overflowY: "auto", overflowX: "hidden" }}
        >
          {Object.values(msgobj).map((ele, index) => {
            if (ele?.from == auth.currentUser.email) {
              return <SenderMsg props={ele} key={index} />;
            } else if (ele?.from == friend) {
              return <RecieverMsg props={ele} key={index} />;
            } else {
              return <NormalMsg props={ele} key={index} />;
            }
          })}
          {msginp.map((ele, index) => {
            return <SenderMsg props={ele} key={"inp" + index} />;
          })}
        </div>
        <div className="d-flex flex-row justify-content-start">
          <div className="chat-input-wrap">
            <img
              style={{
                width: "1rem",
                marginLeft: "1rem",
                marginRight: "1rem",
                cursor: "pointer",
              }}
              src={require("../imges/attachment.svg").default}
              alt=""
            />
            <input
              type="text"
              id="chat-input"
              onKeyUp={(e) => {
                if (e.key == "Enter") {
                  sendhandler(e);
                } else {
                  setCurMsg(e.currentTarget.value);
                }
              }}
              placeholder="Type your message here..."
            />
            <img
              style={{ width: "1rem", marginRight: "1rem", cursor: "pointer" }}
              src={require("../imges/emoji-laugh.svg").default}
              alt=""
            />
            <img
              style={{ width: "1rem", marginRight: "1rem", cursor: "pointer" }}
              src={require("../imges/camera.svg").default}
              alt=""
            />
          </div>
          <div
            className="mic"
            style={{ width: "3rem", height: "3rem", cursor: "pointer" }}
          >
            <img
              style={curMsg == "" ? { width: "1rem" } : { width: "1.8rem" }}
              onClick={
                curMsg == "" ? (e) => voicehandler(e) : (e) => sendhandler(e)
              }
              src={
                curMsg == ""
                  ? require("../imges/mic.svg").default
                  : require("../imges/SendMsgIcon.svg").default
              }
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default IndividualChat;

// // useEffect(() => {
// //   var objDiv = document.getElementById("msgholder");
// //   getMessages({
// //     from: "trupenofficial@gmail.com",
// //     to: "nkchaudhary00@gmail.com",
// //   })
// //     .then((result) => {
// //       console.log(result);
// //       if (result.data.status == "1") {
// //         setmsglist(result.data.result);
// //         setmsginp([]);
// //       }
// //       objDiv.scrollTop = objDiv.scrollHeight;
// //     })
// //     .catch((err) => {
// //       console.log("err: ", err);
// //     });
// //   console.log("it was here");
// // }, []);

// useEffect(() => {
//   var objDiv = document.getElementById("msgholder");
//   const fromemail = auth?.currentUser?.email;
//   const toemail = "trupenofficial@gmail.com";
//   if (lastmsg === "") {
//     var objDiv = document.getElementById("msgholder");
//     const q = query(
//       collection(
//         db,
//         "chats",
//         "nkchaudhary00@gmail.com,trupenofficial@gmail.com",
//         "2022-07-10"
//       ),
//       orderBy("time", "desc")
//     );
//     onSnapshot(q, (querySnapshot) => {
//       querySnapshot.forEach(async (doc) => {
//         // console.log(doc);
//         console.log("here777777");
//         if (lastmsg != doc.id) {
//           // await getMessagedecrypt(doc.data())
//           //   .then((result) => {
//           //     if (result.data.result.status == "1") {
//           console.log(doc.data());

//           objDiv.scrollTop = objDiv.scrollHeight;
//           // })
//           // .catch((err) => {
//           //   console.log("err: ", err);
//           // });
//         }
//       });
//     });
//     // getMessages({
//     //   from: "trupenofficial@gmail.com",
//     //   to: "nkchaudhary00@gmail.com",
//     // })
//     //   .then((result) => {
//     //     console.log(result);
//     //     if (result.data.status == "1") {
//     //       setmsglist(result.data.result);
//     //       setlastmsg("abcd");
//     //       setmsginp([]);
//     //     }
//     //     objDiv.scrollTop = objDiv.scrollHeight;
//     //   })
//     //   .catch((err) => {
//     //     console.log("err: ", err);
//     //   });
//   } else {
//     if (fromemail && toemail) {
//       var dc = "";
//       if (fromemail < toemail) {
//         dc = fromemail + "," + toemail;
//       } else {
//         dc = toemail + "," + fromemail;
//       }
//       console.log(dc);

//       const q = query(
//         collection(
//           db,
//           "chats",
//           "nkchaudhary00@gmail.com,trupenofficial@gmail.com",
//           "chat"
//         ),
//         orderBy("time", "desc"),
//         limit(1)
//       );
//       onSnapshot(q, (querySnapshot) => {
//         querySnapshot.forEach(async (doc) => {
//           // console.log(doc);
//           console.log("here777777");
//           if (lastmsg != doc.id) {
//             // await getMessagedecrypt(doc.data())
//             //   .then((result) => {
//             //     if (result.data.result.status == "1") {
//             console.log(doc.data());

//             objDiv.scrollTop = objDiv.scrollHeight;
//             // })
//             // .catch((err) => {
//             //   console.log("err: ", err);
//             // });
//           }
//         });
//       });
//     }
//     // const querySnapshot = onSnapshot(doc(db, "chats", dc, "chat", "*"));
//     // console.log(querySnapshot);
//     // querySnapshot.forEach((doc) => {
//     //   console.log(doc.id, " => ", doc.data());
//     // });
//   }

//   // const data = {};
// },[]);

// // useEffect(() => {
// //   setTimeout(() => {
// //     setcheck(!check);
// //   }, 2000);
// // });
