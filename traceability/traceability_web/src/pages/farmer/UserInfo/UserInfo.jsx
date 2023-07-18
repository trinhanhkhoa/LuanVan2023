import React, { useState, useEffect } from "react";
import "./UserInfo.css";
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
import Popup from "../../../components/Popup";
import UpdateProfile from "../UpdateProfile/UpdateProfile";

const theme = createTheme();

export default function UserInfo() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [dataProcess, setDataProcess] = useState(0);
  const [dataProduct, setDataProduct] = useState(0);
  const [openPopup, setOpenPopup] = useState(false);

  const tokenData = window.localStorage.getItem("token");
  const id = window.localStorage.getItem("userId");
  const userType = window.localStorage.getItem("userType");

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
    };
    getInfoProcess();
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
        email: data.email,
        name: data.name,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setLoading(false);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Loading loading={loading} />

        <CssBaseline />
        <Typography component="h1" variant="h4" color="black" sx={{ mb: 2 }}>
          THÔNG TIN CÁ NHÂN
        </Typography>
        <Box>
          <Card
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              backgroundColor: "rgba(255, 255, 255, .4)",
              boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
              width: { xs: "24rem", md: "50rem" },
              borderRadius: "10px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                margin: 2,
              }}
            >
              <Avatar
                variant="rounded"
                sx={{
                  width: 200,
                  height: 200,
                  boxShadow:
                    "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
                  mb: 2,
                }}
                src={avatarImg}
              />

              <Button
                type="submit"
                variant="contained"
                color="warning"
                onClick={() => setOpenPopup(true)}
                sx={{
                  borderRadius: "5px",
                  display: { xs: "none", md: "block" },
                }}
              >
                Cập nhật thông tin
              </Button>
              <Popup
                title="Chỉnh sửa thông tin"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
              >
                <UpdateProfile />
              </Popup>
            </Box>

            <Box noValidate sx={{ ml: 1, mr: 3, mb: 1 }}>
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
              <Button
                type="submit"
                variant="contained"
                color="warning"
                onClick={() => setOpenPopup(true)}
                sx={{
                  borderRadius: "5px",
                  display: { xs: "block", md: "none" },
                  mt: 2,
                }}
              >
                Cập nhật thông tin
              </Button>
              <Popup
                title="Chỉnh sửa thông tin"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
              >
                <UpdateProfile />
              </Popup>
            </Box>
          </Card>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
