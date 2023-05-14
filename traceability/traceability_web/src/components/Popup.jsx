import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Typography } from "@mui/material";

export default function Popup(props) {

  const { title, children, openPopup, setOpenPopup } = props;

  const handleClose = () => {
    setOpenPopup(!openPopup);
  };

  return (
    <Dialog open={openPopup} onClose={handleClose} maxWidth='md'>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'center', fontSize: 40}}>
        <Typography variant="h5" component='div'>
          {title}
        </Typography>
      </DialogTitle>
      <DialogContent dividers>
        {children}
      </DialogContent>
    </Dialog>
  );
}
