import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import { Box, TextareaAutosize } from "@mui/material";

export default function StagePlantCare({ data, setData }) {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Giai đoạn chăm sóc
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <label>
            Tên <b className="requireDot">*</b>
          </label>
          <TextField
            required
            placeholder="Nhập tên giai đoạn"
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
                stagePlantCare: {
                  ...data.stagePlantCare,
                  description: e.target.value,
                },
              })
            }
            value={data.stagePlantCare.description}
            style={{ width: "100%", minHeight: "100px" }}
          />
          {/* <TextField
            required
            placeholder="Mô tả thêm về giai đoạn"
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
          /> */}
        </Grid>
        <Grid item xs={12} sm={6}>
          <label>
            Thời lượng tưới nước <b className="requireDot">*</b>
          </label>
          <TextField
            required
            placeholder="VD: 10 phút"
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
            Lượng phân bón <b className="requireDot">*</b>
          </label>
          <TextField
            required
            placeholder="VD: 20kg"
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
