import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import { Box, ImageList, ImageListItem } from "@mui/material";
import { uploadImage } from "../../../components/MultiUpload";

export default function StageProcess({ data, setData }) {
  let ID = 0;
  const [inputField, setInputField] = useState([
    { name: "", description: "", id: ID },
  ]);

  const addRow = () => {
    let _row = [...inputField];
    _row.push({ name: "", description: "", id: ID++ });
    setInputField(_row);
  };

  const [images, setImages] = useState([]);
  const [links, setLinks] = useState([]);
  const [img, setImg] = useState([]);

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Step 1
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <label>
            Process's name <b>(*)</b>
          </label>
          <TextField
            required
            placeholder="Process's name"
            fullWidth
            variant="outlined"
            onChange={(e) => setData({ ...data, stageProcess: { ...data.stageProcess, name: e.target.value } })}
            value={data.stageProcess.name}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <label>
            Time <b>(*)</b>
          </label>
          <TextField
            required
            type="date"
            onChange={(e) => setData({ ...data, stageProcess: { ...data.stageProcess, timeCreate: e.target.value } })}
            value={data.stageProcess.timeCreate}
            // placeholder="Description"
            fullWidth
            variant="outlined"
          />
        </Grid>
        <Grid
          item
          xs={12}
          sx={{ display: "flex", flexDirection: "column", marginBottom: 2 }}
        >
          <label>
            Image <b>(*)</b>
          </label>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              border: "2px dashed #1475cf",
              borderRadius: "10px",
              height: "200px",
              width: "450px",
              cursor: "pointer",
            }}
            onClick={() => {
              document.querySelector(".input-field").click();
            }}
          >
            <input
              className="input-field"
              type="file"
              accept="image/*"
              multiple
              hidden
              onChange={async (e) => {
                e.preventDefault();

                const MAX_LENGTH = 3;
                if (Array.from(e.target.files).length > MAX_LENGTH) {
                  e.preventDefault();
                  alert(`Cannot upload files more than ${MAX_LENGTH}`);
                  return;
                }

                setImages(e.target.files);
                console.log(e.target.files);
                // setLoading(true);

                try {
                  let arr = [];
                  for (let i = 0; i < e.target.files.length; i++) {
                    const data = await uploadImage(e.target.files[i]);
                    arr.push(data.url);
                  }
                  setLinks(arr);
                  // setData({...data, images: arr});
                  setData({ ...data, stageProcess: { ...data.stageProcess, images: arr } })
                } catch (error) {
                  console.log(error);
                }
                // setLoading(false);
              }}
            />
            <ImageList
              sx={{
                width: { xs: 400, md: 400 },
                height: 200,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              cols={3}
              rowHeight={164}
            >
              {links &&
                links.map((item) => {
                  return (
                    <ImageListItem
                      key={item}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <img
                        src={item}
                        width={100}
                        height={100}
                        className="image-link"
                      />
                    </ImageListItem>
                  );
                })}
            </ImageList>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <label>
            Description <b>(*)</b>
          </label>
          <TextField
            required
            onChange={(e) =>
              setData({ ...data, stageProcess: { ...data.stageProcess, description: e.target.value } })
            }
            value={data.stageProcess.description}
            placeholder="Description"
            fullWidth
            variant="outlined"
          />
        </Grid>
      </Grid>
    </Box>
  );
}
