import React, { useState } from "react";
import "./EnCreateProcess.css";
import * as FcIcons from "react-icons/fc";
import { Link } from "react-router-dom";
import newID from '../../../utils/newID';

function EnCreateProcess() {
  const [name, setName] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");
  const [detail_description, setDetailDescription] = useState("");

  const tokenData = window.localStorage.getItem("token");
  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

  const collectInfo = () => {
    const userId = JSON.parse(window.localStorage.getItem('user'))._id;
    console.log("userId: ", userId);
    console.log(name, time, description, detail_description);
    fetch("http://localhost:5000/process/add-process", {
      method: "POST",
      crossDomain: true,
      headers: {
        "x-auth-token": tokenData,
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        userId,
        name,
        time,
        description,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        console.log(time);

        // window.location.href = "/listofprocesses";
      });
  };

  return (
    <>
      <form className="create-process" onSubmit={(e) => e.collectInfo()}>
        <div className="create-process-container">
          <div className="create-process-title">
            <h1>Describe a process</h1>
            <h4>Process introduction information</h4>
          </div>
          <div className="fill" >
            <div className="fill-1">
              <div className="process-name">
                <label>
                  Process's name <b>(*)</b>
                </label>
                <input type="text" placeholder="Process's name" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
            </div>
          </div>
          <div className="describe">
            <label>
              Describe information<b>(*)</b>
            </label>
            <textarea placeholder="Describe information" value={description} onChange={(e) => setDescription(e.target.value)} required />
          </div>
          <div className="note">
            <p>
              <b>(*)</b>: Required information
            </p>
            <input type="button" 
            value="Confirm"
            className='btn-confirm'
            onClick={() => {
              setTime(date);
              collectInfo();
              }
            }  />
          </div>
        </div>
      </form>
    </>
  );
}

export default EnCreateProcess;
