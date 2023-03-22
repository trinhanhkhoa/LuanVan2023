import React from 'react';
import './UpdateProcess.css';
import { Link } from 'react-router-dom';
import DataProcess from "../../../DataProcess.json";

function UpdateProcess() {

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
                <input type="text" placeholder="Process's name" value={DataProcess[0].name}/>
              </div>
              <div className='time-update-process'>
                <label>Time <b>(*)</b></label>
                <input type="text" placeholder='3 months' value={DataProcess[0].time}/>
              </div>
            </div>
            <div className='fill-update-process-2'>
              <div className='address-update-process'>
                <label>Address <b>(*)</b></label>
                <input type="text" placeholder='Address'value={DataProcess[0].address}/>
              </div>
            </div>
          </div>
          <div className='describe-update-process'>
            <label>Describe information <b>(*)</b></label>
            <textarea placeholder='Describe information' value={DataProcess[0].description.full}/>
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