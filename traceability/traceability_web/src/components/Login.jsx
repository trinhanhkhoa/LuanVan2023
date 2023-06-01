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
import { Card, InputLabel, Snackbar } from "@mui/material";
import Register from "./Register";
import login_background from "../asserts/login_bg.jpg";
import Loading from "./Loading";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbarState, setSnackbarState] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);

    await fetch("https://backend.teamluanvan.software/signin", {
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
        console.log(data.userType, "userRegister");
        setLoading(false);

        if (data.userType == "Admin" || data.userType == "admin") {
          console.log("user json: ", data);
          window.localStorage.setItem("user", JSON.stringify(data));
          window.localStorage.setItem("userId", data._id);
          window.localStorage.setItem("token", data.token);
          window.localStorage.setItem("signedIn", true);
          window.localStorage.setItem("userType", data.userType);
          setSnackbarState(true);
          setIsValid(true);

          setTimeout(() => {
            window.location.href = "/enhome";
          }, 1500);
        } else if (data.userType == "User" || data.userType == "user" || data.userType == "Farmer" || data.userType == "farmer") {
          window.localStorage.setItem("user", JSON.stringify(data));
          window.localStorage.setItem("userId", data._id);
          window.localStorage.setItem("token", data.token);
          window.localStorage.setItem("signedIn", true);
          window.localStorage.setItem("userType", data.userType);
          setSnackbarState(true);
          setIsValid(true);

          setTimeout(() => {
            window.location.href = "/home";
          }, 1500);
        } else {
          setSnackbarState(true);
          setIsValid(false);
        }
      });
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
        <Loading loading={loading} />

        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              display: "flex",
            }}
          >
            <Card
              sx={{
                marginTop: "50%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba(255, 255, 255, .4)",
                padding: "30px",
                borderRadius: "10px",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5" color="black">
                Welcome to website!
              </Typography>
              <Typography
                component="h3"
                variant="h5"
                fontStyle={"italic"}
                fontSize={"15px"}
                color="black"
              >
                Please enter your account
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label={
                    <InputLabel style={{ color: "#000" }}>
                      Remember me
                    </InputLabel>
                  }
                />
                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={handleSubmit}
                >
                  Sign In
                  {/* <Link href='/' underline="none" color="white">Sign In</Link> */}
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="/signup" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Card>
          </Box>
          <Snackbar
            open={snackbarState}
            autoHideDuration={1000}
            // anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          >
            {isValid == true ? (
              <Alert severity="success" sx={{ width: "100%" }}>
                Login successfull !!!
              </Alert>
            ) : (
              <Alert severity="error" sx={{ width: "100%" }}>
                Incorrect email or password !!!
              </Alert>
            )}
          </Snackbar>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </Box>
    </ThemeProvider>
  );
}
