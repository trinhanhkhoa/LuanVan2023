import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";
import ExpandLessRoundedIcon from "@mui/icons-material/ExpandLessRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import "./ProductTracking.css";

import { IconButton } from "@mui/material";

import ReactReadMoreReadLess from "react-read-more-read-less";

export default function ProductTracking(props) {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);

  const { id } = props;

  const params = useParams();

  const tokenData = window.localStorage.getItem("token");
  const user = window.localStorage.getItem("userId");
  const userId = window.localStorage.getItem("userId");

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
        // console.log(token);
        // setToken(data);
        console.log("token", data);
      });
  };

  const getTracking = () => {
    fetch(`http://localhost:5000/product/get-product/${id}`, {
      method: "GET",
      headers: {
        "x-auth-token": tokenData,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data", data.data.tracking);
        setData(data.data.tracking);
      });
  };

  useEffect(() => {
    tokenIsValid();
    getTracking();
  }, []);

  return (
    <Box
      className="product-tracking"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minWidth: 500,
      }}
    >
  
      <Stepper orientation="vertical">
        {data.length != 0 ? data.map((item, index) => (
          <Step key={index}>
            <Box>
              <StepLabel>Name: {item.name}</StepLabel>
              <Box>
                <Typography>Time: {item.time}</Typography>
                <Typography>Address: {item.address}</Typography>
                <Typography>Url etherscan: etherscan.com</Typography>

                <Box>
                  {item.images &&
                    item.images.map((image, idx) => {
                      return <img src={image} height={200} />;
                    })}
                </Box>
                <Typography>
                  {" "}
                  Description:{" "}
                  <ReactReadMoreReadLess
                    readMoreClassName="readMoreClassName"
                    readLessClassName="readMoreClassName"
                    charLimit={50}
                    readMoreText={<ExpandMoreRoundedIcon />}
                    readLessText={<ExpandLessRoundedIcon />}
                  >
                    {item.description}
                  </ReactReadMoreReadLess>{" "}
                </Typography>
              </Box>
            </Box>
          </Step>
        )): <Typography> Have not updated any tracking yet! </Typography> }
      </Stepper>
      {/* : <Typography> null </Typography>} */}
    </Box>
  );
}
