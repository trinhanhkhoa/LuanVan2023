import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";

export default function StageSell({ data, setData }) {

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Step 6
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} >
          <label>
            Name stage <b>(*)</b>
          </label>
          <TextField
            required
            placeholder="Name Stage"
            fullWidth
            variant="outlined"
            onChange={(e) => setData({ ...data, stageSell: { ...data.stageSell, name: e.target.value } })}
            value={data.stageSell.name}
          />
        </Grid>
        <Grid item xs={12} >
          <label>
            Description <b>(*)</b>
          </label>
          <TextField
            required
            placeholder="Description"
            fullWidth
            variant="outlined"
            onChange={(e) => setData({ ...data, stageSell: { ...data.stageSell, description: e.target.value } })}
            value={data.stageSell.description}
          />
        </Grid>
        <Grid item xs={12} >
          <label>
            Purchasing unit <b>(*)</b>
          </label>
          <TextField
            required
            placeholder="Purchasing unit"
            fullWidth
            variant="outlined"
            onChange={(e) => setData({ ...data, stageSell: { ...data.stageSell, purchasingUnit: e.target.value } })}
            value={data.stageSell.purchasingUnit}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
