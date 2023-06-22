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
      <Typography variant="h4" gutterBottom>
        Giai đoạn 4
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <label>
            Tên <b className="requireDot">*</b>
          </label>
          <TextField
            required
            placeholder="VD: Thu hoạch"
            fullWidth
            variant="outlined"
            onChange={(e) => setData({ ...data, stageHarvest: { ...data.stageHarvest, name: e.target.value } })}
            value={data.stageHarvest.name}
          />
        </Grid>
        <Grid item xs={12}>
          <label>
            Mô tả <b className="requireDot">*</b>
          </label>
          <TextField
            required
            placeholder="Mô tả thêm về giai đoạn"
            fullWidth
            variant="outlined"
            onChange={(e) => setData({ ...data, stageHarvest: { ...data.stageHarvest, description: e.target.value } })}
            value={data.stageHarvest.description}
          />
        </Grid>
        <Grid item xs={12}>
          <label>
            Sản lượng <b className="requireDot">*</b>
          </label>
          <TextField
            required
            placeholder="VD: 10 tấn"
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
