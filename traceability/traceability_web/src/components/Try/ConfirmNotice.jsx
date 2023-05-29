import React, { useState, useEffect } from "react";
import { Box, Button, Container, Snackbar, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function ConfirmNotice(props) {
  const { id } = props;

  const [snackbarState, setSnackbarState] = useState(false);

  const tokenData = window.localStorage.getItem("token");
  const userType = window.localStorage.getItem("userType");

  const deleteProduct = (id) => {
    fetch(`https://backend.teamluanvan.software/product/delete-product/${id}`, {
      method: "DELETE",
      headers: {
        "x-auth-token": tokenData,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setSnackbarState(true);

        setTimeout(() => {
          window.location.href = "/list";
        }, 1500);
      });
  };

  const deleteProcess = async (id) => {
    await fetch(
      `https://backend.teamluanvan.software/process/delete-process/${id}`,
      {
        method: "DELETE",
        headers: {
          "x-auth-token": tokenData,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setSnackbarState(true);

        setTimeout(() => {
          window.location.href = "/listofprocesses";
        }, 1500);
      });
  };

  return (
    <Container fixed sx={{ justifyContent: "center", alignItems: "center" }}>
      <Box
        m={1} //margin
        display="flex"
        flexDirection={"column"}
        justifyContent="center"
        alignItems="center"
      >
        <Typography sx={{ mb: 3 }}> Do you want to delete it ? </Typography>
        <Box
          display="flex"
          flexDirection={"row"}
          justifyContent="space-between"
          alignItems="space-between"
        >
          <Button
            variant="contained"
            color="success"
            sx={{ borderRadius: "10px", mr: 4 }}
            onClick={() => {
              userType === "Admin" || userType === "admin"
                ? deleteProcess(id)
                : deleteProduct(id);
            }}
          >
            Confirm
          </Button>

          <Button
            variant="contained"
            color="warning"
            sx={{ borderRadius: "10px", ml: 4 }}
            onClick={() => {
              window.location.href = `/list`;
            }}
          >
            Cancel
          </Button>
        </Box>
        <Snackbar open={snackbarState} autoHideDuration={1000}>
          {userType === "Admin" || userType === "admin" ? (
            <Alert severity="success" sx={{ width: "100%" }}>
              Process is deleted
            </Alert>
          ) : (
            <Alert severity="success" sx={{ width: "100%" }}>
              Product is deleted
            </Alert>
          )}
        </Snackbar>
      </Box>
    </Container>
  );
}

export default ConfirmNotice;
