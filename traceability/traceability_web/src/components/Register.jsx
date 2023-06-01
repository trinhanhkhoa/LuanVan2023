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
  InputLabel,
  Radio,
  RadioGroup,
  Snackbar,
} from "@mui/material";
import login_background from "../asserts/login_bg.jpg";
import { useForm, Form } from "./Try/useForm";

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
  const [isShown, setIsShown] = useState(false);

  const tokenData = window.localStorage.getItem("token");

  const togglePassword = () => {
    setIsShown((isShown) => !isShown);
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
                          // error={errors.secretKey}
                          // helperText={errors.secretKey}
                          fullWidth
                          label="Secret Key"
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
                        label="Full Name"
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
                        label="Email Address"
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
                        // error={isError}
                        fullWidth
                        label="Password"
                        type={isShown ? "text" : "password"}
                        name="password"
                        value={password}
                        // error={errors.password}
                        // helperText={errors.password}
                        onChange={(e) => setPassword(e.target.value)}
                        // autoComplete="new-password"
                        autoComplete="off"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={isShown}
                            onChange={togglePassword}
                            color="primary"
                          />
                        }
                        label={
                          <InputLabel style={{ color: "#000" }}>
                            Show password
                          </InputLabel>
                        }
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
