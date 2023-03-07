import React, {useState} from 'react';
import './Product.css';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer/Footer";
import cam from "../../asserts/cam.jpg";
import * as TbIcons from "react-icons/tb";
import Popup from '../../components/Popup/Popup';
import { Link } from 'react-router-dom';
import Data from "../../Data.json";

function Product() {
  const [isOpen, setIsOpen] = useState(false);
 
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }

  return (
    <>
    {/* <Navbar/> */}
    <div className='product'>
      <div className='btn-img'>
        <img src={cam} className='img-product'/>
        <div className='info-btn'>
          <Link to="/updateproduct">
            <input type='button' value="Update information" className='btn-update-product-info'/>
          </Link>
          <Link to="/list">
            <input type='button' value="Delete product" className='btn-delete'/>
          </Link>
        </div>
      </div>
      <div className='description'>
        <div className='description-1'>
          <TbIcons.TbQrcode className="qr-icon"/>          
          <div className='information'>
            <p><b>Product's name:</b> {Data[0].name}</p>
            <p><b>Product's ID:</b> {Data[0].pId}</p>
            <p><b>Plant time:</b> {Data[0].time}</p>
          </div>
        </div>
        <div className='address'>
          <p><b>Address: </b> {Data[0].address}</p>
        </div>
        <div className='description-2'>
          <h2>Description:</h2>
          <p>{Data[0].description}</p>
        </div>

        <div className='description-3'>
          <div className='update'>
            <p><b>Number of updates: </b> 2 times</p>
          </div>
          <input type="button" value="Detail" onClick={togglePopup}/>
          {isOpen && <Popup
            content={
              <div className='popup-detail'>
                <b>Update Information</b>
                <p>{Data[0].detail}</p>
              </div>
              }
            handleClose={togglePopup}
          />}      
        </div>
      </div>
    </div>
    {/* <Footer/> */}
  </>
  
  )
}

export default Product