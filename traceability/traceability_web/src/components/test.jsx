// import React, { useState } from "react";
// import CssBaseline from "@mui/material/CssBaseline";
// import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
// import Container from "@mui/material/Container";
// import Toolbar from "@mui/material/Toolbar";
// import Paper from "@mui/material/Paper";
// import Stepper from "@mui/material/Stepper";
// import Step from "@mui/material/Step";
// import StepLabel from "@mui/material/StepLabel";
// import Button from "@mui/material/Button";
// import Link from "@mui/material/Link";
// import Typography from "@mui/material/Typography";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import StageProcess from "../pages/engineer/EnCreateProcess/StageProcess";
// import StagePlantSeeds from "../pages/engineer/EnCreateProcess/StagePlantSeeds";
// import StageCover from "../pages/engineer/EnCreateProcess/StageCover";
// import StageBloom from "../pages/engineer/Stages/StageBloom";
// import StageSell from "../pages/engineer/EnCreateProcess/StageSell";
// import StageHarvest from "../pages/engineer/EnCreateProcess/StageHarvest";

// // import PaymentForm from './PaymentForm';
// // import Review from './Review';

// function Copyright() {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center">
//       {"Copyright © "}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{" "}
//       {new Date().getFullYear()}
//       {"."}
//     </Typography>
//   );
// }

// // TODO remove, this demo shouldn't need to reset the theme.
// const defaultTheme = createTheme();

// export default function Checkout() {
//   const [activeStep, setActiveStep] = React.useState(0);
//   const [name, setName] = useState("");
//   const [time, setTime] = useState("");
//   const [description, setDescription] = useState("");
//   const [images, setImages] = useState([]);
//   const [links, setLinks] = useState([]);
//   const [img, setImg] = useState([]);
//   const [data, setData] = useState({
//     stageProcess: {
//       name: "",
//       description: "",
//       images: [],
//       timeCreate: "",
//     },
//     stagePlantSeeds: { name: "", description: "" },
//     stagePlantCare: { name: "", description: "", water: "", fertilizer: "" },
//     stageBloom: { name: "", description: "" },
//     stageCover: { name: "", description: "" },
//     stageHarvest: { name: "", description: "", quantity: "" },
//     stageSell: { name: "", description: "", purchasingUnit: "" },
//   });

//   const handleNext = () => {
//     setActiveStep(activeStep + 1);
//     console.log("data", data);
//   };

//   const handleBack = () => {
//     setActiveStep(activeStep - 1);
//   };

//   const steps = [
//     "Create process",
//     "Plant seeds",
//     "Bloom",
//     "Cover",
//     "Harvest",
//     "Sell",
//   ];

//   const getStepContent = (step) => {
//     switch (step) {
//       case 0:
//         return <StageProcess data={data} setData={setData} />;
//       case 1:
//         return <StagePlantSeeds data={data} setData={setData} />;
//       case 2:
//         return <StageBloom data={data} setData={setData} />;
//       case 3:
//         return <StageCover data={data} setData={setData} />;
//       case 4:
//         return <StageHarvest data={data} setData={setData} />;
//       case 5:
//         return <StageSell data={data} setData={setData} />;
//       default:
//         throw new Error("Unknown step");
//     }
//   };

//   return (
//     <ThemeProvider theme={defaultTheme}>
//       <CssBaseline />
//       <AppBar
//         position="absolute"
//         color="default"
//         elevation={0}
//         sx={{
//           position: "relative",
//           borderBottom: (t) => `1px solid ${t.palette.divider}`,
//         }}
//       >
//         <Toolbar>
//           <Typography variant="h6" color="inherit" noWrap>
//             Company name
//           </Typography>
//         </Toolbar>
//       </AppBar>
//       <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
//         <Paper
//           variant="outlined"
//           sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
//         >
//           <Box sx={{ marginBottom: "10px", textAlign: "left" }}>
//             <Typography
//               variant="h3"
//               sx={{
//                 fontSize: { xs: "30px", md: "48px" },
//                 fontWeight: 700,
//               }}
//             >
//               Describe a process
//             </Typography>
//             <Typography
//               variant="h6"
//               sx={{ fontSize: { xs: "18px", md: "30px" } }}
//             >
//               Process introduction information
//             </Typography>
//           </Box>
//           <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
//             {steps.map((label) => (
//               <Step key={label}>
//                 <StepLabel>{label}</StepLabel>
//               </Step>
//             ))}
//           </Stepper>
//           {activeStep === steps.length ? (
//             <React.Fragment>
//               <Typography variant="h5" gutterBottom>
//                 Thank you for your order.
//               </Typography>
//               <Typography variant="subtitle1">
//                 Your order number is #2001539. We have emailed your order
//                 confirmation, and will send you an update when your order has
//                 shipped.
//               </Typography>
//             </React.Fragment>
//           ) : (
//             <React.Fragment>
//               {getStepContent(activeStep)}
//               <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
//                 {activeStep !== 0 && (
//                   <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
//                     Back
//                   </Button>
//                 )}

//                 <Button
//                   variant="contained"
//                   onClick={handleNext}
//                   sx={{ mt: 3, ml: 1 }}
//                 >
//                   {activeStep === steps.length - 1 ? "Submit" : "Next"}
//                 </Button>
//               </Box>
//             </React.Fragment>
//           )}
//         </Paper>
//         <Copyright />
//       </Container>
//     </ThemeProvider>
//   );
// }
