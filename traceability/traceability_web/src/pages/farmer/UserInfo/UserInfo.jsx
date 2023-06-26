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
  // const [userType, setUserType] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [dataProcess, setDataProcess] = useState(0);
  const [dataProduct, setDataProduct] = useState(0);

  const tokenData = window.localStorage.getItem("token");
  const id = window.localStorage.getItem("userId");
  const userType = window.localStorage.getItem("userType");

  console.log(userType);


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
        console.log(data.data.products.length, "userRegister");
        // setName(data.data.name);
        // setEmail(data.data.email);
        // setUserType(data.data.userType);
        setData(data.data);
        setDataProduct(data.data.products.length);
      });
    setLoading(false);
  };
  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    const getInfoProcess = async () => {
      let data = await fetch(
        `${process.env.REACT_APP_API}/process/get-processes`,
        {
          method: "GET",
          headers: {
            "x-auth-token": tokenData,
          },
        }
      )
        .then((res) => res.json())
        .then((res) => res.data);

      data = data.filter((p) => p.userId == id);
      setDataProcess(data.length);
      console.log(data.length);
    };
    getInfoProcess();
  }, []);

  return (
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
              ></Typography>
              <Box noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">Tên</InputAdornment>
                    ),
                    readOnly: true,
                  }}
                  value={data.name}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">Email</InputAdornment>
                    ),
                    readOnly: true,
                  }}
                  value={data.email}
                />

                <TextField
                  margin="normal"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">Vai trò</InputAdornment>
                    ),
                    readOnly: true,
                  }}
                  value={data.userType}
                />
                {userType === "Admin" || userType === "admin" ? (
                  <TextField
                    margin="normal"
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          Số lượng quy trình
                        </InputAdornment>
                      ),
                      readOnly: true,
                    }}
                    value={dataProcess}
                  />
                ) : (
                  <TextField
                    margin="normal"
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          Số lượng sản phẩm
                        </InputAdornment>
                      ),
                      readOnly: true,
                    }}
                    value={dataProduct}
                  />
                )}
              </Box>
            </Card>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
