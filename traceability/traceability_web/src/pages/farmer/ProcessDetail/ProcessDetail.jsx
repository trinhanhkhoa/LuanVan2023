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
      id = data.userId;
      // console.log(id);
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
    };
    getInfoProcess();
  }, []);

  useEffect(() => {
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
          // console.log(user);

          user = user.filter((u) => u._id == id);
          console.log(user[0]);
          setUserName(user[0].name);
          setUserType(user[0].userType);
          setUserEmail(user[0].email);

        });
    };
    getUserInfo();
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
        // backgroundColor: "azure"
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
                  // thumbnails={true}
                  // thumbnailWidth="100px"
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
              // width: { xs: 400, md: 800 },
            }}
          >
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="Product information" {...a11yProps(0)} />
                <Tab label="Production log" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <Typography variant="h4" sx={{ mb: 1 }}>
                {name}
              </Typography>
              <Grid>
                <Typography
                  variant="body"
                  sx={{ fontSize: { xs: "12px", md: "15px" } }}
                >
                  Created by: {userName} - Role: {userType}
                </Typography>
              </Grid>
              <Grid>
                <Typography
                  variant="body"
                  sx={{ fontSize: { xs: "12px", md: "15px" } }}
                >
                  Email: {userEmail}
                </Typography>
              </Grid>
              <Grid>
                <Typography
                  variant="body"
                  sx={{ fontSize: { xs: "12px", md: "15px" } }}
                >
                  Created Time: {time}
                </Typography>
              </Grid>

              <Divider />
              <Typography
                variant="body"
                sx={{ lineHeight: 2, whiteSpace: "pre-line", maxWidth: 700 }}
              >
                {" "}
                <Typography variant="h5" sx={{ mt: 2 }}>
                  Description
                </Typography>
                <ReactReadMoreReadLess
                  readMoreClassName="readMoreClassName"
                  readLessClassName="readMoreClassName"
                  charLimit={600}
                  readMoreText="Read more"
                  readLessText="Read less"
                >
                  {description}
                  {/* dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                  minim veniam, quis nostrud exercitation ullamco laboris nisi
                  ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                  reprehenderit in voluptate velit esse cillum dolore eu fugiat
                  nulla pariatur. Excepteur sint occaecat cupidatat non
                  proident, sunt in culpa qui officia deserunt mollit anim id
                  est laborum. dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum. dolor sit amet, consectetur */}
                </ReactReadMoreReadLess>
              </Typography>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Box>
                <Fragment>
                  <h2>Product traceability</h2>
                  <Typography variant="body2" marginBottom={3}>
                    Information is written by "{userName}"
                  </Typography>
                  <div className="timeline">
                    <p>
                      <h4>{stagePlantSeeds.name}</h4>
                      Description: {stagePlantSeeds.description}
                    </p>
                    <p>
                      <h4>{stagePlantCare.name}</h4>
                      Description: {stagePlantCare.description}
                      <ul>
                        <li>Watering time: {stagePlantCare.water}</li>
                        <li>
                          Amount of fertilizer: {stagePlantCare.fertilizer}
                        </li>
                      </ul>
                    </p>
                    <p>
                      <h4>{stageBloom.name}</h4>
                      Description: {stageBloom.description}
                    </p>
                    <p>
                      <h4>{stageCover.name}</h4>
                      Description: {stageCover.description}
                    </p>
                    <p>
                      <h4>{stageHarvest.name}</h4>
                      Description: {stageHarvest.description}
                      Notes:{" "}
                      <ul>
                        <li>Quantity: {stageHarvest.quantity}</li>
                      </ul>
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
