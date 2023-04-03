import React, { useEffect, useState } from "react";
import {
  ref,
  getDatabase,
  onValue,
  query,
  limitToLast,
  orderByKey,
  push,
} from "firebase/database";
import SenderMsg from "./SenderMsg";
import RecieverMsg from "./RecieverMsg";
import { auth } from "../firebase";
// import { useCollectionData } from "react-firebase-hooks/firestore";

var db = getDatabase();
var dbc = ref(db, "chatMessages");

export default function ChatBoard(props) {
  const [curMsg, setCurMsg] = useState("");
  const [msglist, setmsglist] = useState([]);
  const [lastmsg, setlastmsg] = useState("");
  const [msginp, setmsginp] = useState([]);
  //const [snapshots, loading, error] = useList(ref(database, "chatMessages"));
  // const [msglist] = useState(snapshots);
  useEffect(() => {
    var objDiv = document.getElementById("msgholder");
    objDiv.scrollTop = objDiv.scrollHeight;
    console.log(5, "*");
    if (lastmsg === "") {
      const qry = query(dbc, orderByKey());
      onValue(qry, (result) => {
        const lst = Object.values(result.toJSON());
        if (
          (msglist.length == 0 && lst.length != 0) ||
          msglist.length != lst.length
        ) {
          setlastmsg(Object.keys(result.toJSON())[lst.length - 1]);
          setmsglist(lst);
        }
        //var karr = Object.keys(result.toJSON());
        //setlastmsg(karr[karr.length - 1]);
      });
    } else {
      const qry = query(dbc, orderByKey(), limitToLast(1));
      onValue(qry, (result) => {
        const lst = Object.values(result.toJSON());
        const lstkey = Object.keys(result.toJSON())[lst.length - 1];
        if (lastmsg != lstkey) {
          setlastmsg(lstkey);
          setmsglist([...msglist, ...lst]);
        }
        //var karr = Object.keys(result.toJSON());
        //setlastmsg(karr[karr.length - 1]);
      });
    }
  });
  async function sendMsg(e) {
    if (e.key === "Enter") {
      await push(ref("chatMessages"), {
        text: e.currentTarget.value,
        msgType: "text",
        sendTo: props.user.email,
        sendFrom: auth?.currentUser?.email,
        dateTime: new Date().toLocaleString(),
        secName: auth?.currentUser?.uid,
        username: auth?.currentUser?.displayName,
      })
        .then((result) => {
          e.target.value = "";
          var objDiv = document.getElementById("msgholder");
          objDiv.scrollTop = objDiv.scrollHeight;
          // //console.log("^", lastmsg);
          // return dbc.once("value");
        })
        .then((snapshot) => {
          // var data = snapshot.val();
          // //setlastmsg(Object.keys(data)[0]);
          // console.log("&", ...Object.values(data));
          // setmsglist([...Object.values(data)]);
          // dbc
          //   .orderByKey()
          //   .startAfter(lastmsg)
          //   .on("value", (value) => {
          //     setlastmsg(Object.keys(value.val())[0]);
          //     setmsglist((msglist) => [...msglist, ...Object.values(value.val())]);
          //   });
        });
    }
  }
  const voicehandler = (e) => {};
  // ref.set({ name: "Ada", age: 36 })
  // .then(function() {
  //  return ref.once("value");
  // })
  // .then(function(snapshot) {
  //   var data = snapshot.val();
  //   // data is { "name": "Ada", "age": 36 }
  //   // data.name === "Ada"
  //   // data.age === 36
  // });
  // setTimeout(() => {
  //   dbc
  //     .orderByKey()
  //     .startAfter(lastmsg)
  //     .on("value", (value) => {
  //       if (value.val()) {
  //         setlastmsg(Object.keys(value.val())[0]);
  //         setmsglist((msglist) => [...msglist, Object.values(value.val())]);
  //       }
  //     });
  // }, 5000);
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

    // sendMessage({
    //   // toemail: "nkchaudhary00@gmail.com",
    //   toemail: "trupenofficial@gmail.com",
    //   message: msg,
    // })
    //   .then((result) => {
    //     console.log(result);
    //     setcheck(!check);
    //   })
    //   .catch((err) => {
    //     console.log("err: ", err);
    //   });
  };

  function fetching(data, index) {
    var chat = data;
    // var chat = data.val();
    if (
      chat.sendFrom == auth?.currentUser?.email &&
      chat.sendTo == props.user.email
    ) {
      return <RecieverMsg msg={chat.text} key={index} />;
    } else if (
      chat.sendTo == auth?.currentUser?.email &&
      chat.sendFrom == props.user.email
    ) {
      var msg = chat.msg;
      var msgType = chat.msgType;
      var dateTime = chat.dateTime.split(",");
      return <SenderMsg msg={chat.text} key={index} />;
    }
  }

  return (
    <>
      <div>
        <div className="head-vc d-flex flex-row justify-content-between">
          <div className=" d-flex flex-row">
            <img
              style={{ width: "3rem" }}
              src={require("../imges/dummyprofile.svg").default}
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
                Dori Doreau
              </p>
              <p
                style={{
                  color: "rgba(48, 48, 48,0.8)",
                  fontWeight: "300",
                  fontSize: "0.7rem",
                }}
              >
                Online - Last seen, {new Date().toJSON()}
              </p>
            </div>
          </div>
          <div className="c-vc-dots d-flex flex-row justify-content-around">
            <img
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
            />
          </div>
        </div>

        <div
          className="messages"
          id="msgholder"
          style={{ height: "30rem", overflowY: "scroll" }}
        >
          {msglist.map((ele, index) => {
            if (ele.from == auth.currentUser.email) {
              return <SenderMsg props={ele} key={index} />;
            } else {
              return <RecieverMsg props={ele} key={index} />;
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
