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

  const params = useParams();

  const tokenData = window.localStorage.getItem("token");
  const userId = window.localStorage.getItem("userId");

  
  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;
  const [value, setValue] = useState(dayjs(date));

  const tokenIsValid = () => {
    fetch("http://localhost:5000/tokenIsValid", {
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
    fetch(`http://localhost:5000/process/get-process/${params.id}`, {
      method: "GET",
      headers: {
        "x-auth-token": tokenData,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setName(data.data.name);
        setDescription(data.data.description);
        setTime(data.data.time);

        console.log(data.data);
      });
  };

  const putInfoProcess = () => {
    fetch(`http://localhost:5000/process/update-process/${params.id}`, {
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
    })
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
        minHeight: 700
      }}
    >
      <Box sx={{  marginBottom: "10px" }}>
        <Typography variant="h3">Update product</Typography>
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
              sx={{ width: 800, borderRadius: "20%" }}
            />
          </Box>
          <Box
            sx={{ display: "flex", flexDirection: "column", marginBottom: 2 }}
          >
            <label>
              Time <b>(*)</b>
            </label>
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
          onClick={putInfoProcess}
        >
          Confirm
        </Button>
      </Box>
    </Container>
  );
}

export default EnUpdateProcess;
