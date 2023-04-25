import React, { useState, useEffect } from "react";
import "./EnUpdateProcess.css";
import * as FcIcons from "react-icons/fc";
import { Link, useParams } from "react-router-dom";
import Popup from "../../../components/Popup/Popup";

function EnUpdateProcess() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");

  const togglePopup = () => {
    setIsOpen(isOpen);
  };

  const params  = useParams();

  const tokenData = window.localStorage.getItem("token");
  const userId = window.localStorage.getItem("userId");


  const tokenIsValid = () => {
    fetch("http://localhost:5000/tokenIsValid", {
      method:"POST",
      crossDomain:true,
      headers: {
        'x-auth-token': tokenData,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin":"*"
      }
    })
      .then((res) => res.json() )
      .then((data) => {
        console.log("token", data)
      });
  }

  const getInfoProcess = () => {
    fetch(`http://localhost:5000/process/update-process/${params.id}`, {
      method: "GET",
      headers: {
        'x-auth-token': tokenData,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setName(data.data.name);
        setDescription(data.data.description);
        setTime(data.data.time);

        console.log(data);
      });
  }

  const putInfoProcess = () => {
    fetch(`http://localhost:5000/process/update-process/${params.id}`, {
      method: "PUT",
      crossDomain:true,
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": tokenData,
        Accept: "application/json",
        "Access-Control-Allow-Origin":"*"
      },
      body: JSON.stringify({
        userId,
        name,
        time,
        description
      })
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        window.location.href = "/listofprocesses";
      });
  }

  useEffect(() => {
    tokenIsValid();
    getInfoProcess();
  }, []);

  return (
    <>
      <div className="update-process">
        <div className="update-process-container">
          <div className="update-process-title">
            <h1>Describe a process</h1>
            <h4>Process introduction information</h4>
          </div>
          <div className="update-info">
            <div className="update-info-1">
              <div className="process-name">
                <label>
                  Process's name <b>(*)</b>
                </label>
                <input
                  type="text"
                  placeholder="process's name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="time">
                <label>
                  Time <b>(*)</b>
                </label>
                <input
                 type="date" 
                 value={time} 
                 onChange={(e) => setTime(e.target.value)}
                 required 
                />
              </div>
            </div>
          </div>
          <div className="describe">
            <label>
              Describe information <b>(*)</b>
            </label>
            <textarea
              placeholder="Describe information"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="note">
            <p>
              <b>(*)</b>: Required information
            </p>
            <input 
              type="button" 
              value="Confirm" 
              className="btn-confirm" 
              onClick={putInfoProcess}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default EnUpdateProcess;
