import React, { useState, useEffect} from 'react';
import './ProcessDetail.css';
import { Link, useParams } from "react-router-dom";
import { Box, Button, Container, Divider, Typography } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ReactReadMoreReadLess from "react-read-more-read-less";

const ProductDetailWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  padding: theme.spacing(4),
  justifyContent: "center",
}));

const ProductDetailInfoWrapper = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  maxWidth: 1600,
  lineHeight: 1.5,
}));

export const ProductDetail = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "left",
  width: 1000,
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

function ProcessDetail() {
  const [isOpen, setIsOpen] = useState(false);
 
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }

  const params = useParams();
  console.log(params);
  
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");
  const [address, setAddress] = useState("");
  const [images, setImages] = useState([]);
  const tokenData = window.localStorage.getItem("token");
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  const tokenIsValid = () => {
    fetch("https://backend.teamluanvan.software/tokenIsValid", {
      method:"POST",
      crossDomain:true,
      headers: {
        'x-auth-token': tokenData,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin":"*"
      }
    })
      .then((res) => res.json() )
      .then((data) => {
        console.log("token", data)
      });
  }

  const getInfoProcess = () => {
    fetch(`https://backend.teamluanvan.software/process/get-process/${params.id}`, {
      method: "GET",
      headers: {
        'x-auth-token': tokenData,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setName(data.data.name);
        setAddress(data.data.address);
        setDescription(data.data.description);
        setImages(data.data.images);
        console.log(data.data);
      });
  }

  useEffect(() => {
    tokenIsValid();
    getInfoProcess();
  }, []);

  return (
    <Container
    maxWidth={false}
    sx={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      minHeight: 800,
    }}
  >
    <ProductDetailWrapper
      display={"flex"}
      flexDirection={matches ? "column" : "row"}
    >
      <ProductDetailInfoWrapper>
        <Box display={"flex"} flexDirection={"row"}>
          <ProductDetail sx={{ mr: 4 }}>
            <Carousel className="main-slide-process">
              {images &&
                images.map((item, index) => {
                  return <img src={item} />;
                })}
            </Carousel>
          </ProductDetail>
          <Box>
            <Typography variant="h4" sx={{ mb: 3 }}>
              Name: {name}
            </Typography>
            <Typography variant="h5" sx={{ lineHeight: 3 }}>
              Product ID: {params.id}
            </Typography>
            <Typography sx={{ lineHeight: 3 }} variant="h5">
              Address: {address}
            </Typography>
          </Box>
        </Box>
        <Divider sx={{ mt: 2, mb: 2 }} />
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
      </ProductDetailInfoWrapper>
    </ProductDetailWrapper>
  </Container>
  )
}

export default ProcessDetail