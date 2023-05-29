import React, { useState, useEffect } from "react";
import "./UpdateProduct.css";
import { Link, useParams } from "react-router-dom";
import QRCode from "react-qr-code";
import { uploadImage } from "../../../components/MultiUpload";
import {
  Box,
  Button,
  Container,
  Grid,
  ImageList,
  ImageListItem,
  TextField,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import Loading from "../../../components/Loading";

function UpdateProduct() {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(isOpen);
  };

  const [images, setImages] = useState([]);

  const [fileName, setFileName] = useState("No choosen file");

  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [time, setTime] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

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

  const params = useParams();

  const tokenData = window.localStorage.getItem("token");
  const user = window.localStorage.getItem("userId");
  const userId = window.localStorage.getItem("userId");

  const tokenIsValid = () => {
    fetch("https://backend.teamluanvan.software/tokenIsValid", {
      method: "POST",
      crossDomain: true,
      headers: {
        "x-auth-token": tokenData,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("token", data);
      });
  };

  const getInfoProduct = async () => {
    setLoading(true);

    await fetch(
      `https://backend.teamluanvan.software/product/get-product/${params.id}`,
      {
        method: "GET",
        headers: {
          "x-auth-token": tokenData,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setName(data.data.name);
        setImages(data.data.images);
        setAddress(data.data.address);
        setDescription(data.data.description);
        setTime(data.data.time);
        console.log("img", data.data.image);
        console.log(data);
      });
    setLoading(false);
  };

  const putInfoProduct = async () => {
    setLoading(true);

    await fetch(
      `https://backend.teamluanvan.software/product/update-product/${params.id}`,
      {
        method: "PUT",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": tokenData,
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          userId,
          user,
          name,
          address,
          images,
          time,
          description,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setLoading(false);

        window.location.href = "/list";
      });
  };

  useEffect(() => {
    tokenIsValid();
    getInfoProduct();
  }, []);

  return (
    <Container fixed sx={{ justifyContent: "center", alignItems: "center" }}>
      <Loading loading={loading} />

      <Box sx={{ marginBottom: "10px" }}>
        <Typography variant="h3">Update product</Typography>
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
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <QRCode
            value={`${params.id}`}
            size={200}
          />
          <Button
            variant="contained"
            color="success"
            sx={{ borderRadius: "10px", marginTop: "20px", width: "200px" }}
            onClick={() => {
              window.location.href = `/product/${params.id}`;
            }}
          >
            Watch product
          </Button>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", marginLeft: 5 }}>
          <Box
            sx={{ display: "flex", flexDirection: "column", marginBottom: 2 }}
          >
            <label>
              Product's name <b>(*)</b>
            </label>
            <TextField
              variant="outlined"
              placeholder="Product's name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{ width: 800, borderRadius: "20%" }}
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
              sx={{ width: 800, borderRadius: "20%" }}
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
              sx={{ width: 800, borderRadius: "20%" }}
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
              // className="image-field"
              multiple
              hidden
              onChange={(e) => setImages(e.target.files)}
            />
            <ImageList
              sx={{ width: 600, height: 200 }}
              cols={3}
              rowHeight={164}
            >
              {images.map((item, index) => {
                return (
                  <ImageListItem key={index}>
                    <img src={item} width={200} height={200} />
                  </ImageListItem>
                );
              })}
            </ImageList>
          </Box>
          <Box
            sx={{ display: "flex", flexDirection: "column", marginBottom: 2 }}
          >
            <label>
              Describe information <b>(*)</b>
            </label>
            <TextareaAutosize
              maxRows={20}
              aria-label="maximum height"
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
          variant="contained"
          color="warning"
          sx={{ borderRadius: "10px" }}
          onClick={putInfoProduct}
        >
          Confirm
        </Button>
      </Box>
    </Container>
  );
}

export default UpdateProduct;
