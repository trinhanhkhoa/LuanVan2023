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
} from "@mui/material";
import login_background from "../asserts/login_bg.jpg";
import { useForm, Form } from "./Try/useForm";
import KeyRoundedIcon from "@mui/icons-material/KeyRounded";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import PermIdentityRoundedIcon from '@mui/icons-material/PermIdentityRounded';
import MailRoundedIcon from '@mui/icons-material/MailRounded';

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
      fetch("https://backend.teamluanvan.software/signup", {
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
      <Box
        style={{
          backgroundImage: `url(${login_background})`,
          backgroundSize: "cover",
          height: "100vh",
        }}
      >
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              display: "flex",
              width: "500px",
            }}
          >
            <Card
              sx={{
                marginTop: "35%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba(255, 255, 255, .4)",
                borderRadius: "10px",
              }}
            >
              <Avatar sx={{ m: 2, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5" color="black">
                Sign up
              </Typography>

              <Box sx={{ m: 5 }}>
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
                          value={secretKey}
                          type={showKey ? "text" : "password"}

                          // error={errors.secretKey}
                          // helperText={errors.secretKey}
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
                                  {showKey ? (
                                    <VisibilityOff />
                                  ) : (
                                    <Visibility />
                                  )}
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
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PermIdentityRoundedIcon/>
                            </InputAdornment>
                          ),
                        }}
                        value={name}
                        // error={errors.name}
                        // helperText={errors.name}
                        onChange={(e) => setName(e.target.value)}
                        autoComplete="off"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        // error={isError}
                        fullWidth
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <MailRoundedIcon/>
                            </InputAdornment>
                          ),
                        }}
                        name="email"
                        value={email}
                        // error={errors.email}
                        // helperText={errors.email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="off"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={password}
                        // error={errors.password}
                        // helperText={errors.password}
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
                                {showPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    {/* <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox value="allowExtraEmails" color="primary" />
                      }
                      label={
                        <InputLabel style={{ color: "#000" }}>
                          I agree with Terms and Conditions
                        </InputLabel>
                      }
                    />
                  </Grid> */}
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
            </Card>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </Box>
    </ThemeProvider>
  );
}
