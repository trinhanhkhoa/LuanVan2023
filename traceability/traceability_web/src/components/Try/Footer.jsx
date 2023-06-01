import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import hcmuslogo from "../../asserts/hcmus-logo.png";
import logo from "../../asserts/logo.png";

function Copyright() {
  return (
    <Box
      
    >
      <Container>
        <Typography variant="body1" color="white">
          Traceability agriculture
        </Typography>
        <Typography variant="body2" color="white">
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
          userType == "admin"
            ? {
                py: 2,
                px: 2,
                backgroundColor: (theme) => theme.palette.warning.light,
              }
            : {
                py: 2,
                px: 2,
                backgroundColor: (theme) => theme.palette.success.light,
              }
        }
      >
        <Container sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <img src={logo} alt="" width={100} height={100} />
            <img src={hcmuslogo} alt="" width={200} height={100} />
          </Box>
          <Copyright />
        </Container>
      </Box>
    </Box>
  );
}
