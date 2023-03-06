import React, { useState } from 'react';
import './CreateQR.css';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer/Footer';
import * as FcIcons from 'react-icons/fc';
import { Link } from 'react-router-dom';

function CreateQR() {
  const [image, setImage] = useState(null);

  const [fileName, setFileName] = useState("No choosen file")

  return (
    <>
      <Navbar/>
      <div className='create-qr'>
        <div className='create-qr-container'>
          <div className='create-qr-title'>
            <h1>Describe a product</h1>
            <h4>Product introduction information</h4>
          </div>
          <div className='fill-qr'>
            <div className='fill-qr-1'>
              <div className='product-name'>
                <label>Product's name <b>(*)</b></label>
                <input type="text" placeholder="Product's name" required/>
              </div>
              <div className='time'>
                <label>Time <b>(*)</b></label>
                <input type="text" placeholder='3 months' required/>
              </div>
            </div>
            <div className='fill-qr-2'>
              <div className='address'>
                <label>Address <b>(*)</b></label>
                <input type="text" placeholder='Address'required/>
              </div>
              <div className='image'>
                <label>Image <b>(*)</b></label>
                <form action="" onClick={() => document.querySelector(".image-field").click()}>
                  <input 
                    type="file"
                    accept='image/*' 
                    className='image-field' 
                    hidden 
                    onChange={({target: {files}}) => {
                      files[0] && setFileName(files[0].name)
                      if(files) {
                        setImage(URL.createObjectURL(files[0]))
                      }
                    }}
                  />
                  {
                    image ?
                    <img src={image} width={210} height={190} alt={fileName}/> :
                    <FcIcons.FcAddImage className='add-image-icon'/>  
                  }
                </form>
              </div>
            </div>
          </div>
          <div className='describe-qr'>
            <label>Describe information<b>(*)</b></label>
            <textarea placeholder='Describe information' required/>
          </div>
          <div className='note-qr'>
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

export default CreateQR