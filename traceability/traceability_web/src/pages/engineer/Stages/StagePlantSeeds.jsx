import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";

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
                stagePlantSeeds: {
                  ...data.stagePlantSeeds,
                  description: e.target.value,
                },
              })
            }
            value={data.stagePlantSeeds.description}
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
