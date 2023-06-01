import React, { useState, useEffect } from "react";
import "./CreateQR.css";
import { uploadImage } from "../../../components/MultiUpload";
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
import Loading from "../../../components/Loading";
import { useForm, Form } from "../../../components/Try/useForm";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function CreateQR() {
  const [images, setImages] = useState([]);
  const [links, setLinks] = useState([]);
  const [img, setImg] = useState([]);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbarState, setSnackbarState] = useState(false);

  const tokenData = window.localStorage.getItem("token");
  const userId = window.localStorage.getItem("userId");

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    await fetch("https://backend.teamluanvan.software/product/add-product", {
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
        time,
        images: img,
        description,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data", data);
        console.log("upload img", img);
        setLoading(false);

        setSnackbarState(true);

        setTimeout(() => {
          window.location.href = "/list";
        }, 1500);
      });
  };

  return (
    <Container fixed sx={{ justifyContent: "center", alignItems: "center" }}>
      <Form onSubmit={handleSubmit}>
        <Box sx={{ marginBottom: "10px" }}>
          <Typography variant="h3">Describe a product</Typography>
          <Typography variant="h6">Product introduction information</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            margin: "20px",
            maxWidth: "100%",
          }}
        >
          <Loading loading={loading} />

          <Box sx={{ display: "flex", flexDirection: "column", marginLeft: 5 }}>
            <Box
              sx={{ display: "flex", flexDirection: "column", marginBottom: 2 }}
            >
              <label>
                Product's name <b>(*)</b>
              </label>
              <TextField
                required
                variant="outlined"
                name="name"
                placeholder="Product's name"
                type="text"
                value={name}
                // error={errors.name}
                // helperText={errors.name}

                onChange={(e) => setName(e.target.value)}
                sx={{ width: 1000, borderRadius: "20%" }}
              />
            </Box>
            <Box
              sx={{ display: "flex", flexDirection: "column", marginBottom: 2 }}
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
                onChange={(e) => setTime(e.target.value)}
                sx={{ width: 1000, borderRadius: "20%" }}
              />
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
                // error={errors.address}
                // helperText={errors.address}
                sx={{ width: 1000, borderRadius: "20%" }}
              />
            </Box>

            <Box
              sx={{ display: "flex", flexDirection: "row", marginBottom: 2 }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  marginBottom: 2,
                }}
              >
                <label>
                  Image product<b>(*)</b>
                </label>
                <input
                  type="file"
                  multiple
                  // hidden
                  onChange={(e) => setImages(e.target.files)}
                />
                <ImageList
                  sx={{ width: 500, height: 200 }}
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
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  marginBottom: 2,
                }}
              >
                <label>
                  Image certificates<b>(*)</b>
                </label>
                <input
                  type="file"
                  multiple
                  // hidden
                  onChange={(e) => setImages(e.target.files)}
                />
                <ImageList
                  sx={{ width: 500, height: 200 }}
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
                multiline
                name="description"
                value={description}
                // error={errors.description}
                // helperText={errors.description}

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

export default CreateQR;
