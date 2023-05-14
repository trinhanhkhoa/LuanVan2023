import React, { useState } from "react";
import "./EnCreateProcess.css";
import * as FcIcons from "react-icons/fc";
import { Link } from "react-router-dom";
import newID from "../../../utils/newID";
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
import { uploadImage } from "../../../components/MultiUpload";
import dayjs from "dayjs";
import moment from "moment";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

function EnCreateProcess() {
  const [name, setName] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");

  const [images, setImages] = useState([]);
  const [links, setLinks] = useState([]);
  const [img, setImg] = useState([]);

  const tokenData = window.localStorage.getItem("token");

  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;
  const [value, setValue] = useState(dayjs(date));

  const collectInfo = () => {
    const userId = JSON.parse(window.localStorage.getItem("user"))._id;
    console.log("userId: ", userId);
    console.log(name, time, description);
    fetch("http://localhost:5000/process/add-process", {
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
        name,
        images: img,
        time: value,
        description,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        console.log(time);
        window.location.href = "/listofprocesses";
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
    <Container
      fixed
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: 700,
      }}
    >
      <Box sx={{ marginBottom: "10px" }}>
        <Typography variant="h3">Describe a product</Typography>
        <Typography variant="h6">Product introduction information</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          margin: "20px",
          maxWidth: "100%",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", marginLeft: 5 }}>
          <Box
            sx={{ display: "flex", flexDirection: "column", marginBottom: 2 }}
          >
            <label>
              Product's name <b>(*)</b>
            </label>
            <TextField
              variant="outlined"
              placeholder="Product's name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{ width: 1000, borderRadius: "20%" }}
            />
          </Box>
          <Box
            sx={{ display: "flex", flexDirection: "column", marginBottom: 2 }}
          >
            <label>
              Time <b>(*)</b>
            </label>
            {/* <TextField
              variant="outlined"
              type="date"
              value={date}
              format="DD/MM/YYYY"
              onChange={(e) => setTime(e.target.value)}
              sx={{ width: 1000, borderRadius: "20%" }}
            /> */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  label="Controlled picker"
                  value={value}
                  format="DD/MM/YYYY"
                  onChange={(newValue) => {
                    let newDate = moment.utc(newValue).format("DD-MM-YYYY");
                    console.log("converted date", newDate); // 09/23/21
                    setValue(newDate);
                    // console.log(newValue);
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
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

export default EnCreateProcess;
