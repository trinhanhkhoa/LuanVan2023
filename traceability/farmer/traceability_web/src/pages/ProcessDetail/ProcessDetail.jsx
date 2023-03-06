import React, {useState} from 'react';
import './ProcessDetail.css';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer/Footer";
import Popup from '../../components/Popup/Popup';
import { Link } from 'react-router-dom';
import DataProcess from "../../DataProcess.json";

function ProcessDetail() {
  const [isOpen, setIsOpen] = useState(false);
 
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }
  
  return (
    <>
    <Navbar/>
    <div className='process-detail'>
      <div className='description-process'>
        <div className='description-process-1'>   
          <div className='information-process'>
            <p><b>Process's name:</b> {DataProcess[0].name}</p>
            <p><b>Process's ID: </b> {DataProcess[0].pID}</p>
          </div>
        </div>
        <div className='address-process'>
          <p><b>Address: </b> 227 Nguyễn Văn Cừ Street, Ward 4, District 5, Hồ Chí Minh City</p>
        </div>
        <div className='description-process-2'>
          <h3>Description:</h3>
          <p>{DataProcess[0].description.sub}</p>
        </div>

        <div className='description-process-3'>
          <div className='info-btn-process'>
            <Link to="/createprocess">
              <input type='button' value="Update information" className='btn-update-process-info'/>
            </Link>
            <Link to="/list">
              <input type='button' value="Delete process" className='btn-delete-process'/>
            </Link>
          </div>
          <input type="button" className='btn-detail' value="Detail" onClick={togglePopup}/>
          {isOpen && <Popup
            content={
              <div className='popup-detail-process'>
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
    <Footer/>
  </>
  
  )
}

export default ProcessDetail