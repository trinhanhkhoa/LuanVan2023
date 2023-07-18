import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import { Box, TextareaAutosize } from "@mui/material";

export default function StagePlantSeeds({ data, setData }) {
  const [inputList, setInputList] = useState([{ name: "", description: "" }]);

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { name: "", description: "" }]);
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
            placeholder="VD: Gieo hạt"
            fullWidth
            variant="outlined"
            onChange={(e) =>
              setData({
                ...data,
                stagePlantSeeds: {
                  ...data.stagePlantSeeds,
                  name: e.target.value,
                },
              })
            }
            value={data.stagePlantSeeds.name}
          />
        </Grid>
        <Grid item xs={12}>
          <label>
            Mô tả <b className="requireDot">*</b>
          </label>
          {/* <TextField
            required
            placeholder="Mô tả thêm về giai đoạn"
            fullWidth
            variant="outlined"
            onChange={(e) =>
              setData({
                ...data,
                stagePlantSeeds: {
                  ...data.stagePlantSeeds,
                  description: e.target.value,
                },
              })
            }
            value={data.stagePlantSeeds.description}
          /> */}
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
                stagePlantSeeds: {
                  ...data.stagePlantSeeds,
                  description: e.target.value,
                },
              })
            }
            value={data.stagePlantSeeds.description}
            style={{ width: "100%", minHeight: "100px" }}
          />
        </Grid>
      </Grid>

      {/* <Button variant="contained" sx={{ m: 3 }} onClick={addTableRows}>
          +
        </Button> */}
      {/* {inputList.map((x, i) => {
        return (
          <Box>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  name="name"
                  placeholder="Enter Name"
                  required
                  label="Name"
                  fullWidth
                  variant="standard"
                  value={x.name}
                  onChange={(e) => handleInputChange(e, i)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  label="Name"
                  fullWidth
                  variant="standard"
                  name="description"
                  placeholder="Enter Description"
                  value={x.description}
                  onChange={(e) => handleInputChange(e, i)}
                />
              </Grid>
            </Grid>
            <Grid item spacing={3}>
              <div className="btn-box">
                {inputList.length !== 1 && (
                  <Button className="mr10" onClick={() => handleRemoveClick(i)}>
                    Remove
                  </Button>
                )}
                {inputList.length - 1 === i && (
                  <Button onClick={handleAddClick}>Add</Button>
                )}
              </div>
            </Grid>
          </Box>
        );
      })} */}
    </Box>
  );
}
