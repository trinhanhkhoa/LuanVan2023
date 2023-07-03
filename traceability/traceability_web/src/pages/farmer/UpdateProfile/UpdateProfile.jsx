import React, { useState, useEffect } from "react";
import Loading from "../../../components/Loading";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Card, InputAdornment } from "@mui/material";
import avatarImg from "../../../asserts/logo.png";

const theme = createTheme();

function UpdateProfile(props) {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const tokenData = window.localStorage.getItem("token");

  const getProfile = async () => {
    setLoading(true);

    await fetch(`${process.env.REACT_APP_API}/getAnAuth`, {
      method: "GET",
      headers: {
        "x-auth-token": tokenData,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data);
        setName(data.data.name);
        setEmail(data.data.email);
        // setUserType(data.data.userType);
      });
    setLoading(false);
  };
  useEffect(() => {
    getProfile();
  }, []);

  const handleUpdate = async () => {
    setLoading(true);

    await fetch(`${process.env.REACT_APP_API}/updateProfile`, {
      method: "PUT",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "x-auth-token": tokenData,
      },
      body: JSON.stringify({
        email,
        name
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setLoading(false);
        window.location.href = "/profile";
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ maxWidth: "100%" }}>
        <Loading loading={loading} />

        <CssBaseline />
        <Box
          noValidate
          sx={{
            ml: 1,
            mr: 3,
            mb: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TextField
            margin="normal"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">Tên</InputAdornment>
              ),
            }}
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <TextField
            margin="normal"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">Email</InputAdornment>
              ),
            }}
            value={email}
            onChange={(e, newValue) => {
              setEmail(newValue);
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="warning"
            onClick={handleUpdate}
            sx={{
              borderRadius: "5px",
              mt: 2,
            }}
          >
            Xác nhận
          </Button>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default UpdateProfile;
