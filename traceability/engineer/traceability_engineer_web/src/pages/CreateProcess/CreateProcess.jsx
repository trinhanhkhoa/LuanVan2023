import React from 'react';
import './CreateProcess.css';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer/Footer';
import * as FcIcons from 'react-icons/fc';
import { Link } from 'react-router-dom';

function CreateProcess() {
  return (
    <>
      <Navbar/>
      <div className='create-process'>
        <div className='create-process-container'>
          <div className='create-process-title'>
            <h1>Describe a process</h1>
            <h4>Process introduction information</h4>
          </div>
          <div className='fill'>
            <div className='fill-1'>
              <div className='process-name'>
                <label>Process's name <b>(*)</b></label>
                <input type="text" placeholder="Process's name" required/>
              </div>
              <div className='time'>
                <label>Time <b>(*)</b></label>
                <input type="text" placeholder='3 months' required/>
              </div>
            </div>
            <div className='fill-2'>
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
            <label>Describe information<b>(*)</b></label>
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
      <Footer/>
    </>
  )
}

export default CreateProcess