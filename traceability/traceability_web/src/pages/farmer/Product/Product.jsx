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
  useStepContext,
} from "@mui/material";
import QRCode from "react-qr-code";
import ReactReadMoreReadLess from "react-read-more-read-less";
import Popup from "../../../components/Popup";
import TrackingForm from "../TrackingForm/TrackingForm";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import { styled } from "@mui/material/styles";
import ProductTracking from "../ProductTracking/ProductTracking";
import Loading from "../../../components/Loading";
import * as GiIcons from "react-icons/gi";
import * as HiIcons from "react-icons/hi";
import * as GrIcons from "react-icons/gr";

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
  const [user, setUser] = useState([]);

  const [name, setName] = useState("");
  const [time, setTime] = useState("");
  const [url, setUrl] = useState("");
  const [images, setImages] = useState([]);
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [tracking, setTracking] = useState([]);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const tokenData = window.localStorage.getItem("token");
  // const user = window.localStorage.getItem("userId");
  const userId = window.localStorage.getItem("userId");

  const tokenIsValid = () => {
    fetch("http://backend.teamluanvan.software/tokenIsValid", {
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

  const deleteProduct = (id) => {
    fetch(`http://backend.teamluanvan.software/product/${id}`, {
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

  useEffect(() => {
    tokenIsValid();

    const getUser = async () => {
      await fetch(`http://backend.teamluanvan.software/getAnAuth`, {
        method: "GET",
        headers: {
          "x-auth-token": tokenData,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data.data.name, "USER NAME");
          setUser(data.data);
        });
    };

    getUser();

    const getInfoProduct = async () => {
      setLoading(true);

      await fetch(`http://backend.teamluanvan.software/product/get-product/${params.id}`, {
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
          setTracking(data.data.tracking);
          setUrl(data.data.url);
          // if(data.dataBC[6] == 0)
          //   setStatus("CREATED");
          // else if(data.dataBD[6] === "")
          // console.log(data.dataBC[6]);
        });
      setLoading(false);
    };
    getInfoProduct();
  }, []);

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
      <Loading loading={loading} />

      <ProductDetailWrapper>
        <ProductDetailInfoWrapper
          sx={{ display: "flex", flexDirection: "row" }}
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
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <QRCode
                  value={`https://luan-van2023.vercel.app/product/${userId}`}
                  size={200}
                />
              </Box>
              <Box display={"flex"} flexDirection={"column"} sx={{ ml: 5 }}>
                <Typography variant="h4" sx={{ lineHeight: 2 }}>
                  <GiIcons.GiFruiting /> Name: {name}
                </Typography>
                <Typography variant="h5" sx={{ lineHeight: 2 }}>
                  <GrIcons.GrStatusGood style={{ marginRight: 13 }}/> Product Status: CREATED
                </Typography>
                <Typography sx={{ lineHeight: 2 }} variant="h5">
                  <HiIcons.HiLocationMarker style={{ marginRight: 13 }} />{" "}
                  Address: {address}
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    borderRadius: "10px",
                    width: 150,
                    lineHeight: 2,
                    mt: 2,
                  }}
                  onClick={() => {
                    window.location.href = `${url}`;
                  }}
                >
                  Check product
                </Button>
              </Box>
            </Box>
            <Divider sx={{ mt: 2, mb: 2 }} />
            <Box display={"flex"} flexDirection={"column"}>
              <Typography variant="text" sx={{}}>
                <HiIcons.HiUser style={{marginRight: 10, fontSize: 25 }} />{" "}
                Farmer: {user.name}
              </Typography>
              <Typography variant="text" sx={{}}>
                <HiIcons.HiOutlineMail style={{ marginRight: 10, fontSize: 25 }} />{" "}
                Email: {user.email}
              </Typography>
            </Box>

            <Divider sx={{ mt: 2, mb: 2 }} />
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
                  <ProductTracking id={params.id} />
                </Popup>
              </Box>
            </Box>
            <Divider sx={{ mt: 2, mb: 2 }} />
            <Typography sx={{ mt: 2, fontSize: 15 }} variant="h5">
              <HiIcons.HiInformationCircle
                style={{ marginRight: 10, fontSize: 20 }}
              />
              Updated: 2
            </Typography>
          </Box>
        </ProductDetailInfoWrapper>
      </ProductDetailWrapper>
    </Container>
  );
}

export default Product;
