import React, { useState } from "react";
import "./Personal.css";

function Personal(props) {
  const [name, setname] = useState("");
  const [sex, setsex] = useState("");
  const [id, setid] = useState("");
  const [haddress, sethaddress] = useState("");
  const [date, setdate] = useState("");
  // const [month, setmonth] = useState("");
  // const [year, setyear] = useState("");
  const [pic, setpic] = useState("");

  function namehandler(e) {
    setname(e.target.value);
  }
  function sexhandler(e) {
    setsex(e.target.value);
  }
  function idhandler(e) {
    console.log(e.target.value);
    setid(e.target.value);
  }
  function haddresshandler(e) {
    sethaddress(e.target.value);
  }
  function datehandler(e) {
    console.log(e.target.value);
    setdate(e.target.value);
  }
  // function monthhandler(e) {
  //   setmonth(e.target.value);
  // }
  // function yearhandler(e) {
  //   setyear(e.target.value);
  // }
  function pichandler(e) {
    // if (e.target.files[0]) {
    //   setpic(e.target.files[0]);
    // }
    var reader = new FileReader();
    reader.addEventListener(
      "load",
      function () {
        setpic(reader.result);
      },
      false
    );
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  function submhandler(e) {
    e.preventDefault();
    props.fun1();
    props.getname(name);
    props.getid(id);
    props.gethaddress(haddress);
    props.getsex(sex);
    props.getpic(pic);
    props.getbirth(date);
  }

  return (
    <>
      <div className="mb-4 prof1">
        <img
          className="avatar"
          itemType="file"
          src={pic ? pic : "noimg.png"}
          style={{ borderRadius: "10px" }}
        />
        <div className="inputelem">
          {/* <input className="inp1 mb-3" type="file" onChange={pichandler} /> */}
          {/* <button className="but1">Upload file</button> */}
          <label class="custom-file-upload">
            <input type="file" onChange={pichandler} />
            Upload file
          </label>
        </div>
      </div>

      <form onSubmit={submhandler}>
        <div class="mb-4 cus">
          <input
            type="text"
            class="form-control2"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Full name"
            style={{ width: "40vw", paddingLeft: "0px" }}
            onChange={namehandler}
          />
        </div>
        {/* <div class="mb-4 cus">
          <input
            type="text"
            class="form-control2"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Gender"
            style={{ width: "40vw", paddingLeft: "0px" }}
            onChange={sexhandler}
          />
        </div> */}
        <div class="mb-3">
          <div
            className="mb-3"
            style={{
              borderBottom: "1px solid black",
              color: "#000000",
              opacity: "50%",
            }}
          >
            Gender
          </div>
          <input
            type="radio"
            id="html"
            name="fav_language"
            value="Male"
            onClick={sexhandler}
          />
          <label
            class="form-check-label"
            for="html"
            style={{ marginLeft: "5px", color: "#000000", opacity: "50%" }}
          >
            Male
          </label>
          <input
            style={{ marginLeft: "20px" }}
            type="radio"
            id="html2"
            name="fav_language"
            value="Female"
            onClick={sexhandler}
          />
          <label
            class="form-check-label"
            for="html2"
            style={{ marginLeft: "5px", color: "#000000", opacity: "50%" }}
          >
            Female
          </label>
          <input
            style={{ marginLeft: "20px" }}
            type="radio"
            id="html3"
            name="fav_language"
            value="Others"
            onClick={sexhandler}
          />
          <label
            class="form-check-label"
            for="html3"
            style={{ marginLeft: "5px", color: "#000000", opacity: "50%" }}
          >
            Others
          </label>
        </div>
        <div class="mb-4">
          <label className="mb-3" style={{ color: "#000000", opacity: "50%" }}>
            Date of birth
          </label>
          <div className="dat">
            <input
              type="date"
              style={{ width: "40vw" }}
              onChange={datehandler}
              // value="dd/mm/yyyy"
              placeholder="dd/mm/yyyy"
              min="1950-01-01"
              max="2022-12-31"
            />
          </div>

          {/* <div className="dat">
            <label
              for="exampleInputEmail5"
              class="form-label"
              style={{ color: "#000000", opacity: "40%" }}
            >
              Day
            </label>
            <input
              type="text"
              class="form-control"
              id="exampleInputEmail5"
              aria-describedby="emailHelp"
              style={{
                width: "60px",
                height: "25px",
                marginLeft: "10px",
                border: "1px solid grey",
                borderRadius: "10px",
              }}
              onChange={dayhandler}
            />
            <label
              for="exampleInputEmai"
              class="form-label"
              style={{ marginLeft: "20px", color: "#000000", opacity: "40%" }}
            >
              Month
            </label>
            <input
              type="text"
              class="form-control"
              id="exampleInputEmai"
              aria-describedby="emailHelp"
              style={{
                width: "60px",
                height: "25px",
                marginLeft: "10px",
                border: "1px solid grey",
                borderRadius: "10px",
              }}
              onChange={monthhandler}
            />
            <label
              for="exampleInputEmai2"
              class="form-label"
              style={{ marginLeft: "20px", color: "#000000", opacity: "40%" }}
            >
              Year
            </label>
            <input
              type="text"
              class="form-control"
              id="exampleInputEmai2"
              aria-describedby="emailHelp"
              style={{
                width: "60px",
                height: "25px",
                marginLeft: "10px",
                border: "1px solid grey",
                borderRadius: "10px",
              }}
              onChange={yearhandler}
            />
          </div> */}
        </div>
        <div class="mb-4 cus">
          {/* <input
            type="text"
            class="form-control2"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="ID proof"
            style={{ width: "40vw", paddingLeft: "0px" }}
            onChange={idhandler}
          /> */}
          {/* <label for="cars">ID proof</label>
          <select id="cars" name="cars" placeholder="id proof">
            <option value="volvo">Aadhar Card</option>
            <option value="saab">Pan Card</option>
            <option value="fiat">Driving License</option>
            
          </select> */}
          <datalist id="mylist">
            <option value="Aadhar Card" />
            <option value="Pan Card" />
            <option value="Driving License" />
          </datalist>
          <input type="search" list="mylist" style={{width: "40vw"}} placeholder="ID Proof" onChange={idhandler}></input>
        </div>
        <div class="mb-5 cus">
          <input
            type="text"
            class="form-control2"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Address"
            style={{ width: "40vw", paddingLeft: "0px" }}
            onChange={haddresshandler}
          />
        </div>

        <button
          type="submit"
          class="btn btn-primary"
          style={{
            width: "18vw",
            borderRadius: "5px",
            backgroundColor: "#006872",
            border: "0px",
          }}
        >
          Next
        </button>
      </form>
    </>
  );
}

export default Personal;
