import React, { useState } from 'react';
import './EnUpdateProcess.css';
import * as FcIcons from 'react-icons/fc';
import { Link } from 'react-router-dom';
import Popup from '../../../components/Popup/Popup';


function EnUpdateProcess() {
  const [isOpen, setIsOpen] = useState(false);
 
  const togglePopup = () => {
    setIsOpen(isOpen);
  }

  return (
    <>
      <div className='update-process'>
        <div className='update-process-container'>
          <div className='update-process-title'>
            <h1>Describe a process</h1>
            <h4>Process introduction information</h4>
          </div>
          <div className='update-info'>
            <div className='update-info-1'>
              <div className='process-name'>
                <label>Process's name <b>(*)</b></label>
                <input type="text" placeholder="process's name" required/>
              </div>
              <div className='time'>
                <label>Time <b>(*)</b></label>
                <input type="text" placeholder='3 months' required/>
              </div>
            </div>
            <div className='update-info-2'>
              <div className='address'>
                <label>Address <b>(*)</b></label>
                <input type="text" placeholder='Address'required/>
              </div>
              <div className='image'>
                <label>Image <b>(*)</b></label>
                <Link to="#">
                  <FcIcons.FcAddImage className='add-image-icon'/>
                </Link>
              </div>
            </div>
          </div>
          <div className='describe'>
            <label>Describe information <b>(*)</b></label>
            <textarea placeholder='Describe information' required/>
          </div>
          <div className='note'>
            <p><b>(*)</b>: Required information</p>
            <Link to="/list">
              <input type="button" value="Confirm" className='btn-confirm'/>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default EnUpdateProcess