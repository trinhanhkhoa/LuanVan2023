import React, { useState } from 'react';
import './UpdateProduct.css';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer/Footer';
import * as FcIcons from 'react-icons/fc';
import * as TbIcons from 'react-icons/tb';
import { Link } from 'react-router-dom';
import Popup from '../../components/Popup/Popup';


function UpdateProduct() {
  const [isOpen, setIsOpen] = useState(false);
 
  const togglePopup = () => {
    setIsOpen(isOpen);
  }

  return (
    <>
      <Navbar/>
      <div className='update-product'>
        <div className='update-product-container'>
          <div className='update-product-title'>
            <h1>Describe a product</h1>
            <h4>Product introduction information</h4>
          </div>
          <div className='update-info'>
            <div className='update-info-1'>
              <TbIcons.TbQrcode className="qr-icon"/>
              <Link to="/product">
                <input type="button" className='btn-watch-product' value="Watch product"/>
              </Link>
            </div>
            <div className='update-info-1'>
              <div className='product-name'>
                <label>Product's name <b>(*)</b></label>
                <input type="text" placeholder="Product's name" required/>
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
      <Footer/>
    </>
  )
}

export default UpdateProduct