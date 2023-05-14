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
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';

import { IconButton } from "@mui/material";

import ReactReadMoreReadLess from "react-read-more-read-less";
const steps = [
  {
    label: "Select campaign settings",
    description: `For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.`,
  },
  {
    label: "Create an ad group",
    description:
      "An ad group contains one or more ads which target a shared set of keywords.",
  },
  {
    label: "Create an ad",
    description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
  },
];

export default function ProductTracking() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);

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
    fetch(`http://localhost:5000/tracking/get-tracking`, {
      method: "GET",
      headers: {
        "x-auth-token": tokenData,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data", data.data);
        setData(data.data);
      });
  };

  useEffect(() => {
    tokenIsValid();
    getTracking();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minWidth: 500,
      }}
    >
      <Stepper orientation="vertical">
        {data.map((item, index) => (
          <Step key={index}>
            <StepLabel>{item.name}</StepLabel>
            <ReactReadMoreReadLess
              readMoreClassName="readMoreClassName"
              readLessClassName="readMoreClassName"
              charLimit={50}
              readMoreText={<ExpandMoreRoundedIcon />}
              readLessText={<ExpandLessRoundedIcon />}
            >
              {item.description}
            </ReactReadMoreReadLess>
            {/* <StepContent>
            
            </StepContent> */}
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
