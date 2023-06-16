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
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Alert,
  Card,
  IconButton,
  InputAdornment,
  InputLabel,
  Radio,
  RadioGroup,
  Snackbar,
  Paper,
} from "@mui/material";
import login_background from "../asserts/login_bg.jpg";
import { useForm, Form } from "./Try/useForm";
import AccountCircle from "@mui/icons-material/AccountCircle";
import KeyRoundedIcon from "@mui/icons-material/KeyRounded";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import PermIdentityRoundedIcon from "@mui/icons-material/PermIdentityRounded";
import MailRoundedIcon from "@mui/icons-material/MailRounded";
import avatarImg from "../asserts/logo.png";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Traceability Agriculture
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [snackbarState, setSnackbarState] = useState(false);

  const tokenData = window.localStorage.getItem("token");
  const [showPassword, setShowPassword] = useState(false);
  const [showKey, setShowKey] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowKey = () => setShowKey((show) => !show);

  const handleMouseDownKey = (event) => {
    event.preventDefault();
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (userType == "Admin" && secretKey != "12345") {
      alert("Invalid secret key !!!");
    } else {
      console.log(name, email, password);
      fetch(`${process.env.REACT_APP_API}/signup`, {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "x-auth-token": tokenData,
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          userType,
        }),
      })
        .then((res) => {
          res.json();
        })
        .then((data) => {
          window.location.href = "/";
          console.log(userType);
        });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
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
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }} src={avatarImg} />
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <Form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  sx={{ ml: 2 }}
                  defaultValue={"Farmer"}
                >
                  <FormControlLabel
                    value="Farmer"
                    control={<Radio />}
                    onChange={(e) => setUserType(e.target.value)}
                    label="Farmer"
                  />
                  <FormControlLabel
                    value="Admin"
                    control={<Radio />}
                    onChange={(e) => setUserType(e.target.value)}
                    label="Admin"
                  />
                </RadioGroup>
                {userType == "Admin" ? (
                  <Grid item xs={12}>
                    <TextField
                      required
                      name="secretKey"
                      placeholder="Secret Key"
                      value={secretKey}
                      type={showKey ? "text" : "password"}
                      fullWidth
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
                              onClick={handleClickShowKey}
                              onMouseDown={handleMouseDownKey}
                            >
                              {showKey ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      onChange={(e) => setSecretKey(e.target.value)}
                      autoComplete="off"
                    />
                  </Grid>
                ) : null}
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="name"
                    placeholder="Fullname"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PermIdentityRoundedIcon />
                        </InputAdornment>
                      ),
                    }}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="off"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    placeholder="Email"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <MailRoundedIcon />
                        </InputAdornment>
                      ),
                    }}
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="off"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    placeholder="Password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
            </Form>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
