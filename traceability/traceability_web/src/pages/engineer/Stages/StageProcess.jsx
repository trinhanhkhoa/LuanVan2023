import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import {
  Box,
  ImageList,
  ImageListItem,
  InputAdornment,
  TextareaAutosize,
} from "@mui/material";
import { uploadImage } from "../../../components/MultiUpload";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";

export default function StageProcess({ data, setData }) {
  const [links, setLinks] = useState([]);
  const [time, setTime] = useState(null);

  const parseDate = (dateString) => {
    const [day, month, year] = dateString.split("/");
    const parsedDate = new Date(year, month - 1, day);
    return parsedDate;
  };

  useEffect (() => {
    if (data.stageProcess.timeCreate !== "") {
      const parsedTime = parseDate(data.stageProcess.timeCreate);
      setTime(parsedTime);
    }
  }, [data.stageProcess.timeCreate]);

  const handleChange = (date) => {
    const formattedDate = date.toLocaleDateString("en-GB");
    setTime(date);
    setData({
      ...data,
      stageProcess: {
        ...data.stageProcess,
        timeCreate: formattedDate,
      },
    });
  };
  const CustomInput = ({ value, onClick }) => (
    <TextField
      type="text"
      fullWidth
      required
      value={value}
      onClick={onClick}
      // className="custom-datepicker-input"  
      placeholder="Select a date"
      readOnly
      InputProps={{
        endAdornment: (
          <InputAdornment position="start">
            <CalendarMonthRoundedIcon />
          </InputAdornment>
        ),
      }}
    />
  );
  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ mb: 2 }}>
        Thông tin chung
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <label>
            Tên quy trình <b className="requireDot">*</b>
          </label>
          <TextField
            required
            placeholder="VD: Quy trình trồng cam"
            fullWidth
            variant="outlined"
            onChange={(e) =>
              setData({
                ...data,
                stageProcess: { ...data.stageProcess, name: e.target.value },
              })
            }
            value={data.stageProcess.name}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <label>
            Thời gian tạo <b className="requireDot">*</b>
          </label>

          {/* <DatePicker
            name="time"
            required
            fullWidth
            selected={getTime}
            // minDate={time}
            onChange={handleChange}
            customInput={<CustomInput />}
            dateFormat="dd/MM/yyyy"
            // placeholderText="Select a date"
          /> */}
          <DatePicker
            name="time"
            required
            fullWidth
            selected={time}
            minDate={time}
            onChange={handleChange}
            customInput={<CustomInput />}
            dateFormat="dd/MM/yyyy"
            // placeholderText="Select a date"
          />
        </Grid>
        <Grid
          item
          xs={12}
          sx={{ display: "flex", flexDirection: "column", marginBottom: 2 }}
        >
          <label>
            Hình ảnh <b className="requireDot">*</b>
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

                // setImages(e.target.files);
                // console.log(e.target.files);
                // setLoading(true);

                try {
                  let arr = [];
                  for (let i = 0; i < e.target.files.length; i++) {
                    const data = await uploadImage(e.target.files[i]);
                    arr.push(data.url);
                  }
                  setLinks(arr);
                  // setData({...data, images: arr});
                  setData({
                    ...data,
                    stageProcess: { ...data.stageProcess, images: arr },
                  });
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
        <Grid item xs={12} sx={{ width: { xs: 400, md: "100%" } }}>
          <label>
            Mô tả <b className="requireDot">*</b>
          </label>
          <TextareaAutosize
            required
            maxRows={20}
            aria-label="maximum height"
            multiline="true"
            name="description"
            onChange={(e) =>
              setData({
                ...data,
                stageProcess: {
                  ...data.stageProcess,
                  description: e.target.value,
                },
              })
            }
            value={data.stageProcess.description}
            placeholder="Mô tả thêm về quy trình"
            style={{ width: "100%", minHeight: "100px" }}
            variant="outlined"
          />
        </Grid>
      </Grid>
    </Box>
  );
}
