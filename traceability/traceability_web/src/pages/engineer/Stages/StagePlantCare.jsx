import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";

export default function StagePlantCare({ data, setData }) {

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Step 2
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
            onChange={(e) =>
              setData({
                ...data,
                stagePlantCare: {
                  ...data.stagePlantCare,
                  name: e.target.value,
                },
              })
            }
            value={data.stagePlantCare.name}
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
            onChange={(e) =>
              setData({
                ...data,
                stagePlantCare: {
                  ...data.stagePlantCare,
                  description: e.target.value,
                },
              })
            }
            value={data.stagePlantCare.description}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <label>
            Watering time <b>(*)</b>
          </label>
          <TextField
            required
            placeholder="Watering time"
            fullWidth
            variant="outlined"
            onChange={(e) =>
              setData({
                ...data,
                stagePlantCare: {
                  ...data.stagePlantCare,
                  water: e.target.value,
                },
              })
            }
            value={data.stagePlantCare.water}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <label>
            Fertilizer <b>(*)</b>
          </label>
          <TextField
            required
            placeholder="Fertilizer"
            fullWidth
            variant="outlined"
            onChange={(e) =>
              setData({
                ...data,
                stagePlantCare: {
                  ...data.stagePlantCare,
                  fertilizer: e.target.value,
                },
              })
            }
            value={data.stagePlantCare.fertilizer}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
