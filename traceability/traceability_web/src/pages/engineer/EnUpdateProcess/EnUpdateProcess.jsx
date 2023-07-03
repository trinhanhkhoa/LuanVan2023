import React, { useState, useEffect } from "react";
import "./EnUpdateProcess.css";
import * as FcIcons from "react-icons/fc";
import { Link, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Step,
  Stepper,
  StepLabel,
  Paper,
  Typography,
  CssBaseline,
} from "@mui/material";
import dayjs from "dayjs";
import moment from "moment";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import StageProcess from "../Stages/StageProcess";
import StagePlantSeeds from "../Stages/StagePlantSeeds";
import StagePlantCare from "../Stages/StagePlantCare";
import StageBloom from "../Stages/StageBloom";
import StageCover from "../Stages/StageCover";
import StageHarvest from "../Stages/StageHarvest";
import StageSell from "../Stages/StageSell";

const defaultTheme = createTheme();

function EnUpdateProcess() {
  const [isOpen, setIsOpen] = useState(false);
  const [getData, setGetData] = useState({
    stageProcess: {
      name: "",
      description: "",
      images: [],
      timeCreate: "",
    },
    stagePlantSeeds: { name: "", description: "" },
    stagePlantCare: { name: "", description: "", water: "", fertilizer: "" },
    stageBloom: { name: "", description: "" },
    stageCover: { name: "", description: "" },
    stageHarvest: { name: "", description: "", quantity: "" },
    stageSell: { name: "", description: "", purchasingUnit: "" },
  });

  const [activeStep, setActiveStep] = useState(0);
  const [data, setData] = useState({
    stageProcess: {
      name: "",
      description: "",
      images: [],
      timeCreate: "",
    },
    stagePlantSeeds: { name: "", description: "" },
    stagePlantCare: { name: "", description: "", water: "", fertilizer: "" },
    stageBloom: { name: "", description: "" },
    stageCover: { name: "", description: "" },
    stageHarvest: { name: "", description: "", quantity: "" },
    stageSell: { name: "", description: "", purchasingUnit: "" },
  });

  const params = useParams();

  const tokenData = window.localStorage.getItem("token");
  const userId = window.localStorage.getItem("userId");

  const getInfoProcess = async () => {
    const data = await fetch(
      `${process.env.REACT_APP_API}/process/get-process/${params.id}`,
      {
        method: "GET",
        headers: {
          "x-auth-token": tokenData,
        },
      }
    )
      .then((res) => res.json())
      .then((res) => res.data);
    // console.log(data);
    setData(data);
    // setName(data.stageProcess.name);
    // setDescription(data.stageProcess.description);
    // setTime(data.stageProcess.time);
    // setAddress(data.data.address);
    // setImages(data.data.images);
  };

  const handleUpdate = async () => {
    await fetch(
      `${process.env.REACT_APP_API}/process/update-process/${params.id}`,
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
          stageProcess: {
            name: data.stageProcess.name,
            description: data.stageProcess.description,
            images: data.stageProcess.images,
            timeCreate: data.stageProcess.timeCreate,
          },
          stagePlantSeeds: {
            name: data.stagePlantSeeds.name,
            description: data.stagePlantSeeds.description,
          },
          stagePlantCare: {
            name: data.stagePlantCare.name,
            description: data.stagePlantCare.description,
            water: data.stagePlantCare.water,
            fertilizer: data.stagePlantCare.fertilizer,
          },
          stageBloom: {
            name: data.stageBloom.name,
            description: data.stageBloom.description,
          },
          stageCover: {
            name: data.stageCover.name,
            description: data.stageCover.description,
          },
          stageHarvest: {
            name: data.stageHarvest.name,
            description: data.stageHarvest.description,
            quantity: data.stageHarvest.quantity,
          },
          stageSell: {
            name: data.stageSell.name,
            description: data.stageSell.description,
            purchasingUnit: data.stageSell.purchasingUnit,
          },
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        window.location.href = "/listofprocesses";
      });
  };

  useEffect(() => {
    getInfoProcess();
  }, []);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
    console.log("data", data);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const steps = [
    "Thông tin chung",
    "Giai đoạn 1",
    "Giai đoạn chăm sóc",
    "Giai đoạn 2",
    "Giai đoạn 3",
    "Giai đoạn 4",
    "Giai đoạn 5",
  ];

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <StageProcess data={data} setData={setData} />;
      case 1:
        return <StagePlantSeeds data={data} setData={setData} />;
      case 2:
        return <StagePlantCare data={data} setData={setData} />;
      case 3:
        return <StageBloom data={data} setData={setData} />;
      case 4:
        return <StageCover data={data} setData={setData} />;
      case 5:
        return <StageHarvest data={data} setData={setData} />;
      case 6:
        return <StageSell data={data} setData={setData} />;
      default:
        throw new Error("Unknown step");
    }
  };

  return (
    <Container sx={{ minHeight: "80vh",}}>
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <Container component="main" maxWidth="lg" sx={{ mb: 4 }}>
          <Paper
            variant="outlined"
            sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
          >
            <Box sx={{ marginBottom: "10px", textAlign: "left" }}>
              <Typography
                variant="h3"
                sx={{
                  fontSize: { xs: "30px", md: "40px" },
                  fontWeight: 500,
                }}
              >
                Cập nhật thông tin chung
              </Typography>
            </Box>
            <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Quay lại
                    </Button>
                  )}

                  {activeStep === steps.length - 1 ? (
                    <Button
                      type="Submit"
                      variant="contained"
                      onClick={handleUpdate}
                      sx={{ mt: 3, ml: 1 }}
                    >
                      Xác nhận
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{ mt: 3, ml: 1 }}
                    >
                      Tiếp theo
                    </Button>
                  )}
                </Box>
              </React.Fragment>
            )}
          </Paper>
        </Container>
      </ThemeProvider>
    </Container>
  );
}

export default EnUpdateProcess;
