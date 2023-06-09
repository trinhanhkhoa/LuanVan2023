import React, { useState, useEffect } from "react";
import "./Product.css";
import cam from "../../../asserts/cam.jpg";
import * as TbIcons from "react-icons/tb";
import { Link, useParams } from "react-router-dom";
import Data from "../../../Data.json";
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
  useStepContext,
} from "@mui/material";
import QRCode from "react-qr-code";
import ReactReadMoreReadLess from "react-read-more-read-less";
import Popup from "../../../components/Popup";
import TrackingForm from "../TrackingForm/TrackingForm";
import { styled } from "@mui/material/styles";
import ProductTracking from "../ProductTracking/ProductTracking";
import Loading from "../../../components/Loading";
import * as GiIcons from "react-icons/gi";
import * as HiIcons from "react-icons/hi";
import * as GrIcons from "react-icons/gr";
import { Carousel } from "react-carousel-minimal";

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

const test = [
  {
    image:
      "https://res.cloudinary.com/ds6usv4r6/image/upload/v1685856548/xgljjs5dnai4qohxllv1.jpg",
  },
  {
    image:
      "https://res.cloudinary.com/ds6usv4r6/image/upload/v1685856548/xgljjs5dnai4qohxllv1.jpg",
  },
  {
    image:
      "https://res.cloudinary.com/ds6usv4r6/image/upload/v1685856548/xgljjs5dnai4qohxllv1.jpg",
  },
  {
    image:
      "https://res.cloudinary.com/ds6usv4r6/image/upload/v1685856548/xgljjs5dnai4qohxllv1.jpg",
  },
];

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
  const [user, setUser] = useState([]);
  const tokenData = window.localStorage.getItem("token");

  const [name, setName] = useState("");
  const [time, setTime] = useState("");
  const [url, setUrl] = useState("");
  const [images, setImages] = useState([]);
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [tracking, setTracking] = useState([]);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const [img, setImg] = useState([]);

  const deleteProduct = (id) => {
    fetch(`https://backend.teamluanvan.software/product/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Product is deleted");
        window.location.href = "/list";
      });
  };

  const [openPopup, setOpenPopup] = useState(false);
  const [openQrCode, setOpenQrCode] = useState(false);
  const [openPopupTracking, setOpenPopupTracking] = useState(false);

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

  useEffect(() => {
    const getUser = async () => {
      await fetch(`https://backend.teamluanvan.software/getAnAuth`, {
        method: "GET",
        headers: {
          "x-auth-token": tokenData,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setUser(data.data);
        });
    };

    getUser();

    const getInfoProduct = async () => {
      setLoading(true);

      const data = await fetch(
        `https://backend.teamluanvan.software/product/get-product/${params.id}`,
        {
          method: "GET",
          headers: {
            "x-auth-token": tokenData,
          },
        }
      )
        .then((res) => res.json())
        //   // if(data.dataBC[6] == 0)
        //   //   setStatus("CREATED");
        //   // else if(data.dataBD[6] === "")
        //   // console.log(data.data.images);
        //   // console.log(test);
        .then((res) => res.data);
      console.log(data);
      setName(data.name);
      setAddress(data.address);
      setDescription(data.description);
      setTime(data.time);
      setTracking(data.tracking);
      setUrl(data.url);
      setImages(data.images);

      setLoading(false);

      // mapping
      const mappingImages = await prepareImages(data.images);

      if (mappingImages) setImg([...mappingImages[0]]);
    };

    getInfoProduct();
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const captionStyle = {
    fontSize: "2em",
    fontWeight: "bold",
  };
  const slideNumberStyle = {
    fontSize: "20px",
    fontWeight: "bold",
  };

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
      <Loading loading={loading} />

      <ProductDetailWrapper>
        <ProductDetailInfoWrapper
          sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}
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
              />
            )}
          </ProductDetail>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
              }}
            >
              <Box
                sx={{
                  display: { xs: "none", md: "flex" },
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <QRCode value={`${params.id}`} size={200} />
              </Box>
              <Box
                display={"flex"}
                flexDirection={"column"}
                sx={{ ml: { xs: 0, md: 5 } }}
              >
                <Typography
                  variant="h4"
                  sx={{ lineHeight: 2, fontSize: { xs: "20px", md: "30px" } }}
                >
                  {name}
                </Typography>
                <Typography
                  variant="body"
                  sx={{ lineHeight: 2,fontSize: { xs: "15px", md: "15px" } }}
                >
                  Status: CREATED
                </Typography>
                <Typography
                  sx={{ lineHeight: 2,fontSize: { xs: "15px", md: "15px" } }}
                  variant="body"
                >
                  Address: {address}
                </Typography>
                <Box
                  sx={{
                    display: {xs: "flex", md: "block"},
                    flexDirection: { xs: "row", md: "column"},
                    alignItems: "center",
                  }}
                >
                  <Button
                    variant="contained"
                    color="secondary"
                    sx={{
                      display: { xs: "block", md: "none" },
                      borderRadius: "10px",
                      width: 150,
                      lineHeight: 2,
                      m: 2,
                    }}
                    onClick={() => {
                      setOpenQrCode(true);
                    }}
                  >
                    QR Code
                  </Button>
                  <Popup
                    title="Qr Code"
                    openPopup={openQrCode}
                    setOpenPopup={setOpenQrCode}
                  >
                    <QRCode value={`${params.id}`} size={180} />
                  </Popup>
                  <Button
                    variant="contained"
                    sx={{
                      borderRadius: "10px",
                      width: 150,
                      lineHeight: 2,
                      m: {xs: 2, md: 0},
                      mt: {xs: 2, md: 2}
                    }}
                    onClick={() => {
                      window.location.href = `${url}`;
                    }}
                  >
                    Check product
                  </Button>
                </Box>
              </Box>
            </Box>
            <Divider sx={{ mt: 2, mb: 2 }} />
            <Box display={"flex"} flexDirection={"column"}>
              <Typography variant="text" sx={{}}>
                <HiIcons.HiUser style={{ marginRight: 10, fontSize: 25 }} />{" "}
                Farmer: {user.name}
              </Typography>
              <Typography variant="text" sx={{}}>
                <HiIcons.HiOutlineMail
                  style={{ marginRight: 10, fontSize: 25 }}
                />{" "}
                Email: {user.email}
              </Typography>
            </Box>

            <Divider sx={{ mt: 2, mb: 2 }} />
            <Box
              sx={{ display: "flex", flexDirection: "column" }}
            >
              <Typography
                variant="body"
                sx={{ lineHeight: 2, whiteSpace: "pre-line", width: {xs: 300, md: 800} }}
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
                  sx={{
                    borderRadius: "10px",
                    width: { xs: 100, md: 200 },
                    mr: 2,
                  }}
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
                {/* <Button
                  variant="contained"
                  color="error"
                  sx={{
                    borderRadius: "10px",
                    width: { xs: 100, md: 200 },
                    mr: 2,
                  }}
                  onClick={() => deleteProduct(params.id)}
                >
                  Delete Product
                </Button> */}
                <Button
                  variant="contained"
                  color="warning"
                  sx={{ borderRadius: "10px", height: { xs: 60, md: 37 } }}
                  onClick={() => {
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
                  <ProductTracking
                    id={params.id}
                    trackingLength={tracking.length}
                  />
                </Popup>
              </Box>
            </Box>
            <Divider sx={{ mt: 2, mb: 2 }} />
            <Typography sx={{ mt: 2, fontSize: 15 }} variant="h5">
              <HiIcons.HiInformationCircle
                style={{ marginRight: 10, fontSize: 20 }}
              />
              Update tracking: {tracking.length} times
            </Typography>
          </Box>
        </ProductDetailInfoWrapper>
      </ProductDetailWrapper>
    </Container>
  );
}

export default Product;
