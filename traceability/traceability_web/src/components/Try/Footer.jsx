import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import hcmuslogo from "../../asserts/hcmus-logo.png";
import logo from "../../asserts/logo.png";
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
    <Box className="footer">
      <CssBaseline />
      <Box
        component="footer"
        sx={
          userType == "admin"
            ? {
                py: 2,
                px: 2,
                backgroundColor: "#fff59d",
              }
            : {
                py: 2,
                px: 2,
                backgroundColor: "#aed581",
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
            <img src={hcmuslogo} width={200} height={100} />
          </Grid>
          <Copyright />
        </Grid>
      </Box>
    </Box>
  );
}
