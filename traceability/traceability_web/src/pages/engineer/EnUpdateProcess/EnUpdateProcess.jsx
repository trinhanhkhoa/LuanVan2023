import React, { useState, useEffect } from "react";
import "./EnUpdateProcess.css";
import * as FcIcons from "react-icons/fc";
import { Link, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Grid,
  ImageList,
  ImageListItem,
  TextField,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import moment from "moment";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

function EnUpdateProcess() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [images, setImages] = useState([]);

  const params = useParams();

  const tokenData = window.localStorage.getItem("token");
  const userId = window.localStorage.getItem("userId");

  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;
  const [value, setValue] = useState(dayjs(date));

  const tokenIsValid = () => {
    fetch("https://backend.teamluanvan.software/tokenIsValid", {
      method: "POST",
      crossDomain: true,
      headers: {
        "x-auth-token": tokenData,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("token", data);
      });
  };

  const getInfoProcess = () => {
    fetch(
      `https://backend.teamluanvan.software/process/get-process/${params.id}`,
      {
        method: "GET",
        headers: {
          "x-auth-token": tokenData,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setName(data.data.name);
        setDescription(data.data.description);
        setTime(data.data.time);
        setAddress(data.data.address);
        setImages(data.data.images);

        console.log(data.data);
      });
  };

  const putInfoProcess = () => {
    fetch(
      `https://backend.teamluanvan.software/process/update-process/${params.id}`,
      {
        method: "PUT",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": tokenData,
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          userId,
          name,
          time: value,
          description,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        window.location.href = "/listofprocesses";
      });
  };

  useEffect(() => {
    tokenIsValid();
    getInfoProcess();
  }, []);

  return (
    <Container
      fixed
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: 800,
      }}
    >
      <Box sx={{ marginBottom: "10px" }} onSubmit={putInfoProcess}>
        <Typography
          variant="h3"
          sx={{
            fontSize: { xs: "30px", md: "48px" },
            fontWeight: 700,
          }}
        >
          Update product
        </Typography>
        <Typography variant="h6" sx={{ fontSize: { xs: "18px", md: "30px" } }}>
          Product introduction information
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          margin: { xs: "0", md: "20px" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            marginLeft: { xs: 0, md: 5 },
          }}
        >
          <Box
            sx={{ display: "flex", flexDirection: "column", marginBottom: 2 }}
          >
            <label>
              Product's name <b>(*)</b>
            </label>
            <TextField
              required
              variant="outlined"
              placeholder="Product's name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{ width: { xs: 400, md: 800 }, borderRadius: "20%" }}
            />
          </Box>
          <Box
            sx={{ display: "flex", flexDirection: "column", marginBottom: 2 }}
          >
            <label>
              Time <b>(*)</b>
            </label>
            <TextField
              required
              variant="outlined"
              type="date"
              value={time}
              format="DD/MM/YYYY"
              onChange={(e) => setTime(e.target.value)}
              sx={{ width: { xs: 400, md: 800 }, borderRadius: "20%" }}
            />
          </Box>

          <Box
            sx={{ display: "flex", flexDirection: "column", marginBottom: 2 }}
          >
            <label>
              Address <b>(*)</b>
            </label>
            <TextField
              required
              variant="outlined"
              placeholder="Address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              sx={{ width: { xs: 400, md: 800 }, borderRadius: "20%" }}
            />
          </Box>

          <Box
            sx={{ display: "flex", flexDirection: "column", marginBottom: 2 }}
          >
            <label>
              Image <b>(*)</b>
            </label>
            <input
              required
              type="file"
              // className="image-field"
              multiple
              hidden
              onChange={(e) => setImages(e.target.files)}
            />
            <ImageList
              sx={{ width: { xs: 400, md: 400 }, height: 200 }}
              cols={3}
              rowHeight={164}
            >
              {images.map((item, index) => {
                return (
                  <ImageListItem key={index}>
                    <img src={item} width={200} height={200} />
                  </ImageListItem>
                );
              })}
            </ImageList>
          </Box>
          <Box
            sx={{ display: "flex", flexDirection: "column", marginBottom: 2 }}
          >
            <label>
              Describe information <b>(*)</b>
            </label>
            <Box sx={{ width: { xs: 400, md: "100%" } }}>
              <TextareaAutosize
                required
                maxRows={20}
                aria-label="maximum height"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{ width: "100%", minHeight: "100px" }}
              />
            </Box>
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
          type="submit"
          variant="contained"
          color="warning"
          sx={{ borderRadius: "10px" }}
          onClick={putInfoProcess}
        >
          Confirm
        </Button>
      </Box>
    </Container>
  );
}

export default EnUpdateProcess;
