import React, { useState, useEffect, Fragment } from "react";
import "./ProcessDetail.css";
import { Link, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Divider,
  Typography,
  Tabs,
  Tab,
  Grid,
} from "@mui/material";
import PropTypes from "prop-types";
import { styled, useTheme } from "@mui/material/styles";
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

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function ProcessDetail() {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const params = useParams();
  const [data, setData] = useState([]);
  const [userName, setUserName] = useState("");
  const [userType, setUserType] = useState("");
  const [userEmail, setUserEmail] = useState("");

  let id = "";
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");
  const tokenData = window.localStorage.getItem("token");
  const [img, setImg] = useState([]);
  const [stagePlantSeeds, setStagePlantSeeds] = useState([]);
  const [stagePlantCare, setStagePlantCare] = useState([]);
  const [stageBloom, setStageBloom] = useState([]);
  const [stageCover, setStageCover] = useState([]);
  const [stageHarvest, setStageHarvest] = useState([]);
  const [stageSell, setStageSell] = useState([]);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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

  const captionStyle = {
    fontSize: "2em",
    fontWeight: "bold",
  };
  const slideNumberStyle = {
    fontSize: "20px",
    fontWeight: "bold",
  };

  useEffect(() => {
    const getInfoProcess = async () => {
      const data = await fetch(
        `${process.env.REACT_APP_API}/process/get-process/${params.id}`,
        {
          method: "GET",
          headers: {
            "x-auth-token": tokenData,
          },
        }
      )
        .then((res) => res.json())
        .then((res) => res.data);
      // console.log(data.userId);

      setData(data);
      const userId = data.userId;
      setName(data.stageProcess.name);
      setTime(data.stageProcess.timeCreate);
      setDescription(data.stageProcess.description);
      setStagePlantSeeds(data.stagePlantSeeds);
      setStagePlantCare(data.stagePlantCare);
      setStageBloom(data.stageBloom);
      setStageCover(data.stageCover);
      setStageHarvest(data.stageHarvest);
      setStageSell(data.stageSell);

      const mappingImages = await prepareImages(data.stageProcess.images);

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
            // console.log(user[0]);
            setUserName(user[0].name);
            setUserType(user[0].userType);
            setUserEmail(user[0].email);
          });
      };
      getUserInfo();
    };

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
        minHeight: 900,
      }}
    >
      <ProductDetailWrapper>
        <ProductDetailInfoWrapper
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "column" },
          }}
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
                  time={3000}
                  width="2050px"
                  height="500px"
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
            <Box
              sx={{ mt: 4, display: "flex", justifyContent: "center" }}
            ></Box>
          </Box>
          <Box
            sx={{
              lineHeight: 2,
              whiteSpace: "pre-line",
            }}
          >
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="Thông tin chung" {...a11yProps(0)} />
                <Tab
                  label="Nhật ký các giai đoạn trồng cây"
                  {...a11yProps(1)}
                />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <Typography variant="h4" sx={{ mb: 1 }}>
                {name}
              </Typography>
              <Grid>
                <Typography
                  variant="body"
                  sx={{
                    fontSize: { xs: "12px", md: "15px" },
                    fontStyle: "italic",
                  }}
                >
                  Tạo bởi: <b>{userName}</b> - Vai trò: <b>{userType}</b>
                </Typography>
              </Grid>
              <Grid>
                <Typography
                  variant="body"
                  sx={{
                    fontSize: { xs: "12px", md: "15px" },
                    fontStyle: "italic",
                  }}
                >
                  Email: <b>{userEmail}</b>
                </Typography>
              </Grid>
              <Grid>
                <Typography
                  variant="body"
                  sx={{
                    fontSize: { xs: "12px", md: "15px" },
                    fontStyle: "italic",
                  }}
                >
                  Ngày tạo: <b>{time}</b>
                </Typography>
              </Grid>

              <Divider />
              <Typography
                variant="body"
                sx={{ lineHeight: 2, whiteSpace: "pre-line", maxWidth: 700 }}
              >
                {" "}
                <Typography variant="h5" sx={{ mt: 2 }}>
                  Mô tả
                </Typography>
                <ReactReadMoreReadLess
                  readMoreClassName="readMoreClassName"
                  readLessClassName="readMoreClassName"
                  charLimit={600}
                  readMoreText="Xem thêm"
                  readLessText="Thu gọn"
                >
                  {description}
                </ReactReadMoreReadLess>
              </Typography>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Box>
                <Fragment>
                  <h2>Thông tin các giai đoạn trồng cây</h2>
                  <Typography
                    variant="body2"
                    marginBottom={3}
                    fontStyle={"italic"}
                  >
                    Được viết bởi {userName}
                  </Typography>
                  <div className="timeline">
                    <p>
                      <h3>{stagePlantSeeds.name}</h3>
                      Mô tả: {stagePlantSeeds.description}
                    </p>
                    <p>
                      <h3>{stagePlantCare.name}</h3>
                      Mô tả: {stagePlantCare.description}
                      <br />
                      Thời gian tưới nước: {stagePlantCare.water}
                      <br />
                      Lượng phân bón: {stagePlantCare.fertilizer}
                    </p>
                    <p>
                      <h3>{stageBloom.name}</h3>
                      Mô tả: {stageBloom.description}
                    </p>
                    <p>
                      <h3>{stageCover.name}</h3>
                      Mô tả: {stageCover.description}
                    </p>
                    <p>
                      <h3>{stageHarvest.name}</h3>
                      Mô tả: {stageHarvest.description}
                      <br />
                      Sản lượng: {stageHarvest.quantity}
                    </p>
                  </div>
                </Fragment>
              </Box>
            </TabPanel>
          </Box>
        </ProductDetailInfoWrapper>
      </ProductDetailWrapper>
    </Container>
  );
}

export default ProcessDetail;
