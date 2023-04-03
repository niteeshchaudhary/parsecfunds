import React from "react";
import walletico from "../imges/greenwallet.svg";
import swalletico from "../imges/swallet.svg";
import connectico from "../imges/connectico.svg";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Poplist(props) {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        padding: "1rem",
        backgroundColor: "#eaeaea",
        borderBottom: "0rem solid #ccc",
        borderRadius: "1rem",
        gap: "2%",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "23%",
          justifyContent: "center",
          backgroundColor: "#eaeaea",
          maxWidth: "13rem",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            backgroundColor: "#fff",
            width: "7rem",
            borderRadius: "50%",
            overflow: "hidden",
            padding: "2rem",
          }}
        >
          <img
            src={props.img}
            style={{
              height: "3rem",
              color: "#0f0",
            }}
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "65%",
          backgroundColor: "#eaeaea",
        }}
      >
        <h4>{props.head}</h4>
        <p>{props.data}</p>
        <p>{props.details}</p>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "0.4rem",
          width: "10%",
          backgroundColor: "#eaeaea",
        }}
      >
        <Button
          onClick={props.butfunc}
          variant="success"
          style={{
            height: "2.5rem",
            backgroundColor: "#006872",
            border: "1px solid #076834",
          }}
        >
          <h6 style={{ fontSize: "0.8rem" }}> {props.but}</h6>
        </Button>
        {props.but2 && (
          <Button
            onClick={props.but2func}
            variant="success"
            style={{
              height: "2.5rem",
              backgroundColor: "#006872",
              border: "1px solid #076834",
            }}
          >
            <h6 style={{ fontSize: "0.8rem" }}> {props.but2}</h6>
          </Button>
        )}
      </div>
    </div>
  );
}
export default function Popd(props) {
  const navigate = useNavigate();
  function toOffers() {
    navigate("/BuyConnects", { state: { profile: props.all } });
  }
  function toJobs() {
    navigate("/SearchJobs", { state: { profile: props.all } });
  }
  function toWithdraw() {
    props.setWithdraw(true);
    props.setAddWallet(false);
  }
  function toAdd() {
    props.setAddWallet(true);
    props.setWithdraw(false);
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#fff",
        padding: "0.5rem",
        borderRadius: "0.5rem",
        margin: "0",
        gap: "0.1rem",
      }}
    >
      <Poplist
        img={connectico}
        head={"Connects"}
        data={"Make your proposals and post jobs using connects"}
        details={"Available Connects : " + props.connects}
        but={"Get More"}
        butfunc={toOffers}
        key={1}
      />
      <Poplist
        img={walletico}
        head={"Wallet"}
        data={"Keep your money safe here."}
        details={"Current Amount : $" + props.available}
        but={"Add"}
        butfunc={toAdd}
        but2={"Withdraw"}
        but2func={toWithdraw}
        key={2}
      />
      <Poplist
        img={swalletico}
        head={"Shadow Wallet"}
        data={"Complete your Projects to finalize them into your wallet"}
        details={"Current Amount : $" + props.pending}
        but={"Find Jobs"}
        butfunc={toJobs}
        key={3}
      />
    </div>
  );
}
