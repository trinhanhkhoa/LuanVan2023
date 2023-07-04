import React, { useState, useEffect } from "react";
import "./Product.css";
import { Link, useParams } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  Grid,
  ImageListItem,
  Slide,
  Typography,
  useStepContext,
} from "@mui/material";
import QRCode from "qrcode.react";
import ReactReadMoreReadLess from "react-read-more-read-less";
import Popup from "../../../components/Popup";
import TrackingForm from "../TrackingForm/TrackingForm";
import { styled } from "@mui/material/styles";
import ProductTracking from "../ProductTracking/ProductTracking";
import Loading from "../../../components/Loading";
import * as HiIcons from "react-icons/hi";
import { Carousel } from "react-carousel-minimal";
import LabelImportantIcon from "@mui/icons-material/LabelImportant";
import VerifiedIcon from "@mui/icons-material/Verified";

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

function Product(props) {
  const { pid } = props;
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
  const [imagesCertificates, setImagesCertificates] = useState([]);

  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [tracking, setTracking] = useState([]);
  const [trackingName, setTrackingName] = useState([]);

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [processId, setProcessId] = useState("");

  const [img, setImg] = useState([]);

  const [openPopup, setOpenPopup] = useState(false);
  const [openQrCode, setOpenQrCode] = useState(false);
  const [openCertificates, setOpenCertificates] = useState(false);
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

  const tokenData = window.localStorage.getItem("token");
  const userType = window.localStorage.getItem("userType");

  useEffect(() => {
    const getInfoProduct = async () => {
      setLoading(true);

      const data = await fetch(
        `${process.env.REACT_APP_API}/product/get-product/${
          userType === "Admin" || userType === "admin" ? pid : params.id
        }`,
        {
          method: "GET",
          headers: {
            "x-auth-token": tokenData,
          },
        }
      ).then((res) => res.json());
      const userId = data.data.userId;
      // console.log("id", userId);

      setName(data.data.name);
      setAddress(data.data.address);
      setDescription(data.data.description);
      setTime(data.data.time);
      setTracking(data.data.tracking);
      setUrl(data.data.url);
      setImages(data.data.images);
      setProcessId(data.data.processId);
      setImagesCertificates(data.data.certificates);

      if (data.dataBC[6] == 0) setStatus("Đã tạo");
      else if (data.dataBC[6] == 1) setStatus("Đã cập nhật");
      else if (data.dataBC[6] == 2) setStatus("Đã xóa");
      else if (data.dataBC[6] == 3) setStatus("Đã vận chuyển");

      setLoading(false);

      // mapping
      const mappingImages = await prepareImages(data.data.images);

      if (mappingImages) setImg([...mappingImages[0]]);

      const getUserInfo = async () => {
        await fetch(`${process.env.REACT_APP_API}/`, {
          method: "GET",
          headers: {
            "x-auth-token": tokenData,
          },
        })
          .then((res) => res.json())
          .then((res) => {
            let user = res.data;

            user = user.filter((u) => u._id == userId);
            setUser(user[0]);
          });
      };
      getUserInfo();
    };
    getInfoProduct();
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const downloadQRCode = () => {
    // Generate download with use canvas and stream
    const canvas = document.getElementById("qr-gen");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `QR-${name}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
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
        minHeight: "80vh",
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
                <QRCode
                  id="qr-gen"
                  level={"H"}
                  value={`${params.id}`}
                  size={200}
                  // includeMargin={true}
                />
                {/* <Button
                  variant="contained"
                  sx={{
                    display: { xs: "none", md: "block" },
                    borderRadius: "10px",
                    width: 180,
                    lineHeight: 2,
                    m: { xs: 2, md: 0 },
                    mt: { xs: 2, md: 2 },
                  }}
                  onClick={() => {
                    window.location.href = `${url}`;
                  }}
                >
                  Kiểm tra sản phẩm
                </Button> */}
                <Button
                  variant="contained"
                  color="info"
                  sx={{
                    display: { xs: "none", md: "block" },
                    borderRadius: "10px",
                    width: 180,
                    lineHeight: 2,
                    m: { xs: 2, md: 0 },
                    mt: { xs: 2, md: 2 },
                  }}
                  onClick={downloadQRCode}
                >
                  Tải mã QR
                </Button>
              </Box>
              <Box
                display={"flex"}
                flexDirection={"column"}
                sx={{ ml: { xs: 0, md: 5 } }}
              >
                <Typography
                  variant="h4"
                  sx={{ fontSize: { xs: "20px", md: "30px" } }}
                >
                  {name}
                </Typography>

                <Typography
                  maxWidth={false}
                  variant="body"
                  sx={{
                    mt: 1,
                    mb: 1,
                    padding: 0.5,
                    minWidth: 100,
                    backgroundColor:
                      status == "Đã tạo"
                        ? "#76ff03"
                        : status == "Đã cập nhật"
                        ? "#ffff00"
                        : status == "Đã xóa"
                        ? "#ff5722"
                        : status == "Đã vận chuyển"
                        ? "#40c4ff"
                        : "#ff3d00",
                    borderRadius: 2,
                    textAlign: "center",
                    fontSize: { xs: "15px", md: "15px" },
                  }}
                >
                  {" "}
                  {status}{" "}
                </Typography>
                <Typography
                  sx={{
                    lineHeight: 2,
                    fontSize: { xs: "15px", md: "15px" },
                    fontStyle: "italic",
                  }}
                  variant="body"
                >
                  Địa chỉ: <b>{address}</b>
                </Typography>
                <Typography
                  sx={{
                    lineHeight: 2,
                    fontSize: { xs: "15px", md: "15px" },
                    fontStyle: "italic",
                  }}
                  variant="body"
                >
                  Ngày tạo: <b>{time}</b>
                </Typography>
                <Typography
                  color="green"
                  sx={{
                    width: 180,
                    lineHeight: 2,
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    window.location.href = `${url}`;
                  }}
                >
                  <VerifiedIcon style={{ marginRight: 10, fontSize: 25 }} />{" "}
                  Kiểm tra sản phẩm
                </Typography>
                {userType === "Admin" || userType === "admin" ? null : (
                  <Typography
                    color="blue"
                    sx={{
                      width: 150,
                      lineHeight: 2,
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setOpenCertificates(true);
                    }}
                  >
                    <LabelImportantIcon
                      style={{ marginRight: 10, fontSize: 25 }}
                    />{" "}
                    Chứng nhận
                  </Typography>
                )}
                <Popup
                  title="Chứng nhận"
                  openPopup={openCertificates}
                  setOpenPopup={setOpenCertificates}
                >
                  {imagesCertificates &&
                    imagesCertificates.map((item) => {
                      return <img src={item} width={400} height={600} />;
                    })}
                </Popup>
                <Divider sx={{ mt: 2, mb: 2 }} />
                <Box display={"flex"} flexDirection={"column"}>
                  <Typography variant="text" sx={{}}>
                    <HiIcons.HiUser style={{ marginRight: 10, fontSize: 25 }} />{" "}
                    Tên: <b>{user.name}</b>
                  </Typography>
                  <Typography variant="text">
                    <HiIcons.HiOutlineMail
                      style={{ marginRight: 10, fontSize: 25 }}
                    />{" "}
                    Email: <b>{user.email}</b>
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: { xs: "flex", md: "block" },
                    flexDirection: { xs: "row", md: "column" },
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
                    Mã QR
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
                      display: { xs: "block", md: "none" },
                      borderRadius: "10px",
                      minWidth: 180,
                      lineHeight: 2,
                      m: { xs: 2, md: 0 },
                      mt: { xs: 2, md: 2 },
                    }}
                    onClick={() => {
                      window.location.href = `${url}`;
                    }}
                  >
                    Kiểm tra sản phẩm
                  </Button>
                </Box>
              </Box>
            </Box>

            <Divider sx={{ mt: 2, mb: 2 }} />
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography
                variant="body"
                sx={{
                  lineHeight: 2,
                  whiteSpace: "pre-line",
                  width: { xs: 300, md: 800 },
                }}
              >
                {" "}
                <ReactReadMoreReadLess
                  readMoreClassName="readMoreClassName"
                  readLessClassName="readMoreClassName"
                  charLimit={200}
                  readMoreText="Xem thêm"
                  readLessText="Thu gọn"
                >
                  {description}
                </ReactReadMoreReadLess>
              </Typography>
              {userType === "Admin" || userType === "admin" ? null : (
                <Grid container xs={11} sx={{ mt: 4 }}>
                  <Grid item xs={2}>
                    <Button
                      variant="contained"
                      color="warning"
                      sx={{ borderRadius: "10px", height: { xs: 60, md: 37 } }}
                      onClick={() => {
                        setOpenPopupTracking(true);
                      }}
                    >
                      Nhật ký
                    </Button>
                    <Popup
                      title="Nhật ký"
                      openPopup={openPopupTracking}
                      setOpenPopup={setOpenPopupTracking}
                    >
                      <ProductTracking id={params.id} processId={processId} />
                    </Popup>
                  </Grid>
                  <Grid item xs={4}>
                    <Button
                      variant="contained"
                      color="success"
                      sx={
                        status === "Đã xóa" || status === "Đã vận chuyển"
                          ? {
                              display: "none",
                              borderRadius: "10px",
                              width: { xs: 100, md: 200 },
                              mr: 2,
                            }
                          : {
                              display: "block",
                              borderRadius: "10px",
                              width: { xs: 100, md: 200 },
                              mr: 2,
                            }
                      }
                      onClick={() => {
                        setOpenPopup(true);
                      }}
                    >
                      Thêm nhật ký
                    </Button>
                    <Popup
                      title="Update Tracking"
                      openPopup={openPopup}
                      setOpenPopup={setOpenPopup}
                    >
                      <TrackingForm processId={processId} />
                    </Popup>
                  </Grid>
                </Grid>
              )}
            </Box>
            <Divider sx={{ mt: 2, mb: 2 }} />
            <Typography sx={{ mt: 2, fontSize: 15, color: "red" }} variant="h5">
              <HiIcons.HiInformationCircle
                style={{ marginRight: 10, fontSize: 20 }}
              />
              Đã thêm nhật ký: {tracking.length} lần
            </Typography>
          </Box>
        </ProductDetailInfoWrapper>
      </ProductDetailWrapper>
    </Container>
  );
}

export default Product;
