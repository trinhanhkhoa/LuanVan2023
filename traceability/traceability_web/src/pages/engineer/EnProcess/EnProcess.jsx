import React, {useState} from 'react';
import './EnProcess.css';
import Popup from '../../../components/Popup/Popup';
import { Link } from 'react-router-dom';
import DataProcess from "../../../DataProcess.json";

function EnProcess() {
  const [isOpen, setIsOpen] = useState(false);
 
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }
  
  return (
    <>
    <div className='process'>
      <div className='description'>
        <div className='description-1'>   
          <div className='information'>
            <p><b>Process's name:</b> {DataProcess[0].name}</p>
            <p><b>Process's ID: </b> {DataProcess[0].pID}</p>
          </div>
        </div>
        <div className='address'>
          <p><b>Address: </b> 227 Nguyễn Văn Cừ Street, Ward 4, District 5, Hồ Chí Minh City</p>
        </div>
        <div className='description-2'>
          <h3>Description:</h3>
          <p>{DataProcess[0].description.sub}</p>
        </div>

        <div className='description-3'>
          <div className='info-btn'>
            <Link to="/createprocess">
              <input type='button' value="Update information" className='btn-update-process-info'/>
            </Link>
            <Link to="/list">
              <input type='button' value="Delete process" className='btn-delete'/>
            </Link>
          </div>
          <input type="button" className='btn-detail' value="Detail" onClick={togglePopup}/>
          {isOpen && <Popup
            content={
              <div className='popup-detail'>
                <h2>Full Process Information</h2>
                <p>
                  {DataProcess[0].description.full}
                </p>
              </div>
              }
            handleClose={togglePopup}
          />}      
        </div>
      </div>
    </div>
  </>
  )
}

export default EnProcess