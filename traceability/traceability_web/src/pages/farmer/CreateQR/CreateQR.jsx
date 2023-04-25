import React, { useState, useEffect } from "react";
import "./CreateQR.css";
import * as FcIcons from "react-icons/fc";  
import QRCode from "react-qr-code";
import newID from "../../../utils/newID";
import {uploadImage} from "../../../components/MultiUpload";
import axios from "axios";


function CreateQR() {
  const [images, setImages] = useState([]);
  const [links, setLinks] = useState([]);
  const [img, setImg] = useState([]);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");

  const tokenData = window.localStorage.getItem("token");
  const user = window.localStorage.getItem("userId");
  const userId = window.localStorage.getItem("userId");


  const collectInfo = async () => {
    await fetch("http://localhost:5000/product/add-product", {
      method: "POST",
      crossDomain: true,
      headers: {
        "x-auth-token": tokenData,
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        userId,
        // user,
        name,
        address,
        time,
        images: img,
        description,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data", data);
        console.log("upload img", img);
        window.location.href = "/list";
      });
  };

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

  return (
    <form className="create-qr" onSubmit={collectInfo}>
      <div className="create-qr-container">
        <div className="create-qr-title">
          <h1>Describe a product</h1>
          <h4>Product introduction information</h4>
        </div>
        <div className="fill-qr" >
          <div className="fill-qr-1">
            <div className="product-name-qr">
              <label>
                Product's name <b>(*)</b>
              </label>
              <input
                type="text"
                placeholder="Product's name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="time-qr">
              <label>
                Time <b>(*)</b>
              </label>
              <input
                type="date"
                // pattern="\d{2}-\d{2}-\d{4}"
                placeholder="3 months"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="fill-qr-2">
            <div className="address-qr">
              <label>
                Address <b>(*)</b>
              </label>
              <input
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
            <label>
              Image <b>(*)</b>
            </label>

            <div className="image-qr">
              <div>
                <input
                  type="file"
                  className="image-field"
                  multiple 
                  onChange= {(e)=> setImages(e.target.files)}
                />
                <button
                  type="button"
                  // className="btn-confirm"
                  onClick={upload}
                > 
                Upload
                </button>
              </div>
              { 
                links && links.length > 0 && links.length < 3 && links.map(link => {
                  return (
                    <div className="images-link" key={link?.publicId}>
                      <img className="image" src={link?.url}  width={190} height={170} />
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
        <div className="describe-qr">
          <label>
            Describe information<b>(*)</b>
          </label>
          <textarea
            placeholder="Describe information"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="note-qr">
          <p>
            <b>(*)</b>: Required information
          </p>
          <button
            type="button"
            // className="btn-confirm"
            onClick={collectInfo}
          > 
          Confirm
          </button>
        </div>
      </div>
      {
        console.log(img)
      }
    </form>
  );
}

export default CreateQR;
