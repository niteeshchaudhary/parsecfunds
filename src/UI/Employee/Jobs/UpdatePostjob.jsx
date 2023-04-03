import React, { useState, useEffect } from "react";
import dollar from "../../../imges/dollar.svg";
import { BiChevronDown } from "react-icons/bi";
import { SpinnerDotted } from "spinners-react";
import "../Jobs/Postjob.css";
import app, { db } from "../../../firebase";
import { useNavigate, useLocation } from "react-router-dom";
import { getFunctions, httpsCallable } from "firebase/functions";
import { storage, auth } from "../../../firebase";
import { ref, getDatabase } from "firebase/database";
import { useList } from "react-firebase-hooks/database";

import SuggestChips from "./SuggestChips";
import Popup from "../../../Offers/PopUpProcess";
import Popd from "../../../Offers/Popd";
const functions = getFunctions(app, "asia-southeast2");
const updatePostJob = httpsCallable(functions, "updatePostJob");

const database = getDatabase();
function Postjob() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const profile = state?.profile;
  const job = state?.job;
  console.log(state);
  const [loadingState, setLoadingState] = useState(false);
  const [jobcat, jobloading, joberror] = useList(ref(database, "job"));
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
  const [error, setError] = useState(false);
  const [skills, setSkills] = useState(job.skill_required);
  const [languages, setLanguages] = useState(job.languages);
  const [filename, setfilename] = useState(job.file_name);
  const [progress, setProgress] = useState(0);
  const [ques, setQues] = useState(job.screeningq);
  const initialValues = job;
  if (job.job_type == "hourly") {
    initialValues["min"] = job.budget.split("-")[0] || "";
    initialValues["max"] = job.budget.split("-")[0] || "";
  } else {
    initialValues["fixed"] = job.budget || "";
  }
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [fixed, setfixed] = useState(job.job_type == "fixed");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const handleSubmit = () => {
    // e.preventDefault();
    console.log(formValues);
    setFormErrors(validate(formValues));
    // =>
  };
  const togglePopup = async () => {
    setIsOpen(!isOpen);
  };
  useEffect(
    () => {
      document.getElementById("job_duration").value = job.duration;
      document.getElementById("project_level").value = job.level;
      document.getElementById("job_category").value = job.job_category;
      document.getElementById("yearexperience").value = job.experience;
    },
    [yoe],
    [jobcat],
    [jobduration],
    [projectlevel]
  );
  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);
  const validate = (values) => {
    const errors = {};
    console.log("^", values);
    var word_length = values.title.trim().split(/[\s]+/).length;
    var word_length_role = values.role.trim().split(/[\s]+/).length;
    var word_length_job_detail = values.details.trim().split(/[\s]+/).length;
    const regex_num = /^[-+]?[0-9]*[1-9][0-9]*$/i;

    const regex_spec = /^[a-zA-Z0-9_,-.\n'" ]*$/i;
    const regex = /^[a-zA-Z0-9_ ]*$/i;
    const regexq = /^[a-zA-Z0-9_? ]*$/i;
    const regex_alphabet = /^[a-zA-Z ]*$/i;
    if (!values.title) {
      errors.title = "*Title is required!";
    } else if (!regex_alphabet.test(values.title)) {
      errors.title = "*Title can only contain alphabets!";
    } else if (word_length > 10) {
      errors.title = "*Title cannot exceed more than 10 words";
    } else if (values.title.length > 100) {
      errors.title = "*Title cannot exceed more than 100 characters";
    }
    if (!values.level) {
      errors.project_level = "*Project level is required!";
    }
    if (!values.job_category) {
      errors.job_category = "*Job category is required!";
    }
    if (!values.duration) {
      errors.job_duration = "*Job duration is required!";
    }
    if (!values.experience) {
      errors.yearexperience = "*Year of experience is required!";
    }
    values.screeningq.forEach((que, index) => {
      console.log(que.Question);
      if (!regexq.test(que.Question)) {
        errors["Question" + index] = "*This is not a valid Question format!";
        console.log(index);
      } else if (que.Question.length > 100) {
        errors["Question" + index] =
          "*Question cannot exceed more than 100 characters";
      }
    });
    if (!values.role) {
      errors.role = "*role of freelancer is required!";
    } else if (!regex_alphabet.test(values.role)) {
      errors.role = "*Role can only contain alphabets!";
    } else if (word_length_role > 10) {
      errors.role = "*role cannot exceed more than 10 words";
    }
    if (fixed && !values.fixed) {
      errors.fixed = "*fixed price is required!";
    } else if (fixed && !regex_num.test(Number(values.fixed))) {
      errors.fixed = "*Value can only be numeric!";
    } else if (fixed && Number(values.fixed) > 50000) {
      errors.fixed = "*Value can't be greater than $50000";
    } else if (Number(values.fixed) < 0) {
      errors.fixed = "*Price can't be negative";
    }

    if (!fixed && !values.min) {
      errors.min = "*Minimum price is required!";
    } else if (!fixed && !regex_num.test(values.min)) {
      errors.min = "*Value can only be numeric!";
    }
    if (!fixed && !values.max) {
      errors.max = "*Maximum price is required!";
    } else if (!fixed && !regex_num.test(values.max)) {
      errors.max = "*Value can only be numeric!";
    }
    if (!fixed && values.max == values.min && values.max && values.min) {
      errors.max = "*Minimum and maximum cannot be same";
    } else if (values.max > 50000 || values.min > 50000) {
      errors.max = "*Value can't be greater than $50000";
    } else if (
      parseInt(values.min) > parseInt(values.max) &&
      values.max &&
      values.min
    ) {
      errors.max = "*Minimum price can't be greater than maximum price";
    } else if (values.min < 0 || values.max < 0) {
      errors.max = "*Price can't be negative";
    }
    if (!values.details) {
      errors.details = "*job details is required";
    } else if (!regex_spec.test(values.details)) {
      errors.details = "*This is not a valid Job detail format!";
    } else if (word_length_job_detail < 10) {
      errors.details = "*job details must be more than 10 words";
    } else if (values.details.length > 1500) {
      errors.details = "*Job details cannot exceed more than 1500 characters";
    }
    console.log(values.deadline);
    if (!values.expiry_project) {
      errors.project_expiry_date = "*required";
    }
    if (!values.deadline) {
      errors.deadline_date = "*required";
    }
    if (languages.length == 0) {
      errors.languages = "*required";
    }
    if (skills.length == 0) {
      errors.skills = "*required";
    }

    if (Object.keys(errors).length === 0) {
      setIsSubmit(true);
      toOther();
    } else {
      togglePopup();
    }

    return errors;
  };

  const addQues = () => {
    setQues([...ques, { Question: "", Answer: "" }]);
  };
  const [show, setshow] = useState(false);
  const [show1, setshow1] = useState(false);
  const change = () => {
    setshow(true);
    setshow1(false);
  };
  const changeAgain = () => {
    setshow(false);
    setshow1(true);
  };
  const [showexp, setshowexp] = useState(false);
  const [showproposal, setshowproposal] = useState(false);
  const [clientinfo, setclientinfo] = useState(false);
  const [categories, setcategories] = useState(false);
  const [jobtype, setjobtype] = useState(false);
  const [hourly, sethourly] = useState(job.job_type == "hourly");

  const [projectlength, setprojectlength] = useState(false);
  const [hoursper, sethoursper] = useState(false);
  const [clienthistory, setclienthistory] = useState(false);

  function toOther() {
    setLoadingState(true);
    console.log("jobPosted");
    const data = {
      job_id: job?.job_id,
      title: document.getElementById("title").value,
      level: document.getElementById("project_level").value,
      duration: document.getElementById("job_duration").value,
      role: document.getElementById("role").value,
      // english_level: document.getElementById("english_level").value,
      // location_type: document.getElementById("location_type").value,
      experience: document.getElementById("yearexperience").value,
      expiry_project: document.getElementById("expiry_project").value,
      details: document.getElementById("details").value,
      deadline: document.getElementById("deadline").value,
      job_type: fixed ? "fixed" : "hourly",
      budget: fixed
        ? document.getElementById("fbudget").value
        : document.getElementById("sbudget").value +
          "-" +
          document.getElementById("ebudget").value,
      // max_price: document.getElementById("max_price").value,
      // min_price: document.getElementById("min_price").value,
      // milestone: document.getElementById("milestone").value,
      job_category: document.getElementById("job_category").value,
      languages: languages,
      // document.getElementById("languages").value,
      skill_required: skills,
      file_name: filename,
      // location: document.getElementById("location").value,
      screeningq: ques,
    };
    console.log("**************", data);
    updatePostJob(data)
      .then((result) => {
        console.log(result);
        if (result.data.status == 1) {
          var ddn = filechoose(data, result.data.desc);
          console.log("nkc bro", ddn);
          if (ddn) {
            navigate("/Postedjob", {
              state: { profile: state?.profile, job: data },
            });
          }
        } else {
          alert(result.data.desc);
          togglePopup();
        }
        setLoadingState(false);
      })
      .catch((err) => {
        console.log(err);
        togglePopup();
        setLoadingState(false);
      });
  }
  function addtoskills(chip) {
    if (chip) {
      //if (LanguageList.Language.includes(chip[chip.length - 1])) {
      setSkills(chip);
      // }
    }
  }
  function addtoLanguages(chip) {
    if (chip) {
      setLanguages(chip);
    }
  }
  // function validateLang(chip) {
  //   if (suggestions.includes(chip)) {
  //     console.log("yehhhhhhhhhhhhhhhhhhhhhhhhhhhh!");
  //     return true;
  //   }
  //   console.log(LanguageList.Language.indexOf(chip));
  //   return false;
  // }

  const onChangeA = (e, index) => {
    const elem = e.currentTarget.parentElement.parentElement;
    const updatedQues = ques.map((user, i) =>
      index == i
        ? Object.assign(user, {
            Answer: elem.children[1].children[0].value,
          })
        : ques
    );
    setQues(updatedQues);
  };
  const onChangeQ = (e, index) => {
    const elem = e.currentTarget.parentElement.parentElement;
    const updatedQues = ques.map((user, i) =>
      index == i
        ? Object.assign(user, {
            Question: elem.children[0].children[0].value,
          })
        : ques
    );
    setQues(updatedQues);
    setFormValues({ ...formValues, screeningq: updatedQues });
  };
  const removeUser = (index) => {
    const filteredUsers = [...ques];
    filteredUsers.splice(index, 1);
  };
  const filechoose = (data, loc) => {
    const file = document.getElementById("filechooser").files[0];
    if (file?.name) {
      console.log(file.name);
      uploadFiles(file, data, loc);
      return false;
    } else {
      return true;
    }
  };
  const uploadFiles = (file, data, loc) => {
    //temp/uid/uid.pdf/image/video
    //document.getElementById("errordisp").innerHTML = "";
    const flarr = file.name.split(".");
    const ext = flarr[flarr.length - 1];
    console.log(ext, file.name, flarr.length);
    if (ext == "pdf") {
      const uploadTask = storage
        .ref(`temp/${auth.currentUser.email}/${loc}/${file.name}`)
        .put(file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          //
          const prog = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(prog);
        },
        (error) => {
          console.log(error);
          togglePopup();
          //document.getElementById("errordisp").innerHTML = error.code;
        },
        () => {
          togglePopup();
          navigate("/Postedjob", {
            state: { profile: state?.profile, job: data },
          });

          //document.getElementById("showprogper").innerHTML = "Completed";
        }
      );
    } else {
      //document.getElementById("errordisp").innerHTML = "upload pdf file only";
      togglePopup();
    }
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="container-job" style={{ width: "57.6vw" }}>
          <h2>Post Job</h2>
          <h5>Job description</h5>
          <input
            onChange={handleChange}
            style={{
              padding: "1rem",
              outline: "none",
              border: "0.1rem solid rgba(90, 90, 90, 0.4)",
            }}
            defaultValue={job.title}
            id="title"
            name="title"
            className="input-f"
            type="text"
            placeholder="Project Title"
          />
          <p style={{ marginLeft: "1rem", color: "red" }}>{formErrors.title}</p>
          <div className="mid-input-wrap">
            <select
              onChange={handleChange}
              id="project_level"
              name="level"
              className="input-f input-m "
              style={{
                color: "rgba(0,0,0,1)",
                border: "0.1rem solid rgba(90, 90, 90, 0.4)",
              }}
              defaultValue={job.level}
              required
            >
              <option style={{ color: "rgba(0,0,0,0.4)" }} value="" disabled>
                Project Level
              </option>
              {projectlevel.map((lvl, index) => (
                <option value={lvl.val()} key={index}>
                  {lvl.val()}
                </option>
              ))}
            </select>

            <select
              onChange={handleChange}
              id="job_duration"
              name="duration"
              className="input-f input-m "
              defaultValue={job.duration}
              style={{
                color: "rgba(0,0,0,1)",
                border: "0.1rem solid rgba(90, 90, 90, 0.4)",
              }}
              required
            >
              <option value="" selected disabled>
                Job Duration
              </option>
              {jobduration.map((duration, index) => (
                <option value={duration.val()} key={index}>
                  {duration.val()}
                </option>
              ))}
            </select>
          </div>
          <div
            style={{ width: "57.6vw" }}
            className="d-flex justify-content-between"
          >
            <p style={{ marginLeft: "1rem", color: "red" }}>
              {formErrors.project_level}
            </p>
            <p style={{ marginRight: "11.5rem", color: "red" }}>
              {formErrors.job_duration}
            </p>
          </div>
          <input
            onChange={handleChange}
            defaultValue={job.role}
            style={{
              padding: "1rem",
              outline: "none",
              border: "0.1rem solid rgba(90, 90, 90, 0.4)",
            }}
            id="role"
            name="role"
            className="input-f "
            placeholder="Role of the freelancer"
          />
          <p style={{ marginLeft: "1rem", color: "red" }}>{formErrors.role}</p>
          <div className="mid-input-wrap">
            <select
              onChange={handleChange}
              defaultValue={job.experience}
              id="yearexperience"
              name="experience"
              className="input-f input-m "
              style={{
                color: "rgba(0,0,0,1)",
                border: "0.1rem solid rgba(90, 90, 90, 0.4)",
              }}
              required
            >
              <option value="" disabled>
                Year of Experience
              </option>
              {yoe.map((ye, index) => (
                <option value={ye.val()} key={"yoe" + index}>
                  {ye.val()}
                </option>
              ))}
            </select>
          </div>
          <p style={{ marginLeft: "1rem", color: "red" }}>
            {formErrors.yearexperience}
          </p>

          <div className="mid-input-wrap">
            <input
              onChange={handleChange}
              defaultValue={job.expiry_project}
              style={{
                padding: "1rem",
                outline: "none",
                border: "0.1rem solid rgba(90, 90, 90, 0.4)",
              }}
              id="expiry_project"
              name="expiry_project"
              className="input-f input-mid"
              type="date"
              placeholder="Project expiry date"
              required
            />
            <input
              onChange={handleChange}
              defaultValue={job.deadline}
              style={{
                padding: "1rem",
                outline: "none",
                border: "0.1rem solid rgba(90, 90, 90, 0.4)",
              }}
              id="deadline"
              name="deadline"
              className="input-f input-mid"
              type="date"
              placeholder="Deadline date of project"
              required
            />
          </div>
          <div className="mid-input-wrap">
            <p style={{ marginLeft: "23rem", color: "red" }}>
              {formErrors.project_expiry_date}
            </p>
            <p style={{ marginRight: "1rem", color: "red" }}>
              {formErrors.deadline_date}
            </p>
          </div>

          <h3 style={{ marginLeft: "1rem" }}>Prices</h3>
          {/* <input style={{padding:"1rem"}}
          id="job_type"
          name="job_type"
          className="input-f"
          type="text"
          placeholder="Select job type"
        /> */}
          {/* <div className="mid-input-wrap">
          <input style={{padding:"1rem"}}
            id="max_price"
            name="max_price"
            className="input-f input-mid"
            type="text"
            placeholder="Maximum price"
          />
          <input style={{padding:"1rem"}}
            id="min_price"
            name="min_price"
            className="input-f input-mid"
            type="text"
            placeholder="Minimum price"
          />
        </div> */}
          <div className="">
            {/* <div
              style={{ paddingTop: "0.5rem", color: "rgba(0,0,0,0.5)" }}
              onClick={() => {
                if (jobtype == false) {
                  setjobtype(true);
                } else {
                  setjobtype(false);
                }
              }}
              className="dropdown-btn input-f "
            >
              Job Type
              <BiChevronDown
                style={{
                  width: "3rem",
                  fontSize: "1.4rem",
                  marginLeft: "45vw",
                }}
              />
            </div> */}

            <div
              style={{ display: "flex", margin: "1rem", marginLeft: "1rem" }}
              className="dropdown-content"
            >
              <div style={{ marginRight: "3rem" }} className="dropdown-items">
                <div className="dropdown-btn">
                  <input
                    onChange={handleChange}
                    defaultChecked={job.job_type == "hourly"}
                    style={{ marginRight: "0.5rem", outline: "none" }}
                    onClick={(e) => {
                      if (e.currentTarget.checked) {
                        e.currentTarget.checked = true;
                        sethourly(true);
                        setfixed(false);
                      } else {
                        e.currentTarget.checked = false;
                        sethourly(false);
                      }
                    }}
                    type="radio"
                    name="price"
                  />
                  Hourly
                </div>
                {hourly && (
                  <div
                    style={{ marginBottom: "1rem" }}
                    className="dropdown-content "
                  >
                    <div className="dropdown-items">
                      <div className="d-flex flex-row justify-content-start align-items-center">
                        <input
                          onChange={handleChange}
                          defaultValue={
                            job.job_type == "hourly"
                              ? job.budget.split("-")[0] || ""
                              : ""
                          }
                          style={{
                            borderRadius: "0.5rem",
                            border: "0.1rem solid grey",
                            outline: "none",
                            width: "9vw",
                            background: `url(${dollar}) no-repeat left`,
                            height: "2.2rem",
                            backgroundImage: `url(${dollar})`,
                            backgroundSize: "1rem",
                            padding: "0.2rem 1rem",
                            paddingLeft: "1.5rem",
                            marginTop: "0.5rem",
                            marginLeft: "1rem",
                            fontSize: "1rem",
                            marginRight: "0.2rem",
                          }}
                          id="sbudget"
                          type="text"
                          placeholder="$Min"
                          name="min"
                        />
                        <p style={{ marginTop: "0.15rem" }}> /hr</p>
                        <input
                          onChange={handleChange}
                          defaultValue={job.budget.split("-")[1] || ""}
                          id="ebudget"
                          style={{
                            fontSize: "1rem",
                            borderRadius: "0.5rem",
                            border: "0.1rem solid grey",
                            width: "9vw",
                            background: `url(${dollar}) no-repeat left`,
                            height: "2.2rem",
                            backgroundImage: `url(${dollar})`,
                            backgroundSize: "1rem",
                            padding: "0.2rem 1rem",
                            paddingLeft: "1.5rem",
                            marginTop: "0.5rem",
                            marginLeft: "1rem",
                            marginRight: "0.2rem",
                          }}
                          type="text"
                          placeholder="Max"
                          name="max"
                        />
                        <p style={{ marginTop: "0.15rem" }}> /hr</p>
                      </div>
                      <p style={{ marginLeft: "1rem", color: "red" }}>
                        {formErrors.min}
                      </p>
                      <p style={{ marginLeft: "1rem", color: "red" }}>
                        {formErrors.max}
                      </p>
                    </div>
                  </div>
                )}
              </div>
              <div className="dropdown-items">
                <div className="dropdown-btn">
                  <input
                    onChange={handleChange}
                    defaultChecked={job.job_type == "fixed"}
                    style={{ marginRight: "0.5rem", outline: "none" }}
                    onClick={(e) => {
                      if (e.currentTarget.checked) {
                        e.currentTarget.checked = true;
                        setfixed(true);
                        sethourly(false);
                      } else {
                        e.currentTarget.checked = false;
                        setfixed(false);
                      }
                    }}
                    type="radio"
                    name="price"
                    value="intermediate"
                  />
                  Fixed Price
                </div>
                {fixed && (
                  <div
                    style={{ marginBottom: "1rem" }}
                    className="dropdown-content"
                  >
                    <div className="dropdown-items">
                      <input
                        onChange={handleChange}
                        defaultValue={job.budget}
                        id="fbudget"
                        style={{
                          borderRadius: "0.5rem",
                          border: "0.1rem solid rgba(90, 90, 90, 0.4)",
                          width: "10vw",
                          outline: "none",
                          padding: "0.3rem 1rem",
                          marginTop: "0.5rem",
                          background: `url(${dollar}) no-repeat left`,
                          height: "2.2rem",
                          backgroundImage: `url(${dollar})`,
                          backgroundSize: "1rem",
                          padding: "0.2rem 1rem",
                          paddingLeft: "1.5rem",
                          fontSize: "0.95rem",
                          marginLeft: "1rem",
                          marginRight: "0.2rem",
                        }}
                        type="text"
                        placeholder="Total amount"
                        name="fixed"
                      />
                    </div>
                    <p style={{ marginLeft: "1rem", color: "red" }}>
                      {formErrors.fixed}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <h5>Job Category</h5>
          {/* <input
            style={{ padding: "1rem" }}
            id="job_category"
            name="job_category"
            type="text"
            className="input-f"
            placeholder="Select job categories"
          /> */}
          <select
            onChange={handleChange}
            defaultValue={job.job_category}
            name="job_category"
            id="job_category"
            placeholder="Language"
            style={{
              width: "100%",
              padding: "0.2rem 1.2rem",
              height: "3rem",
              margin: "0.3rem 1rem 1.4rem 1rem",
              fontSize: "1.1rem",
              boxSizing: "border-box",
              border: "0.1rem solid rgba(90, 90, 90, 0.4)",
              borderRadius: "0.4rem",
            }}
          >
            <option value="" disabled>
              Select job category
            </option>
            {jobcat.map((result, index) => (
              <option
                text={result.val()}
                value={result.val()}
                key={"cat" + index}
              >
                {result.val()}
              </option>
            ))}
          </select>

          <p style={{ margin: "-0.5rem 0rem 1rem 1rem ", color: "red" }}>
            {formErrors.job_category}
          </p>
          <h5>Language</h5>
          <SuggestChips
            onChange={addtoLanguages}
            chparr={languages}
            key={"lang"}
            suggestionsid="langsugg"
            suggestions={languagelist.map((ele) => ele.val()) || []}
          />
          <p style={{ marginLeft: "1rem", color: "red" }}>
            {formErrors.languages}
          </p>
          {/* <ChipInput
              chipRenderer={chipRenderer}
              dataSource={suggestions}
              classes={{ inputRoot: "inp", input: "inp" }}
              // style={{ padding: "0rem 1rem" }}
              style={{ height: "2rem" }}
              onBeforeAdd={validateLang}
              onChange={(chips) => addtoLanguages(chips)}
            /> */}
          {/* <input
            style={{ padding: "1rem" }}
            id="languages"
            name="languages"
            type="text"
            className="input-f"
            placeholder="Select languages"
          /> */}
          <h5>Job details</h5>
          <textarea
            onChange={handleChange}
            className="txtarea-job"
            defaultValue={job.details}
            name="details"
            id="details"
            cols="117"
            style={{
              width: "100%",
              outline: "none",
              border: "0.1rem solid rgba(90, 90, 90, 0.4)",
            }}
            rows="10"
          ></textarea>
          <p
            style={{
              marginLeft: "1rem",
              color: "red",
              marginBottom: "0.5rem",
            }}
          >
            {formErrors.details}
          </p>
          <h5>Skill required</h5>
          <SuggestChips
            onChange={addtoskills}
            chparr={skills}
            key={"sklbox"}
            suggestionsid="skillsugg"
            suggestions={skillslist.map((ele) => ele.val()) || []}
          />
          <p style={{ marginLeft: "1rem", color: "red" }}>
            {formErrors.skills}
          </p>
          {/* <input
            style={{ padding: "1rem" }}
            id="skill_required"
            name="skill_required"
            className="input-f"
            type="text"
          /> */}
          <div className="input-f">
            <input
              style={{
                padding: "1rem",
                display: "none",
                outline: "none",
                border: "0.1rem solid rgba(90, 90, 90, 0.4)",
              }}
              type="file"
              name="filechooser"
              id="filechooser"
              className="input"
              onChange={(e) => setfilename(e.currentTarget.files[0].name)}
            />
            <button
              onClick={() => {
                document.getElementById("filechooser").click();
              }}
              className="btn btn-primary"
              style={{
                height: "2rem",
                fontFamily: "Roboto",
                fontStyle: "normal",
                fontWeight: "500",
                fontSize: "1.2rem",
                color: "#006872",
                padding: "0 0.2rem",
                textAlign: "left",
                background: "#fff",
                marginTop: "0.4rem",
                border: "1px solid rgba(0, 0, 0, 0.4)",
                borderRadius: "10px",
              }}
            >
              Attachments
            </button>
            {filename}
          </div>

          <label
            style={{ paddingTop: "0.5rem" }}
            id="faqs"
            name="faqs"
            className="input-f"
            type="text"
            placeholder="Job FAQ"
          >
            Screening Questions
          </label>

          {ques.map((que, index) => (
            <div className="" key={index} id={"ques" + index}>
              <label className="wrap-add-label">
                <input
                  style={{ padding: "1rem" }}
                  name={"Question" + index}
                  className="input-f"
                  onChange={(e) => {
                    onChangeQ(e, index);
                  }}
                  type="text"
                  defaultValue={que.Question}
                  placeholder="Question"
                />
                <button onClick={addQues} className="add-btn">
                  +Add
                </button>
              </label>
              <div>
                {/* <textarea
                className="txtarea-job"
                onChange={(e) => {
                  onChangeA(e, index);
                }}
                name="Answer"
                cols="104"
                rows="10"
              ></textarea> */}
              </div>
              <p
                style={{
                  marginLeft: "1rem",
                  marginBottom: "1rem",
                  color: "red",
                }}
              >
                {formErrors["Question" + index]}
              </p>
            </div>
          ))}
          {/* <label className="wrap-add-label">
        <input style={{padding:"1rem"}} className="input-f" type="text" placeholder="Question" />
        <button onClick={addUser} className="add-btn">+Add</button>{handleSubmit}
        </label> */}
          {/* <textarea className="txtarea-job" name="" id="" cols="104" rows="10"></textarea> */}
          {loadingState && <SpinnerDotted style={{ height: "2rem" }} />}
          {!loadingState && (
            <button onClick={togglePopup} className="s-up-btn" type="submit">
              Save and update
            </button>
          )}
        </div>
      </div>
      {isOpen && (
        <Popup
          content={
            <>
              <div
                style={{
                  display: "flex",
                  gap: "1rem",
                  width: "80vw",
                  height: "100%",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <SpinnerDotted style={{ height: "3rem" }} />
                <h5 style={{ color: "white" }}>
                  {progress > 0 ? "Uploading files " + progress : ""}
                </h5>
              </div>
            </>
          }
          handleClose={togglePopup}
          func={handleSubmit}
        />
      )}
    </>
  );
}

export default Postjob;
