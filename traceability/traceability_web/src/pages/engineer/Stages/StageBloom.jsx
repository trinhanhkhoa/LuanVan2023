import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";

export default function StageBloom({ data, setData }) {
  let ID = 0;
  const [inputField, setInputField] = useState([
    { name: "", description: "", id: ID },
  ]);

  const addRow = () => {
    let _row = [...inputField];
    _row.push({ name: "", description: "", id: ID++ });
    setInputField(_row);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Giai đoạn 2
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <label>
            Tên <b className="requireDot">*</b>
          </label>
          <TextField
            required
            placeholder="VD: Ra hoa"
            fullWidth
            variant="outlined"
            onChange={(e) => setData({ ...data, stageBloom: { ...data.stageBloom, name: e.target.value } })}
            value={data.stageBloom.name}
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
            onChange={(e) => setData({ ...data, stageBloom: { ...data.stageBloom, description: e.target.value } })}
            value={data.stageBloom.description}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
