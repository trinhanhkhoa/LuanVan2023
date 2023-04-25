import React, { useState, useEffect } from 'react';
import './UpdateProduct.css';
import * as FcIcons from 'react-icons/fc';
import * as TbIcons from 'react-icons/tb';
import { Link, useParams } from 'react-router-dom';
import Popup from '../../../components/Popup/Popup';
import QRCode from 'react-qr-code';
import {uploadImage} from "../../../components/MultiUpload";


function UpdateProduct() {
  const [isOpen, setIsOpen] = useState(false);
 
  const togglePopup = () => {
    setIsOpen(isOpen);
  }

  const [images, setImages] = useState([]);

  const [fileName, setFileName] = useState("No choosen file")

  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [time, setTime] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");

  const upload = async (e) => {
    e.preventDefault();
    try {
      let arr = [];
      let imgArr = []
      for (let i = 0; i < images.length; i++) {
        const data = await uploadImage(images[i]);
        arr.push(data);
        imgArr.push(data.url);
      }
      setLinks(arr);
      setImg(imgArr);
    } catch (error) {
      console.log(error);
    }
  }

  const params = useParams();

  const tokenData = window.localStorage.getItem("token");
  const user = window.localStorage.getItem("userId");
  const userId = window.localStorage.getItem("userId");

  const tokenIsValid = () => {
    fetch("http://localhost:5000/tokenIsValid", {
      method:"POST",
      crossDomain:true,
      headers: {
        'x-auth-token': tokenData,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin":"*"
      }
    })
      .then((res) => res.json() )
      .then((data) => {
        // console.log(token);
        // setToken(data);
        console.log("token", data)
      });
  }

  const getInfoProduct = () => {
    fetch(`http://localhost:5000/product/get-product/${params.id}`, {
      method: "GET",
      headers: {
        "x-auth-token": tokenData,
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setName(data.data.name);
        setImages(data.data.images);
        setAddress(data.data.address);
        setDescription(data.data.description);
        setTime(data.data.time);
        console.log(data.image);
        console.log(data);
      });
  }

  const putInfoProduct = () => {
    fetch(`http://localhost:5000/product/update-product/${params.id}`, {
      method: "PUT",
      crossDomain:true,
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": tokenData,
        Accept: "application/json",
        "Access-Control-Allow-Origin":"*"
      },
      body: JSON.stringify({
        userId,
        user,
        name,
        address,
        images,
        time,
        description
      })
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        window.location.href = "/list";
      });
  }

  useEffect(() => {
    tokenIsValid();
    getInfoProduct();
  }, []);

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
            <QRCode value={`http://localhost:3000/product/${userId}`} size={200}/>
              <Link to={`/product/${params.id}`}>
                <input type="button" className='btn-watch-product' value="Watch product"/>
              </Link>
            </div>
            <div className='update-info-1'>
              <div className='product-name-update'>
                <label>Product's name <b>(*)</b></label>
                <input type="text" placeholder="Product's name" value={name} onChange={(e) => {setName(e.target.value)}} required/>
              </div>
              <div className='time-update'>
                <label>Time <b>(*)</b></label>
                <input type="date"
                // pattern="\d{2}-\d{2}-\d{4}"
                placeholder='3 months' value={time} onChange={(e) => {setTime(e.target.value)}} required/>
              </div>
            </div>
            <div className='update-info-2'>
              <div className='address-update'>
                <label>Address <b>(*)</b></label>
                <input type="text" placeholder='Address' value={address} onChange={(e) => {setAddress(e.target.value)}} required/>
              </div>
              <div className='image-update'>
                <label>Image <b>(*)</b></label>
                <input
                  type="file"
                  className="image-field"
                  multiple 
                  hidden
                  onChange= {(e)=> setImages(e.target.files)}
                />
                { 
                  images && images.length > 0 && images.length < 3 && images.map((link, index) => {
                    return (
                      <div className="images-link" key={index++}>
                        <img className="image" src={link}  width={190} height={170} />
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>
          <div className='describe-update'>
            <label>Describe information <b>(*)</b></label>
            <textarea placeholder='Describe information' value={description} required/>
          </div>
          <div className='note'>
            <p><b>(*)</b>: Required information</p>
            <input
             type="button" 
             value="Confirm" 
             onClick={putInfoProduct} 
             className='btn-confirm-update'
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default UpdateProduct