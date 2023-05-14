import React, { useState, useEffect } from "react";
import "./CreateQR.css";
import * as FcIcons from "react-icons/fc";
import QRCode from "react-qr-code";
import newID from "../../../utils/newID";
import { uploadImage } from "../../../components/MultiUpload";
import axios from "axios";
import Carousel from "react-elastic-carousel";
import { TextField, TextareaAutosize } from "@mui/material";

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
      let imgArr = [];
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
  };

  return (
    <form className="create-qr" onSubmit={collectInfo}>
      <div className="create-qr-container">
        <div className="create-qr-title">
          <h1>Describe a product</h1>
          <h4>Product introduction information</h4>
        </div>
        <div className="fill-qr">
          <div className="fill-qr-1">
            <div className="product-name-qr">
              <label>
                Product's name <b>(*)</b>
              </label>
              <TextField
                placeholder="Product's name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                sx={{ width: "100%", borderRadius: '20%' }}
              />
            </div>
            <div className="time-qr">
              <label>
                Time <b>(*)</b>
              </label>
              <TextField
                variant="outlined"
                type="date"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                sx={{ width: "100%", borderRadius: '20%' }}
              />
            </div>
          </div>
          <div className="fill-qr-2">
            <div className="address-qr">
              <label>
                Address <b>(*)</b>
              </label>
              <TextField
                variant="outlined"
                placeholder="Product's name"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                sx={{ width: "100%", borderRadius: '20%' }}
              />
            </div>

            <div className="image-qr">
              <label>
                Image <b>(*)</b>
              </label>
              <div>
                <input
                  type="file"
                  className="image-field"
                  multiple
                  onChange={(e) => setImages(e.target.files)}
                />
                <button type="button" className="btn-confirm" onClick={upload}>
                  Upload
                </button>
              </div>
              {links.length > 0 ? (
                <Carousel>
                  {links &&
                    links.map((link) => {
                      return (
                        <div className="images-link" key={link?.publicId}>
                          <img
                            className="image"
                            src={link?.url}
                            width={190}
                            height={170}
                          />
                        </div>
                      );
                    })}
                </Carousel>
              ) : null}
            </div>
          </div>
        </div>
        <div className="describe-qr">
          <label>
            Describe information<b>(*)</b>
          </label>
          <TextareaAutosize
              maxRows={20}
              aria-label="maximum height"
              // placeholder="Maximum 4 rows"
              style={{ width: "100%", minHeight: '200px' }}
            />
        </div>
        <div className="note-qr">
          <p>
            <b>(*)</b>: Required information
          </p>
          <button type="button" className="btn-confirm" onClick={collectInfo}>
            Confirm
          </button>
        </div>
      </div>
    </form>
  );
}

export default CreateQR;
