import React, { useState, useEffect } from "react";
import "./Product.css";
import cam from "../../../asserts/cam.jpg";
import * as TbIcons from "react-icons/tb";
// import Popup from "../../../components/Popup/Popup";
import { Link, useParams } from "react-router-dom";
import Data from "../../../Data.json";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  ImageListItem,
  Slide,
  Typography,
} from "@mui/material";
import QRCode from "react-qr-code";
import ReactReadMoreReadLess from "react-read-more-read-less";
import Popup from "../../../components/Popup";
import TrackingForm from "../TrackingForm/TrackingForm";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import { styled } from "@mui/material/styles";
import ProductTracking from "../ProductTracking/ProductTracking";

const ProductDetailWrapper = styled(Card)(({ theme }) => ({
  display: "flex",
  padding: theme.spacing(4),
  justifyContent: "center",
  borderRadius: 10,
}));

const ProductDetailInfoWrapper = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  maxWidth: 1800,
  lineHeight: 1.5,
}));

export const ProductDetail = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  [theme.breakpoints.up("md")]: {
    position: "relative",
  },
}));

export const ProductImage = styled("img")(({ src, theme }) => ({
  src: `url(${src})`,
  width: "100%",
  background: theme.palette.grey.light,
  padding: "10px",
  [theme.breakpoints.down("md")]: {
    width: "80%",
    padding: "24px",
  },
}));

function Product() {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const params = useParams();

  const [name, setName] = useState("");
  const [time, setTime] = useState("");
  const [images, setImages] = useState([]);
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");

  const tokenData = window.localStorage.getItem("token");
  const user = window.localStorage.getItem("userId");
  const userId = window.localStorage.getItem("userId");

  const tokenIsValid = () => {
    fetch("http://localhost:5000/tokenIsValid", {
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
        // console.log(token);
        // setToken(data);
        console.log("token", data);
      });
  };

  const getInfoProduct = () => {
    fetch(`http://localhost:5000/product/get-product/${params.id}`, {
      method: "GET",
      headers: {
        "x-auth-token": tokenData,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setName(data.data.name);
        setAddress(data.data.address);
        setDescription(data.data.description);
        setTime(data.data.time);
        setImages(data.data.images);
      });
  };

  const deleteProduct = (id) => {
    fetch(`http://localhost:5000/product/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Product is deleted");
        window.location.href = "/list";
      });
  };

  const [openPopup, setOpenPopup] = useState(false);
  const [openPopupTracking, setOpenPopupTracking] = useState(false);

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    tokenIsValid();
    getInfoProduct();
  }, []);

  const handleClickOpen = () => {
    // <UpdateTracking open={true}/>
    // setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        display: "flex",
        justifyContent: "center",
        // flexDirection: 'row',
        alignItems: "center",
        minHeight: 800,
      }}
    >
      <ProductDetailWrapper
      // display={"flex"}
      // flexDirection={matches ? "column" : "row"}
      >
        <ProductDetailInfoWrapper
          sx={{ display: "flex", flexDirection: "row",  }}
        >
          <ProductDetail sx={{ mr: 4 }}>
            <Carousel className="main-slide">
              {images &&
                images.map((item, index) => {
                  return <img src={item} />;
                })}
            </Carousel>
          </ProductDetail>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box display={"flex"} flexDirection={"row"}>
              <QRCode
                value={`http://localhost:3000/product/${userId}`}
                size={200}
              />

              <Box display={"flex"} flexDirection={"column"} sx={{ ml: 5 }}>
                <Typography variant="h4" sx={{ mb: 3 }}>
                  Name: {name}
                </Typography>
                <Typography variant="h5" sx={{ lineHeight: 2 }}>
                  Product ID: {params.id}
                </Typography>
                <Typography sx={{ lineHeight: 2 }} variant="h5">
                  Address: {address}
                </Typography>
                <Typography sx={{ lineHeight: 2 }} variant="h5">
                  A number of update: {address}
                </Typography>
              </Box>
            </Box>
            {/* <Divider sx={{ mt: 2, mb: 2 }} /> */}
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography
                variant="body"
                sx={{ lineHeight: 2, whiteSpace: "pre-line" }}
              >
                {" "}
                <ReactReadMoreReadLess
                  readMoreClassName="readMoreClassName"
                  readLessClassName="readMoreClassName"
                  charLimit={200}
                  readMoreText="Read more"
                  readLessText="Read less"
                >
                  {description}
                </ReactReadMoreReadLess>
              </Typography>
              <Box sx={{ mt: 4 }}>
                <Button
                  variant="contained"
                  color="success"
                  sx={{ borderRadius: "10px", width: 200, mr: 2 }}
                  onClick={() => {
                    setOpenPopup(true);
                  }}
                >
                  Update Tracking
                </Button>
                <Popup
                  title="Update Tracking"
                  openPopup={openPopup}
                  setOpenPopup={setOpenPopup}
                >
                  <TrackingForm />
                </Popup>
                <Button
                  variant="contained"
                  color="error"
                  sx={{ borderRadius: "10px", width: 200, mr: 2 }}
                  onClick={() => deleteProduct(params.id)}
                >
                  Delete Product
                </Button>
                <Button
                  variant="contained"
                  color="warning"
                  sx={{ borderRadius: "10px" }}
                  onClick={() => {
                    // window.location.href = `/producttracking/${params.id}`;
                    setOpenPopupTracking(true);
                  }}
                >
                  Tracking
                </Button>
                <Popup
                  title="Tracking"
                  openPopup={openPopupTracking}
                  setOpenPopup={setOpenPopupTracking}
                >
                  <ProductTracking />
                </Popup>
              </Box>
            </Box>
          </Box>
        </ProductDetailInfoWrapper>
      </ProductDetailWrapper>
    </Container>
  );
}

export default Product;
