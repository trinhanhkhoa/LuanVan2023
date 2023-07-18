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
import Loading from "../../../components/Loading";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

export default function StageProcess({ data, setData }) {
  const [links, setLinks] = useState([]);
  const [time, setTime] = useState(null);
  const [loading, setLoading] = useState(false);
  const parseDate = (dateString) => {
    const [day, month, year] = dateString.split("/");
    const parsedDate = new Date(year, month - 1, day);
    return parsedDate;
  };

  useEffect(() => {
    if (data.stageProcess.timeCreate !== "") {
      const parsedTime = parseDate(data.stageProcess.timeCreate);
      setTime(parsedTime);
    }

    if (data.stageProcess.images !== "") {
      setLinks(data.stageProcess.images);
    }
  }, [data.stageProcess.timeCreate]);

  const handleChange = (date) => {
    const formattedDate = date.toLocaleDateString("en-GB");
    // console.log(formattedDate);
    setTime(date);
    setData({
      ...data,
      stageProcess: {
        ...data.stageProcess,
        timeCreate: formattedDate,
      },
    });
  };

  // console.log(data.stageProcess.images);
  const CustomInput = ({ value, onClick }) => (
    <TextField
      type="text"
      fullWidth
      required
      value={value}
      onClick={onClick}
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
      <Loading loading={loading} />

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
        <Grid item xs={12} sm={6}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <label>
              Thời gian tạo <b className="requireDot">*</b>
            </label>
            <DatePicker
              name="time"
              required
              fullWidth
              selected={time}
              minDate={time}
              onChange={handleChange}
              customInput={<CustomInput />}
              dateFormat="dd/MM/yyyy"
            />
          </Box>
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
              required
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

                try {
                  setLoading(true);

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
                  setLoading(false);
                } catch (error) {
                  console.log(error);
                }
              }}
            />
            {links.length === 0 ? (
              <Box>
                <CloudUploadIcon color="primary" sx={{ fontSize: 100 }} />
                <Typography color={"#b0bec5"}>Chọn hình ảnh</Typography>
              </Box>
            ) : (
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
            )}
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
