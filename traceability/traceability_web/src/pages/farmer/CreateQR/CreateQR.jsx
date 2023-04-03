import React, { useState } from 'react';
import './CreateQR.css';
import * as FcIcons from 'react-icons/fc';
import QRCode from 'react-qr-code';

function CreateQR() {
  const [image, setImage] = useState("");
  const [fileName, setFileName] = useState("No choosen file")
  const [text, setText] = useState("");

  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");
  
  const [src, setSrc] = useState("");
  
  const randomNumberInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const generateQR = () => {
    setText(name + time + address);
    QRCode.toDataURL(text).then(setSrc);
  }


  const collectInfo = () => {
    console.log(name,
      address,
      image,
      time,
      description);
    fetch("http://localhost:5000/createqr", {
      method:"POST",
      crossDomain:true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin":"*"
      },
      body: JSON.stringify({
        id:id,
        name,
        address,
        image,
        time,
        description
      })
    })
      .then((res) => res.json() )
      .then((data) => {
        console.log(name);
        console.log(id);
      });
  }

  return (
    <>
      <div className='create-qr'>
        <div className='create-qr-container'>
          <div className='create-qr-title'>
            <h1>Describe a product</h1>
            <h4>Product introduction information</h4>
          </div>
          <div className='fill-qr' onSubmit={(e) => e.collectInfo()}>
            <div className='fill-qr-1'>
              <div className='product-name-qr'>
                <label>Product's name <b>(*)</b></label>
                <input type="text" placeholder="Product's name" value={name} onChange={(e) => setName(e.target.value)} required/>
              </div>
              <div className='time-qr'>
                <label>Time <b>(*)</b></label>
                <input type="month" placeholder='3 months' value={time} onChange={(e) => setTime(e.target.value)} required/>
              </div>
            </div>
            <div className='fill-qr-2'>
              <div className='address-qr'>
                <label>Address <b>(*)</b></label>
                <input type="text" placeholder='Address'value={address} onChange={(e) => setAddress(e.target.value)} required/>
              </div>
              <div className='image-qr'>
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
                    <img src={image} width={210} height={190} alt={fileName} /> :
                    <FcIcons.FcAddImage className='add-image-qr-icon'/>  
                  }
                </form>
              </div>
            </div>
          </div>
          <div className='describe-qr'>
            <label>Describe information<b>(*)</b></label>
            <textarea placeholder='Describe information' value={description} onChange={(e) => setDescription(e.target.value)} required/>
          </div>
          <div className='note-qr'>
            <p><b>(*)</b>: Required information</p>
            <input 
              type="button" 
              value="Confirm"
              className='btn-confirm'
              onClick={() => {
                collectInfo();
                setId(randomNumberInRange(1, 9999));
                generateQR();
                }
              } 
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default CreateQR