import React, { useState, useEffect } from "react";
import "./CreateQR.css";
import { uploadImage } from "../../../components/MultiUpload";
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  ImageList,
  ImageListItem,
  InputAdornment,
  InputLabel,
  NativeSelect,
  Select,
  Snackbar,
  TextField,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import Loading from "../../../components/Loading";
import { useForm, Form } from "../../../components/Try/useForm";
import MuiAlert from "@mui/material/Alert";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function CreateQR() {
  const [images, setImages] = useState([]);
  const [links, setLinks] = useState([]);
  const [img, setImg] = useState([]);
  const [data, setData] = useState([]);
  const [processId, setProcessId] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbarState, setSnackbarState] = useState(false);

  const tokenData = window.localStorage.getItem("token");
  const userId = window.localStorage.getItem("userId");

  const [value, setValue] = useState(null);
  const [open, toggleOpen] = useState(false);
  const today = new Date();
  const [time, setTime] = useState(today);

  const handleChange = (date) => {
    setTime(date);
  };

  const handleClose = () => {
    setDialogValue({
      name: "",
    });
    toggleOpen(false);
  };

  const [dialogValue, setDialogValue] = useState({
    name: "",
  });

  const handleSubmitDialog = (event) => {
    event.preventDefault();
    setValue({
      title: dialogValue.title,
      year: parseInt(dialogValue.year, 10),
    });
    handleClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    // await fetch(`${process.env.REACT_APP_API}/product/add-product`, {
    await fetch(`${process.env.REACT_APP_API}/product/add-product`, {
      method: "POST",
      crossDomain: true,
      headers: {
        "x-auth-token": tokenData,
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        userId,
        name,
        address,
        time: time.toLocaleDateString("en-GB"),
        images: links,
        description,
        processId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);

        setSnackbarState(true);

        setTimeout(() => {
          // window.location.href = "/list";
        }, 1500);
      });
  };

  const getProcesses = async () => {
    setLoading(true);

    await fetch(`${process.env.REACT_APP_API}/process/get-processes`, {
      method: "GET",
      headers: {
        "x-auth-token": tokenData,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data);
        setLoading(false);

        setData(data.data);
      });
  };

  const CustomInput = ({ value, onClick }) => (
    <TextField
      type="text"
      fullWidth
      required
      value={value}
      onClick={onClick}
      className="custom-datepicker-input" // Apply your custom styles here
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

  useEffect(() => {
    getProcesses();
  }, []);

  // const tomorrow = new Date(today);
  // tomorrow.setDate(tomorrow.getDate());

  return (
    <Container
      fixed
      sx={{ justifyContent: "center", alignItems: "center", minHeight: "80vh" }}
    >
      <Form onSubmit={handleSubmit}>
        <Box sx={{ marginBottom: "10px", textAlign: "left" }}>
          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: "30px", md: "48px" },
              fontWeight: 700,
            }}
          >
            Tạo sản phẩm
          </Typography>
          <Typography
            variant="h6"
            sx={{ fontSize: { xs: "18px", md: "30px" } }}
          >
            Điền thông tin chung
          </Typography>
        </Box>

        <Loading loading={loading} />

        <Grid container spacing={3}>
          <Grid item xs={11} sm={6}>
            <label>
              Tên sản phẩm <b className="requireDot">*</b>
            </label>
            <TextField
              required
              value={name}
              fullWidth
              onChange={(e) => {
                setName(e.target.value);
                console.log(name);
              }}
              variant="outlined"
              name="name"
              placeholder="Nhập tên sản phẩm"
            />
          </Grid>
          <Grid item xs={11} sm={5}>
            <label>
              Chọn quy trình trồng cây <b className="requireDot">*</b>
            </label>
            <FormControl fullWidth>
              <Select
                native
                fullWidth
                variant="outlined"
                defaultValue={30}
                inputProps={{
                  name: "age",
                  id: "uncontrolled-native",
                }}
                value={processId}
                onChange={(e) => {
                  setProcessId(e.target.value);
                  console.log(e.target.value);
                }}
              >
                {data &&
                  data.map((item, index) => {
                    return (
                      <option key={index} value={item._id}>
                        {item.stageProcess.name}
                      </option>
                    );
                  })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={11} sm={8.3}>
            <label>
              Địa chỉ <b className="requireDot">*</b>
            </label>
            <TextField
              required
              variant="outlined"
              fullWidth
              placeholder="Address"
              type="text"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Grid>
          <Grid item xs={11} sm={3}>
            <label>
              Thời gian tạo <b className="requireDot">*</b>
            </label>
            {/* <DatePicker
              selected={time}
              onChange={handleChange}
              dateFormat="dd/MM/yyyy"
              name="time"
              required
              className="form-control"
              onClick={console.log(time)}
            /> */}
            <DatePicker
              name="time"
              required
              fullWidth
              selected={time}
              minDate={today}
              onChange={handleChange}
              customInput={<CustomInput />}
              dateFormat="dd/MM/yyyy"
              // placeholderText="Select a date"
            />
          </Grid>
          <Grid item xs={11}>
            <label>
              Hình ảnh sản phẩm <b className="requireDot">*</b>
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
                  setLoading(true);

                  try {
                    let arr = [];
                    for (let i = 0; i < e.target.files.length; i++) {
                      const data = await uploadImage(e.target.files[i]);
                      arr.push(data.url);
                    }
                    setLinks(arr);
                  } catch (error) {
                    console.log(error);
                  }
                  setLoading(false);
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
          <Grid item xs={11}>
            <label>
              Mô tả <b className="requireDot">*</b>
            </label>

            <Box sx={{ width: { xs: 400, md: "100%" } }}>
              <TextareaAutosize
                required
                maxRows={20}
                aria-label="maximum height"
                multiline="true"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{ width: "100%", minHeight: "100px" }}
              />
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            type="submit"
            variant="contained"
            color="warning"
            sx={{ borderRadius: "10px" }}
          >
            Xác nhận
          </Button>
        </Box>

        <Snackbar open={snackbarState} autoHideDuration={1000}>
          <Alert severity="success" sx={{ width: "100%" }}>
            Tạo sản phẩm thành công !
          </Alert>
        </Snackbar>
      </Form>
    </Container>
  );
}

export default CreateQR;
