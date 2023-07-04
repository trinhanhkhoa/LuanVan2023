import React, { useState, useEffect } from "react";
import "./UpdateProduct.css";
import { Link, useParams } from "react-router-dom";
import QRCode from "qrcode.react";
import { uploadImage } from "../../../components/MultiUpload";
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  ImageList,
  ImageListItem,
  InputAdornment,
  Select,
  TextField,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import Loading from "../../../components/Loading";
import Popup from "../../../components/Popup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import { fDate } from "../../../utils/formatTime";

function UpdateProduct() {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(isOpen);
  };

  const [images, setImages] = useState([]);
  const [imagesCertificates, setImagesCertificates] = useState([]);

  const [tracking, setTracking] = useState(0);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [openQrCode, setOpenQrCode] = useState(false);
  const [processId, setProcessId] = useState("");
  const [processName, setProcessName] = useState([]);
  const [time, setTime] = useState(null);

  const handleChange = (date) => {
    setTime(date);
  };

  const params = useParams();

  const tokenData = window.localStorage.getItem("token");
  const user = window.localStorage.getItem("userId");
  const userId = window.localStorage.getItem("userId");

  const getInfoProduct = async () => {
    setLoading(true);

    await fetch(
      `${process.env.REACT_APP_API}/product/get-product/${params.id}`,
      {
        method: "GET",
        headers: {
          "x-auth-token": tokenData,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        let dateTime = parseDate(data.data.time);
        // let dateTime = Date.parse(data.data.time);

        setName(data.data.name);
        setImages(data.data.images);
        setImagesCertificates(data.data.certificates);
        setAddress(data.data.address);
        setDescription(data.data.description);
        setTime(dateTime);
        setProcessId(data.data.processId);
        setTracking(data.data.tracking.length);
      });
    setLoading(false);
  };

  const getProcesses = async () => {
    setLoading(true);

    await fetch(`${process.env.REACT_APP_API}/process/get-processes`, {
      method: "GET",
      headers: {
        "x-auth-token": tokenData,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);

        setProcessName(data.data);
      });
  };

  const putInfoProduct = async () => {
    setLoading(true);

    await fetch(
      `${process.env.REACT_APP_API}/product/update-product/${params.id}`,
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
          images: images,
          certificates: imagesCertificates,
          time: time.toLocaleDateString("en-GB"),
          description,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);

        window.location.href = "/list";
      });
  };

  useEffect(() => {
    getProcesses();
    getInfoProduct();
  }, []);

  const parseDate = (dateString) => {
    const [day, month, year] = dateString.split("/");
    const parsedDate = new Date(year, month - 1, day);
    return parsedDate;
  };

  const downloadQRCode = () => {
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

  const CustomInput = ({ value, onClick }) => (
    <TextField
      type="text"
      fullWidth
      required
      value={value}
      onClick={onClick}
      placeholder="Chọn thời gian"
      readOnly
      InputProps={{
        endAdornment: (
          <InputAdornment position="start">
            <CalendarMonthRoundedIcon />
          </InputAdornment>
        ),
      }}
    />
  );

  return (
    <Container
      fixed
      sx={{ justifyContent: "center", alignItems: "center", minHeight: "80vh" }}
    >
      <Loading loading={loading} />

      <Box sx={{ margin: "20px" }}>
        <Typography
          variant="h3"
          sx={{
            fontSize: { xs: "30px", md: "48px" },
            fontWeight: 700,
          }}
        >
          Cập nhật thông tin chung
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          margin: { xs: "0", md: "20px" },
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <QRCode
              id="qr-gen"
              level={"H"}
              value={`${params.id}`}
              size={180}
            />
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
              <QRCode
                id="qr-gen"
                level={"H"}
                value={`${params.id}`}
                size={240}
                includeMargin={true}
              />
              <Button
                variant="contained"
                color="success"
                sx={{
                  display: { xs: "block", md: "none" },
                  borderRadius: "10px",
                  marginTop: "20px",
                  lineHeight: 2,
                  width: 200,
                  m: 2,
                }}
                onClick={downloadQRCode}
              >
                Tải mã QR
              </Button>
            </Popup>
            <Button
              variant="contained"
              color="success"
              sx={{
                borderRadius: "10px",
                marginTop: "20px",
                lineHeight: 2,
                width: 200,
                m: 2,
              }}
              onClick={() => {
                window.location.href = `/product/${params.id}`;
              }}
            >
              Xem sản phẩm
            </Button>
            <Button
              variant="contained"
              color="success"
              sx={{
                display: { xs: "none", md: "block" },
                borderRadius: "10px",
                marginTop: "20px",
                lineHeight: 2,
                width: 200,
                m: 2,
              }}
              onClick={downloadQRCode}
            >
              Tải mã QR
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            marginLeft: { xs: 0, md: 5 },
          }}
        >
          <Box
            sx={{ display: "flex", flexDirection: "column", marginBottom: 2 }}
          >
            <label>
              Tên sản phẩm <b className="requireDot">*</b>
            </label>
            <TextField
              required
              variant="outlined"
              placeholder="Nhập tên sản phẩm"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{ width: { xs: 400, md: 800 }, borderRadius: "20%" }}
            />
          </Box>
          <Box
            sx={{ display: "flex", flexDirection: "column", marginBottom: 2 }}
          >
            <label>
              Thời gian tạo <b className="requireDot">*</b>
            </label>
            <DatePicker
              name="time"
              required
              fullWidth
              selected={time}
              minDate={time}
              onChange={handleChange}
              customInput={<CustomInput />}
              dateFormat="dd/MM/yyyy"
              // placeholderText="Select a date"
            />
          </Box>
          <Grid item xs={11} marginBottom={2}>
            <label>
              Chọn quy trình trồng cây <b className="requireDot">*</b>
            </label>
            {tracking < 1 ? (
              <FormControl fullWidth>
                <Select
                  native
                  fullWidth
                  variant="outlined"
                  defaultValue={30}
                  inputProps={{
                    name: "age",
                    id: "uncontrolled-native",
                  }}
                  value={processId}
                  onChange={(e) => {
                    setProcessId(e.target.value);
                    console.log(e.target.value);
                  }}
                >
                  {processName &&
                    processName.map((item, index) => {
                      return (
                        <option key={index} value={item._id}>
                          {item.stageProcess.name}
                        </option>
                      );
                    })}
                </Select>
              </FormControl>
            ) : (
              <FormControl disabled fullWidth>
                <Select
                  native
                  fullWidth
                  variant="outlined"
                  defaultValue={30}
                  inputProps={{
                    name: "age",
                    id: "uncontrolled-native",
                  }}
                  value={processId}
                  onChange={(e) => {
                    setProcessId(e.target.value);
                    console.log(e.target.value);
                  }}
                >
                  {processName &&
                    processName.map((item, index) => {
                      return (
                        <option key={index} value={item._id}>
                          {item.stageProcess.name}
                        </option>
                      );
                    })}
                </Select>
              </FormControl>
            )}
          </Grid>
          <Box
            sx={{ display: "flex", flexDirection: "column", marginBottom: 2 }}
          >
            <label>
              Địa chỉ <b className="requireDot">*</b>
            </label>
            <TextField
              required
              variant="outlined"
              placeholder="Nhập địa chỉ"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              sx={{ width: { xs: 400, md: 800 }, borderRadius: "20%" }}
            />
          </Box>
          <Box
            sx={{ display: "flex", flexDirection: "column", marginBottom: 2 }}
          >
            <label>
              Hình ảnh sản phẩm <b className="requireDot">*</b>
            </label>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                border: "2px dashed #1475cf",
                borderRadius: "10px",
                height: "200px",
                width: { xs: "350px", md: "450px" },
                cursor: "pointer",
              }}
              onClick={() => {
                document.querySelector(".input-field").click();
              }}
            >
              <input
                className="input-field"
                type="file"
                accept="image/*"
                multiple
                hidden
                onChange={async (e) => {
                  e.preventDefault();
                  let arrayImages = e.target.files;

                  const MAX_LENGTH = 3;
                  if (Array.from(arrayImages).length > MAX_LENGTH) {
                    e.preventDefault();
                    alert(`Cannot upload files more than ${MAX_LENGTH}`);
                    return;
                  }

                  if (Array.from(arrayImages).length < 1) {
                    e.preventDefault();
                    return;
                  }

                  console.log(`arrayImages`, arrayImages);

                  setLoading(true);

                  try {
                    let arr = [];
                    for (let i = 0; i < arrayImages.length; i++) {
                      const data = await uploadImage(arrayImages[i]);
                      arr.push(data.url);
                    }
                    setImages(arr);
                  } catch (error) {
                    console.log(error);
                  }
                  setLoading(false);
                }}
              />
              <ImageList
                sx={{
                  minWidth: { xs: 300, md: 300 },
                  height: 200,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                cols={3}
                rowHeight={140}
              >
                {images &&
                  images.map((item) => {
                    return (
                      <ImageListItem
                        key={item}
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <img
                          src={item}
                          width={100}
                          height={100}
                          className="image-link"
                        />
                      </ImageListItem>
                    );
                  })}
              </ImageList>
            </Box>
          </Box>
          <Box
            sx={{ display: "flex", flexDirection: "column", marginBottom: 2 }}
          >
            <label>
              Hình ảnh chứng nhận <b className="requireDot">*</b>
            </label>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                border: "2px dashed #1475cf",
                borderRadius: "10px",
                height: "200px",
                width: { xs: "350px", md: "450px" },
                cursor: "pointer",
              }}
              onClick={() => {
                document.querySelector(".input-field-certificates").click();
              }}
            >
              <input
                className="input-field-certificates"
                type="file"
                accept="image/*"
                multiple
                hidden
                onChange={async (e) => {
                  e.preventDefault();
                  let arrayImages = e.target.files;

                  const MAX_LENGTH = 3;
                  if (Array.from(arrayImages).length > MAX_LENGTH) {
                    e.preventDefault();
                    alert(`Cannot upload files more than ${MAX_LENGTH}`);
                    return;
                  }

                  
                  if (Array.from(arrayImages).length < 1) {
                    e.preventDefault();
                    return;
                  }

                  console.log(`arrayImages`, arrayImages);

                  setLoading(true);

                  try {
                    let arr = [];
                    for (let i = 0; i < arrayImages.length; i++) {
                      const data = await uploadImage(arrayImages[i]);
                      arr.push(data.url);
                    }
                    setImagesCertificates(arr);
                  } catch (error) {
                    console.log(error);
                  }
                  setLoading(false);
                }}
              />
              <ImageList
                sx={{
                  minWidth: { xs: 300, md: 300 },
                  height: 200,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                cols={3}
                rowHeight={140}
              >
                {imagesCertificates &&
                  imagesCertificates.map((item) => {
                    return (
                      <ImageListItem
                        key={item}
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <img
                          src={item}
                          width={100}
                          height={100}
                          className="image-link"
                        />
                      </ImageListItem>
                    );
                  })}
              </ImageList>
            </Box>
          </Box>
          <Box
            sx={{ display: "flex", flexDirection: "column", marginBottom: 2 }}
          >
            <label>
              Mô tả <b className="requireDot">*</b>
            </label>
            <Box sx={{ width: { xs: 400, md: "100%" } }}>
              <TextareaAutosize
                required
                maxRows={20}
                aria-label="maximum height"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{ width: "100%", minHeight: "100px" }}
              />
            </Box>
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
          onClick={putInfoProduct}
        >
          Xác nhận
        </Button>
      </Box>
    </Container>
  );
}

export default UpdateProduct;
