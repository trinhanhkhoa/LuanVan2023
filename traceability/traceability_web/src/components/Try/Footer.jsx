import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import hcmuslogo from "../../asserts/fit-logo-kem-truong.png";
import logo from "../../asserts/logo2-removebg-preview.png";
import { Grid, ImageList } from "@mui/material";

function Copyright() {
  return (
    <Box>
      <Container>
        <Typography
          sx={{ fontSize: { xs: "12px", md: "14px" } }}
          variant="body1"
          color="black"
        >
          Traceability agriculture
        </Typography>
        <Typography
          sx={{ fontSize: { xs: "12px", md: "14px" } }}
          variant="body2"
          color="black"
        >
          {"Copyright © "}
          <Link color="inherit" href="https://mui.com/">
            Traceability agriculture
          </Link>{" "}
          {new Date().getFullYear()}
          {"."}
        </Typography>
      </Container>
    </Box>
  );
}

export default function StickyFooter() {
  const userType = window.localStorage.getItem("userType");

  return (
    <Box>
      <CssBaseline />
      <Box
        component="footer"
        sx={
          (userType == "admin" || userType == "Admin")
            ? {
                py: 2,
                px: 2,
                backgroundColor: "#fff59d",
                mt: "auto",
                width: "100%",
              }
            : {
                py: 2,
                // px: 2,
                mt: "auto",

                backgroundColor: "#aed581",
                width: "100%",
              }
        }
      >
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid>
            <img src={logo} width={100} height={100} />
            <img src={hcmuslogo} width={150} height={50} />
          </Grid>
          <Copyright />
        </Grid>
      </Box>
    </Box>
  );
}
