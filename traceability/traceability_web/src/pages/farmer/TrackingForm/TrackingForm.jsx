import React, { useState, useEffect } from "react";
// import "./TrackingForm.css";
import * as FcIcons from "react-icons/fc";
import QRCode from "react-qr-code";
import newID from "../../../utils/newID";
import { uploadImage } from "../../../components/MultiUpload";
import axios from "axios";
import {
  Box,
  Button,
  Container,
  ImageList,
  ImageListItem,
  TextField,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import moment from "moment";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";


function TrackingForm() {
  const [images, setImages] = useState([]);
  const [links, setLinks] = useState([]);
  const [img, setImg] = useState([]);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");

  const params = useParams();

  const tokenData = window.localStorage.getItem("token");
  const user = window.localStorage.getItem("userId");
  const userId = window.localStorage.getItem("userId");

  const collectInfo = async () => {
    await fetch(`http://localhost:5000/tracking/add-tracking/${params.id}`, {
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
        user,
        name,
        time,
        address,
        images: img,
        description,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data", data);
        console.log("upload img", img);
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
    <Container fixed sx={{ justifyContent: "center", alignItems: "center" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          maxWidth: "100%",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box
            sx={{ display: "flex", flexDirection: "column", marginBottom: 2 }}
          >
            <label>
              Tracking progress <b>(*)</b>
            </label>
            <TextField
              variant="outlined"
              placeholder="Tracking progress"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{ width: 500, borderRadius: "20%" }}
            />
          </Box>
          <Box
            sx={{ display: "flex", flexDirection: "column", marginBottom: 2 }}
          >
            <label>
              Time <b>(*)</b>
            </label>
            <TextField
              variant="outlined"
              type="date"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              sx={{ width: 500, borderRadius: "20%" }}
            />
          </Box>
          <Box
            sx={{ display: "flex", flexDirection: "column", marginBottom: 2 }}
          >
            <label>
              Address <b>(*)</b>
            </label>
            <TextField
              variant="outlined"
              placeholder="Address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              sx={{ width: 500, borderRadius: "20%" }}
            />
          </Box>
          <Box
            sx={{ display: "flex", flexDirection: "column", marginBottom: 2 }}
          >
            <label>
              Image <b>(*)</b>
            </label>
            <input
              type="file"
              multiple
              // hidden
              onChange={(e) => setImages(e.target.files)}
            />
            <ImageList
              sx={{ width: 600, height: 200 }}
              cols={3}
              rowHeight={164}
            >
              {links &&
                links.map((item, index) => {
                  return (
                    <ImageListItem key={index}>
                      <img src={item} width={200} height={200} />
                    </ImageListItem>
                  );
                })}
            </ImageList>
            <Button
              variant="contained"
              color="success"
              sx={{ borderRadius: "10px", marginTop: 2, width: 100 }}
              onClick={upload}
            >
              Upload
            </Button>
          </Box>
          <Box
            sx={{ display: "flex", flexDirection: "column", marginBottom: 2 }}
          >
            <label>
              Describe information <b>(*)</b>
            </label>
            <TextareaAutosize
              maxRows={20}
              aria-label="maximum height"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ width: "100%", minHeight: "100px" }}
            />
          </Box>
        </Box>
      </Box>
      <Box
        m={1} //margin
        display="flex"
        justifyContent="flex-end"
        alignItems="flex-end"
      >
        <Button
          variant="contained"
          color="warning"
          sx={{ borderRadius: "10px" }}
          onClick={collectInfo}
        >
          Confirm
        </Button>
      </Box>
    </Container>
  );
}

export default TrackingForm;
