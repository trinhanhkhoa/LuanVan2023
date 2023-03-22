import React from 'react';
import './CreateProcess.css';
import { Link } from 'react-router-dom';

function CreateProcess() {

  return (
    <>
      <div className='create-process'>
        <div className='create-process-container'>
          <div className='create-process-title'>
            <h1>Describe a process</h1>
            <h4>Process introduction information</h4>
          </div>
          <div className='fill-process'>
            <div className='fill-process-1'>
              <div className='process-name'>
                <label>Process's name <b>(*)</b></label>
                <input type="text" placeholder="Process's name" required/>
              </div>
              <div className='time-process'>
                <label>Time <b>(*)</b></label>
                <input type="text" placeholder='3 months' required/>
              </div>
            </div>
            <div className='fill-process-2'>
              <div className='address-process'>
                <label>Address <b>(*)</b></label>
                <input type="text" placeholder='Address'required/>
              </div>
            </div>
          </div>
          <div className='describe-process'>
            <label>Describe information <b>(*)</b></label>
            <textarea placeholder='Describe information' required/>
          </div>
          <div className='note-process'>
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

export default CreateProcess