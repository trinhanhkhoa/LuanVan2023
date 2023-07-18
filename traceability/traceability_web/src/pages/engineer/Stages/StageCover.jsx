import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import { Box, TextareaAutosize } from "@mui/material";

export default function StageCover({ data, setData }) {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Giai đoạn 3
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <label>
            Tên <b className="requireDot">*</b>
          </label>
          <TextField
            required
            placeholder="VD: Đậy trái"
            fullWidth
            variant="outlined"
            onChange={(e) =>
              setData({
                ...data,
                stageCover: { ...data.stageCover, name: e.target.value },
              })
            }
            value={data.stageCover.name}
          />
        </Grid>
        <Grid item xs={12}>
          <label>
            Mô tả <b className="requireDot">*</b>
          </label>
          <TextareaAutosize
            required
            maxRows={20}
            aria-label="maximum height"
            multiline="true"
            name="description"
            placeholder="Mô tả thêm về giai đoạn"
            onChange={(e) =>
              setData({
                ...data,
                stageCover: { ...data.stageCover, description: e.target.value },
              })
            }
            value={data.stageCover.description}
            style={{ width: "100%", minHeight: "100px" }}
          />
          {/* <TextField
            required
            placeholder="Mô tả thêm về giai đoạn"
            fullWidth
            variant="outlined"
            onChange={(e) => setData({ ...data, stageCover: { ...data.stageCover, description: e.target.value } })}
            value={data.stageCover.description}
          /> */}
        </Grid>
      </Grid>
    </Box>
  );
}
