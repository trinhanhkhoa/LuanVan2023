import React, { useState, useEffect } from 'react';
import './UpdateProcess.css';
import { Link, useParams } from 'react-router-dom';
import DataProcess from "../../../DataProcess.json";

function UpdateProcess() {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");
  
  const params = useParams();
  console.log(params);

  const getInfoProcess = () => {
    fetch(`http://localhost:5000/enprocess/${params.id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setName(data.data.name);
        setDescription(data.data.description);
        setTime(data.data.time);

        console.log(data);
      });
  }

  useEffect(() => {
    getInfoProcess();
  }, []);

  return (
    <>
      <div className='update-process'>
        <div className='update-process-container'>
          <div className='update-process-title'>
            <h1>Describe a process</h1>
            <h4>Process introduction information</h4>
          </div>
          <div className='fill-update-process'>
            <div className='fill-update-process-1'>
              <div className='update-process-name'>
                <label>Process's name <b>(*)</b></label>
                <input type="text" placeholder="Process's name" value={name}/>
              </div>
              <div className='time-update-process'>
                <label>Time <b>(*)</b></label>
                <input type="month" placeholder='3 months' value={time}/>
              </div>
            </div> 
          </div>
          <div className='describe-update-process'>
            <label>Describe information <b>(*)</b></label>
            <textarea placeholder='Describe information' value={description}/>
          </div>
          <div className='note-update-process'>
            <p><b>(*)</b>: Required information</p>
            <Link to="/process">
              <input type="button" value="Confirm" className='btn-confirm'/>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default UpdateProcess