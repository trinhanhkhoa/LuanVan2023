import React, { useState } from "react";
import "./EnCreateProcess.css";
import { Link } from "react-router-dom";
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
import { uploadImage } from "../../../components/MultiUpload";
import dayjs from "dayjs";
import Loading from "../../../components/Loading";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import StageProcess from "../Stages/StageProcess";
import StagePlantSeeds from "../Stages/StagePlantSeeds";
import StagePlantCare from "../Stages/StagePlantCare";
import StageBloom from "../Stages/StageBloom";
import StageCover from "../Stages/StageCover";
import StageHarvest from "../Stages/StageHarvest";
import StageSell from "../Stages/StageSell";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const defaultTheme = createTheme();

function EnCreateProcess() {
  const tokenData = window.localStorage.getItem("token");
  const [loading, setLoading] = useState(false);
  const [snackbarState, setSnackbarState] = useState(false);

  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;
  const [value, setValue] = useState(dayjs(date));

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

    const handleSubmit = async (e) => {
      e.preventDefault();

      const userId = JSON.parse(window.localStorage.getItem("user"))._id;
      setLoading(true);

      await fetch(`${process.env.REACT_APP_API}/process/add-process`, {
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
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("BE", data);
          // console.log(time);
          setLoading(false);

          setSnackbarState(true);

          setTimeout(() => {
            // window.location.href = "/listofprocesses";
          }, 1500);
        });
    };

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
    <Container sx={{ minHeight: "80vh", }}>
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <Container component="main" maxWidth="lg" sx={{ mb: 4 }}>
          <Paper
            variant="outlined"
            sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 }, borderRadius: 2 }}
          >
            <Box sx={{ marginBottom: "10px", textAlign: "left" }}>
              <Typography
                variant="h4"
                sx={{
                  fontSize: { xs: "30px", md: "48px" },
                  fontWeight: 700,
                }}
              >
                Mô tả thông tin quy trình
              </Typography>
              {/* <Typography
                variant="h6"
                sx={{ fontSize: { xs: "18px", md: "28px" } }}
              >
                Thông tin chung
              </Typography> */}
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
                <Typography variant="subtitle1">
                  Your order number is #2001539. We have emailed your order
                  confirmation, and will send you an update when your order has
                  shipped.
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
                      onClick={handleSubmit}
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

export default EnCreateProcess;
