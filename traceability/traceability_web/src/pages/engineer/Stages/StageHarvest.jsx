import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";

export default function StageHarvest({ data, setData }) {

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Step 5
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <label>
            Name stage <b>(*)</b>
          </label>
          <TextField
            required
            placeholder="Name Stage"
            fullWidth
            variant="outlined"
            onChange={(e) => setData({ ...data, stageHarvest: { ...data.stageHarvest, name: e.target.value } })}
            value={data.stageHarvest.name}
          />
        </Grid>
        <Grid item xs={12}>
          <label>
            Description <b>(*)</b>
          </label>
          <TextField
            required
            placeholder="Description"
            fullWidth
            variant="outlined"
            onChange={(e) => setData({ ...data, stageHarvest: { ...data.stageHarvest, description: e.target.value } })}
            value={data.stageHarvest.description}
          />
        </Grid>
        <Grid item xs={12}>
          <label>
            Quantity <b>(*)</b>
          </label>
          <TextField
            required
            placeholder="Quantity"
            fullWidth
            variant="outlined"
            onChange={(e) => setData({ ...data, stageHarvest: { ...data.stageHarvest, quantity: e.target.value } })}
            value={data.stageHarvest.quantity}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
