import React, { useState, useEffect } from "react";
import { uploadImage } from "../../../components/MultiUpload";
import {
  Autocomplete,
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
import { useParams } from "react-router-dom";
import Loading from "../../../components/Loading";
import { useForm, Form } from "../../../components/Try/useForm";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const optionsTracking = [
  "Gieo giống cây",
  "Tưới cây",
  "Bón phân",
  "Đậy trái",
  "Ra hoa",
  "Chuyển khâu thu mua",
];

function TrackingForm() {
  const [images, setImages] = useState([]);
  const [links, setLinks] = useState([]);
  const [img, setImg] = useState([]);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbarState, setSnackbarState] = useState(false);

  const params = useParams();

  const tokenData = window.localStorage.getItem("token");
  const user = window.localStorage.getItem("userId");
  const userId = window.localStorage.getItem("userId");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    await fetch(
      `https://backend.teamluanvan.software/tracking/add-tracking/${params.id}`,
      {
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
          user,
          name,
          time,
          address,
          images: img,
          description,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("data", data);
        console.log("upload img", img);

        setSnackbarState(true);

        setTimeout(() => {
          window.location.href = `/product/${params.id}`;
        }, 1500);
      });
    setLoading(false);
  };

  const upload = async (e) => {
    setLoading(true);

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
    setLoading(false);
  };

  return (
    <Container fixed sx={{ justifyContent: "center", alignItems: "center" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          maxWidth: "100%",
        }}
        component="form"
        onSubmit={handleSubmit}
      >
        <Loading loading={loading} />

        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box
            sx={{ display: "flex", flexDirection: "column", marginBottom: 2 }}
          >
            <label>
              Tracking progress <b>(*)</b>
            </label>
            <Autocomplete
              disablePortal
              value={name}
              onChange={(e, newValue) => {
                setName(newValue);
                console.log(newValue);
              }}
              id="combo-box-demo"
              options={optionsTracking}
              sx={{ width: { xs: 350, md: 600 } }}
              renderInput={(params) => (
                <TextField
                  required
                  value={name}
                  onChange={(e, newValue) => {
                    setName(newValue);
                    console.log(name);
                  }}
                  variant="outlined"
                  name="name"
                  placeholder="Product's name"
                  sx={{ width: { xs: 350, md: 600 }, borderRadius: "20%" }}
                  {...params}
                  // label="Movie"
                />
              )}
            />
          </Box>
          <Box
            sx={{ display: "flex", flexDirection: "column", marginBottom: 2 }}
          >
            <label>
              Time <b>(*)</b>
            </label>
            <TextField
              variant="outlined"
              type="date"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              sx={{ width: { xs: 350, md: 600 }, borderRadius: "20%" }}
            />
          </Box>
          <Box
            sx={{ display: "flex", flexDirection: "column", marginBottom: 2 }}
          >
            <label>
              Address <b>(*)</b>
            </label>
            <TextField
              variant="outlined"
              placeholder="Address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              sx={{ width: { xs: 350, md: 600 }, borderRadius: "20%" }}
            />
          </Box>
          <Box
            sx={{ display: "flex", flexDirection: "column", marginBottom: 2 }}
          >
            <label>
              Image <b>(*)</b>
            </label>
            <input
              type="file"
              multiple
              // hidden
              onChange={(e) => setImages(e.target.files)}
            />
            <ImageList
              sx={{ width: { xs: 350, md: 600 }, height: 200 }}
              cols={3}
              rowHeight={164}
            >
              {links &&
                links.map((item, index) => {
                  return (
                    <ImageListItem key={index}>
                      <img src={item} width={100} height={100} />
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
            <Box sx={{ width: { xs: 350, md: 600 } }}>
              <TextareaAutosize
                maxRows={20}
                aria-label="maximum height"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{ width: "100%", minHeight: "100px" }}
              />
            </Box>
          </Box>
          <Box>
            <Button
              type="submit"
              variant="contained"
              color="warning"
              sx={{ borderRadius: "10px" }}
            >
              Confirm
            </Button>
          </Box>
        </Box>

        <Snackbar open={snackbarState} autoHideDuration={1000}>
          <Alert severity="success" sx={{ width: "100%" }}>
            Product is deleted
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
}

export default TrackingForm;
