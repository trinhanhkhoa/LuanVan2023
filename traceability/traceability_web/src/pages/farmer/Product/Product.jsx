import React, {useState, useEffect} from 'react';
import './Product.css';
import cam from "../../../asserts/cam.jpg";
import * as TbIcons from "react-icons/tb";
import Popup from '../../../components/Popup/Popup';
import { Link } from 'react-router-dom';
import Data from "../../../Data.json";

function Product() {
  const [isOpen, setIsOpen] = useState(false);
 
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }

  return (
    <>
    <div className='product'>
      <div className='product-btn-img'>
        <img src={cam} className='img-product'/>
        <div className='product-info-btn'>
          <Link to="/updateproduct">
            <input type='button' value="Update information" className='btn-update-product-info'/>
          </Link>
          <Link to="/list">
            <input type='button' value="Delete product" className='btn-delete'/>
          </Link>
        </div>
      </div>
      <div className='product-description'>
        <div className='product-description-1'>
          <TbIcons.TbQrcode className="product-qr-icon"/>          
          <div className='product-information'>
            <p><b>Product's name:</b> {Data[0].name}</p>
            <p><b>Product's ID:</b> {Data[0].pId}</p>
            <p><b>Plant time:</b> {Data[0].time}</p>
          </div>
        </div>
        <div className='product-address'>
          <p><b>Address: </b> {Data[0].address}</p>
        </div>
        <div className='product-description-2'>
          <h2>Description:</h2>
          <p>{Data[0].description}</p>
        </div>

        <div className='product-description-3'>
          <div className='product-update'>
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
  </>
  
  )
}

export default Product