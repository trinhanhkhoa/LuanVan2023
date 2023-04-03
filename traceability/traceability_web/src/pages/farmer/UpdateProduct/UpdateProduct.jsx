import React, { useState } from 'react';
import './UpdateProduct.css';
import * as FcIcons from 'react-icons/fc';
import * as TbIcons from 'react-icons/tb';
import { Link, useParams } from 'react-router-dom';
import Popup from '../../../components/Popup/Popup';
import Data from "../../../Data.json";
import QRCode from 'react-qr-code';

function UpdateProduct() {
  const [isOpen, setIsOpen] = useState(false);
 
  const togglePopup = () => {
    setIsOpen(isOpen);
  }

  const [image, setImage] = useState(null);

  const [fileName, setFileName] = useState("No choosen file")

  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [time, setTime] = useState("");
  const [address, setAddress] = useState("");
  // const [description, setDescription] = useState("");

  const generateQR = () => {
    setText(name + time + address);
  }

  const params = useParams();
  console.log(params);

  // return <h2>name {params.id}</h2>;

  return (
    <>
      <div className='update-product'>
        <div className='update-product-container'>
          <div className='update-product-title'>
            <h1>Describe a product</h1>
            <h4>Product introduction information</h4>
          </div>
          <div className='update-info'>
            <div className='update-info-qr'>
            <QRCode value="http://localhost:3000/product" size={200}/>
              <Link to="/product">
                <input type="button" className='btn-watch-product' value="Watch product"/>
              </Link>
            </div>
            <div className='update-info-1'>
              <div className='product-name-update'>
                <label>Product's name <b>(*)</b></label>
                <input type="text" placeholder="Product's name" onChange={(e) => {setName(e.target.value)}} required/>
              </div>
              <div className='time-update'>
                <label>Time <b>(*)</b></label>
                <input type="month" placeholder='3 months' onChange={(e) => {setTime(e.target.value)}} required/>
              </div>
            </div>
            <div className='update-info-2'>
              <div className='address-update'>
                <label>Address <b>(*)</b></label>
                <input type="text" placeholder='Address' onChange={(e) => {setAddress(e.target.value)}} required/>
              </div>
              <div className='image-update'>
                <label>Image <b>(*)</b></label>
                <form action="" onClick={() => document.querySelector(".image-field").click()}>
                  <input 
                    required
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
                    <FcIcons.FcAddImage className='add-image-update-icon'/>  
                  }
                </form>
              </div>
            </div>
          </div>
          <div className='describe-update'>
            <label>Describe information <b>(*)</b></label>
            <textarea placeholder='Describe information' value={Data[0].description} required/>
          </div>
          <div className='note'>
            <p><b>(*)</b>: Required information</p>
            {/* <Link to="/list"> */}
              <input type="button" value="Confirm" onClick={generateQR} className='btn-confirm-update'/>
            {/* </Link> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default UpdateProduct