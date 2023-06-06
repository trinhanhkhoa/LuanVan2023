import React, { useState } from "react";
import "./EnCreateProcess.css";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  ImageList,
  ImageListItem,
  Snackbar,
  TextField,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import { uploadImage } from "../../../components/MultiUpload";
import dayjs from "dayjs";
import Loading from "../../../components/Loading";
import { useForm, Form } from "../../../components/Try/useForm";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function EnCreateProcess() {
  const [name, setName] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [images, setImages] = useState([]);
  const [links, setLinks] = useState([]);
  const [img, setImg] = useState([]);

  const tokenData = window.localStorage.getItem("token");
  const [loading, setLoading] = useState(false);
  const [snackbarState, setSnackbarState] = useState(false);

  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;
  const [value, setValue] = useState(dayjs(date));

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = JSON.parse(window.localStorage.getItem("user"))._id;
    setLoading(true);

    await fetch("https://localhost:5000/process/add-process", {
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
        images: img,
        address,
        time: value,
        description,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        console.log(time);
        setLoading(false);

        setSnackbarState(true);

        setTimeout(() => {
          window.location.href = "/listofprocesses";
        }, 1500);
      });
  };

  const upload = async (e) => {
    e.preventDefault();
    try {
      let arr = [];
      let imgArr = [];
      for (let i = 0; i < images.length; i++) {
        const data = await uploadImage(images[i]);
        arr.push(data);
        imgArr.push(data.url);
      }
      setLinks(arr);
      setImg(imgArr);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container
      fixed
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: 700,
      }}
    >
      <Form onSubmit={handleSubmit}>
        <Loading loading={loading} />

        <Box sx={{ marginBottom: "10px", textAlign: "center" }}>
          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: "30px", md: "48px" },
              fontWeight: 700,
            }}
          >
            Describe a process
          </Typography>
          <Typography
            variant="h6"
            sx={{ fontSize: { xs: "18px", md: "30px" } }}
          >
            Process introduction information
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            margin: { xs: "0", md: "20px" },
            maxWidth: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              marginLeft: { xs: 0, md: 5 },
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  marginBottom: 2,
                }}
              >
                <label>
                  Process's name <b>(*)</b>
                </label>
                <TextField
                  required
                  variant="outlined"
                  name="name"
                  placeholder="Process's name"
                  type="text"
                  value={name}
                  // error={errors.name}
                  // helperText={errors.name}
                  onChange={(e) => setName(e.target.value)}
                  sx={{ width: { xs: 400, md: 600 }, borderRadius: "20%" }}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  marginBottom: 2,
                  marginLeft: {xs: "0", md: "20px"}
                }}
              >
                <label>
                  Time <b>(*)</b>
                </label>
                <TextField
                  required
                  variant="outlined"
                  type="date"
                  name="time"
                  value={time}
                  format="DD/MM/YYYY"
                  onChange={(e) => setTime(e.target.value)}
                  sx={{ width: { xs: 400, md: 400 }, borderRadius: "20%" }}
                />
                {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  label="Controlled picker"
                  value={value}
                  format="DD/MM/YYYY"
                  onChange={(newValue) => {
                    let newDate = moment.utc(newValue).format("DD-MM-YYYY");
                    console.log("converted date", newDate); // 09/23/21
                    setValue(newDate);
                    // console.log(newValue);
                  }}
                />
              </DemoContainer>
            </LocalizationProvider> */}
              </Box>
            </Box>
            <Box
              sx={{ display: "flex", flexDirection: "column", marginBottom: 2 }}
            >
              <label>
                Address <b>(*)</b>
              </label>
              <TextField
                required
                variant="outlined"
                placeholder="Address"
                type="text"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                sx={{ width: { xs: 400, md: "100%" }, borderRadius: "20%" }}
              />
            </Box>
            <Box
              sx={{ display: "flex", flexDirection: "column", marginBottom: 2 }}
            >
              <label>
                Image <b>(*)</b>
              </label>
              <input
                required
                type="file"
                multiple
                // hidden
                onChange={(e) => setImages(e.target.files)}
              />
              <ImageList
                sx={{ width: { xs: 400, md: 400 }, height: 200 }}
                cols={3}
                rowHeight={164}
              >
                {links &&
                  links.map((item, index) => {
                    return (
                      <ImageListItem key={index}>
                        <img src={item} width={200} height={200} />
                      </ImageListItem>
                    );
                  })}
              </ImageList>
              <Button
                variant="contained"
                color="success"
                sx={{ borderRadius: "10px", marginTop: 2, width: 100 }}
                onClick={upload}
              >
                Upload
              </Button>
            </Box>
            <Box
              sx={{ display: "flex", flexDirection: "column", marginBottom: 2 }}
            >
              <label>
                Describe information <b>(*)</b>
              </label>
              <TextareaAutosize
                required
                maxRows={20}
                aria-label="maximum height"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{ width: "100%", minHeight: "100px" }}
              />
            </Box>
          </Box>
        </Box>
        <Box
          m={1} //margin
          display="flex"
          justifyContent="flex-end"
          alignItems="flex-end"
        >
          <Button
            type="submit"
            variant="contained"
            color="warning"
            sx={{ borderRadius: "10px" }}
          >
            Confirm
          </Button>
        </Box>
        <Snackbar open={snackbarState} autoHideDuration={1000}>
          <Alert severity="success" sx={{ width: "100%" }}>
            Product is deleted
          </Alert>
        </Snackbar>
      </Form>
    </Container>
  );
}

export default EnCreateProcess;
