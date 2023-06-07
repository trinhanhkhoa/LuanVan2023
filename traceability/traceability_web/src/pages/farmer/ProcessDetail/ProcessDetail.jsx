import React, { useState, useEffect } from "react";
import "./ProcessDetail.css";
import { Link, useParams } from "react-router-dom";
import { Box, Button, Container, Divider, Typography } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ReactReadMoreReadLess from "react-read-more-read-less";
import { Carousel } from "react-carousel-minimal";

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

function ProcessDetail() {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

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
  const [img, setImg] = useState([]);

  const prepareImages = async (images) => {
    if (images) {
      const mappingImages = await Promise.all([
        images.map((i) => {
          return { image: i };
        }),
      ]);

      return mappingImages;
    }
    return null;
  };

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

  const getInfoProcess = async () => {
    const data = await fetch(
      `https://backend.teamluanvan.software/process/get-process/${params.id}`,
      {
        method: "GET",
        headers: {
          "x-auth-token": tokenData,
        },
      }
    )
      .then((res) => res.json())
      .then((res) => res.data);
    console.log(data);

    setName(data.name);
    setAddress(data.address);
    setDescription(data.description);
    setImages(data.images);

    const mappingImages = await prepareImages(data.images);

    if (mappingImages) setImg([...mappingImages[0]]);
  };

  const captionStyle = {
    fontSize: "2em",
    fontWeight: "bold",
  };
  const slideNumberStyle = {
    fontSize: "20px",
    fontWeight: "bold",
  };

  useEffect(() => {
    tokenIsValid();
    getInfoProcess();
  }, []);

  return (
    <Container
      maxWidth={false}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: 900,
      }}
    >
      <ProductDetailWrapper>
        <ProductDetailInfoWrapper
          sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <ProductDetail sx={{ mr: 4 }}>
              {img && img.length > 0 && (
                <Carousel
                  data={img}
                  time={2000}
                  width="850px"
                  height="600px"
                  captionStyle={captionStyle}
                  radius="10px"
                  slideNumber={true}
                  slideNumberStyle={slideNumberStyle}
                  automatic={true}
                  dots={true}
                  pauseIconColor="white"
                  pauseIconSize="40px"
                  slideBackgroundColor="darkgrey"
                  slideImageFit="cover"
                  // thumbnails={true}
                  // thumbnailWidth="100px"
                />
              )}
            </ProductDetail>
            <Box sx={{ mt: 4, 
              display: "flex",
              justifyContent: "center"
            }}>
            </Box>
          </Box>
          <Divider sx={{ mt: 2, mb: 2 }} />
          <Box
            sx={{
              lineHeight: 2,
              whiteSpace: "pre-line",
              width: { xs: 400, md: 700 },
            }}
          >
            <Typography variant="h4" sx={{ mb: 3 }}>
              Name: {name}
            </Typography>
            <Typography sx={{ lineHeight: 3 }} variant="h5">
              Address: {address}
            </Typography>
            <Typography
              variant="body"
              sx={{ lineHeight: 2, whiteSpace: "pre-line", maxWidth: 700 }}
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
          </Box>
        </ProductDetailInfoWrapper>
      </ProductDetailWrapper>
    </Container>
  );
}

export default ProcessDetail;
