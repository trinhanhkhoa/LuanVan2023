import React, { useState, useEffect } from "react";
import "./UserInfo.css";
import Loading from "../../../components/Loading";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Card, InputAdornment, InputLabel, Snackbar } from "@mui/material";
import avatarImg from "../../../asserts/logo.png";

const theme = createTheme();

export default function UserInfo() {
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [userType, setUserType] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const tokenData = window.localStorage.getItem("token");
  const id = window.localStorage.getItem("userId");

  const tokenIsValid = async () => {
    setLoading(true);

    await fetch("https://backend.teamluanvan.software/tokenIsValid", {
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
    setLoading(false);
  };

  const getProfile = async () => {
    setLoading(true);

    await fetch(`https://backend.teamluanvan.software/getAnAuth`, {
      method: "GET",
      headers: {
        "x-auth-token": tokenData,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data, "userRegister");
        // setName(data.data.name);
        // setEmail(data.data.email);
        // setUserType(data.data.userType);
        setData(data.data);
      });
    setLoading(false);
  };
  useEffect(() => {
    tokenIsValid();
    getProfile();
  }, []);

  return (
    // <div className="userinfo">
    //   <div className="userinfo-container">
    //     <Loading loading={loading} />

    //     <div className="userinfo-name">
    //       <h1>Name</h1> <h2>{name}</h2>
    //     </div>
    //     <div className="userinfo-email">
    //       <h1>Email</h1> <h2>{email}</h2>
    //     </div>
    //     <div className="userinfo-role">
    //       <h1>Role</h1> <h2>{userType}</h2>
    //     </div>
    //   </div>
    // </div>

    <ThemeProvider theme={theme}>
      <Box
        style={{
          backgroundSize: "cover",
          minHeight: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Loading loading={loading} />

        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box>
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba(255, 255, 255, .4)",
                padding: "30px",
                borderRadius: "10px",
              }}
            >
              <Avatar sx={{ width: 100, height: 100 }} src={avatarImg} />
              <Typography
                component="h1"
                variant="h5"
                color="black"
                sx={{ mt: 2 }}
              >
                Welcome to Profile!
              </Typography>
              <Box noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  fullWidth
                  InputProps={{
                    startAdornment: <InputAdornment position="start">Name</InputAdornment>,
                    readOnly: true,
                  }}
                  value={data.name}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  InputProps={{
                    startAdornment: <InputAdornment position="start">Email</InputAdornment>,
                    readOnly: true,
                  }}
                  value={data.email}
                />

                <TextField
                  margin="normal"
                  fullWidth
                  InputProps={{
                    startAdornment: <InputAdornment position="start">Role</InputAdornment>,
                    readOnly: true,
                  }}
                  value={data.userType}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  InputProps={{
                    startAdornment: <InputAdornment position="start">Products</InputAdornment>,
                    readOnly: true,
                  }}
                  value={data.products}
                />
              </Box>
            </Card>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
