import React, { useState } from "react";
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
import { createTheme, THEME_ID, ThemeProvider } from "@mui/material/styles";
import {
  Card,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Snackbar,
  Paper,
} from "@mui/material";
import Register from "./Register";
import login_background from "../asserts/login_bg.jpg";
import Loading from "./Loading";
import MuiAlert from "@mui/material/Alert";
import AccountCircle from "@mui/icons-material/AccountCircle";
import KeyRoundedIcon from "@mui/icons-material/KeyRounded";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import avatarImg from "../asserts/logo.png";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const defaultTheme = createTheme();

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://traceability-hcmus.vercel.app/">
        Traceability Agriculture
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbarState, setSnackbarState] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async () => {
    setLoading(true);

    await fetch(`${process.env.REACT_APP_API}/signin`, {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email,
        password,
        userType,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);

        if (data.userType == "Admin" || data.userType == "admin") {
          // console.log("user json: ", data);
          window.localStorage.setItem("user", JSON.stringify(data));
          window.localStorage.setItem("userId", data._id);
          window.localStorage.setItem("token", data.token);
          window.localStorage.setItem("signedIn", true);
          window.localStorage.setItem("userType", data.userType);
          setSnackbarState(true);
          setIsValid(true);

          setTimeout(() => {
            window.location.href = "/enhome";
          }, 1000);
        } else if (
          // data.userType == "User" ||
          // data.userType == "user" ||
          // data.userType == "Nông dân" ||
          data.userType == "Nông dân"
        ) {
          window.localStorage.setItem("user", JSON.stringify(data));
          window.localStorage.setItem("userId", data._id);
          window.localStorage.setItem("token", data.token);
          window.localStorage.setItem("signedIn", true);
          window.localStorage.setItem("userType", data.userType);
          setSnackbarState(true);
          setIsValid(true);

          setTimeout(() => {
            window.location.href = "/home";
          }, 1000);
        } else {
          setSnackbarState(true);
          setIsValid(false);
        }
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />

        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              sx={{ width: 100, height: 100, m: 2, bgcolor: "secondary.main" }}
              src={avatarImg}
            />
            {/* <LockOutlinedIcon /> */}
            {/* </Avatar> */}
            <Typography component="h1" variant="h5">
              Đăng nhập
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountCircle />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>{" "}
                <Grid item xs={12}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    placeholder="Mật khẩu"
                    value={password}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <KeyRoundedIcon />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    type={showPassword ? "text" : "password"}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Grid>
              </Grid>

              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
              <Button
                type="button"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleSubmit}
              >
                Đăng nhập
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Nếu bạn chưa có tài khoản? Vui lòng đăng ký"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random?wallpapers)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </Grid>
      <Snackbar
        open={snackbarState}
        autoHideDuration={1000}
        // anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        {isValid == true ? (
          <Alert severity="success" sx={{ width: "100%" }}>
            Đăng nhập thành công !!!
          </Alert>
        ) : (
          <Alert severity="error" sx={{ width: "100%" }}>
            Mật khẩu hoặc email không đúng !!!
          </Alert>
        )}
      </Snackbar>
    </ThemeProvider>
  );
}
