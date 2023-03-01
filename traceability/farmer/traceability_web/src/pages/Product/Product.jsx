import React, {useState} from 'react';
import './Product.css';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer/Footer";
import cam from "../../asserts/cam.jpg";
import * as TbIcons from "react-icons/tb";
import Popup from '../../components/Popup/Popup';
import { Link } from 'react-router-dom';

function Product() {
  const [isOpen, setIsOpen] = useState(false);
 
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }

  return (
    <>
    <Navbar/>
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
            <p><b>Product's name:</b> Orange</p>
            <p><b>Product's ID:</b> 001</p>
            <p><b>Plant time:</b> 3 years</p>
          </div>
        </div>
        <div className='address'>
          <p><b>Address: </b> 227 Nguyễn Văn Cừ Street, Ward 4, District 5, Hồ Chí Minh City</p>
        </div>
        <div className='description-2'>
          <ul>
            <h2>Description:</h2>
            <li><p>Watering time: 30 minutes</p></li>
            <li><p>Organic fertilizer: 7 kg</p></li>
            <li><p>Inorganic fertilizers: 1 g</p></li>
          </ul>
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
                <ul>
                  <li>Watering time: 20 minutes</li>
                  <li>Organic fertilizer: 5 kg</li>
                  <li>Inorganic fertilizer 1 g</li>
                  <li>Pesticides: Sherpa 25EC, Trebon 2.5 EC</li>
                </ul>
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

export default Product