import React, { useState, useEffect } from "react";
import "./EnHome.css";
import news_img from "../../../asserts/news.png";
import * as TbIcons from "react-icons/tb";
import * as MdIcons from "react-icons/md";
import { Link } from "react-router-dom";
import Data from "../../../Data.json";
import Home from "../../farmer/Home/Home";
import Web3 from "web3";
import BarChart from "../../../components/BarChart";
import LineChart from "../../../components/LineChart";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import { Box, Button, CardContent, Typography } from "@mui/material";

export default function EnHome() {
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = Data.slice(firstIndex, lastIndex);
  const npage = Math.ceil(Data.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  const [admin, setAdmin] = useState(false);
  const userType = window.localStorage.getItem("userType");

  const [isConnected, setIsConnected] = useState(false);
  const [ethBalance, setEthBalance] = useState("");

  const detectCurrentProvider = () => {
    let provider;
    if (window.ethereum) {
      provider = window.ethereum;
    } else if (window.web3) {
      provider = window.web3.currentProvider;
    } else {
      console.log("Non-ethereum browser detected. You should install Metamask");
    }

    return provider;
  };

  const onConnect = async () => {
    try {
      const currentProvider = detectCurrentProvider();
      if (currentProvider) {
        await currentProvider.request({ method: "eth_requestAccounts" });
        const web3 = new Web3(currentProvider);
        const userAccount = await web3.eth.getAccounts();
        const account = userAccount[0];
        let ethBalance = await web3.eth.getBalance(account);
        let value = web3.utils.fromWei(ethBalance, "ether");
        setEthBalance(value);
        setIsConnected(true);
        console.log("isConnected!!!");
        console.log(value);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onDisconnected = () => {
    setIsConnected(false);
  };

  useEffect(() => {
    if (userType == "admin" && !isConnected) {
      setAdmin(true);
      onConnect();
    }

    console.log(admin);
  }, []);

  return admin ? (
    <div className="en-home">
       <Carousel class="carousel-enhome" showThumbs={false}>
        <div className="news_img">
          <img src={news_img} />
        </div>
        <div className="news_img">
          <img src={news_img} />
        </div>
      </Carousel>
      <div className="en-home-content">
        <Button
          sx={{
            borderRadius: "20px",
            margin: "3rem",
            border: "1px solid #000",
            boxShadow:
              "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
            minWidth: "52rem",
            minHeight: "20rem",
            color: "black",
            borderRadius: "20px",
            backgroundColor: "transparent",
            ":hover": {
              backgroundColor: "#FFB100",
              color: "#fff",
            },
          }}
          onClick={() => {
            window.location.href = "/encreateprocess";
          }}
        >
          <CardContent>
            <TbIcons.TbQrcode className="qr-icon-home" />
            <Typography>Create product</Typography>
          </CardContent>
        </Button>
        <Button
          variant="contained"
          sx={{
            borderRadius: "20px",
            margin: "3rem",
            border: "1px solid #000",
            boxShadow:
              "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
            minWidth: "52rem",
            minHeight: "20rem",
            color: "black",
            borderRadius: "20px",
            backgroundColor: "transparent",
            ":hover": {
              backgroundColor: "#FFB100",
              color: "#fff",
            },
          }}
          onClick={() => {
            window.location.href = "/listofprocesses";
          }}
        >
          <CardContent>
            <MdIcons.MdChangeCircle className="process-icon" />
            <Typography>Watch process</Typography>
          </CardContent>
        </Button>
      </div>
      <Box sx={{display:'flex', margin: '10px'}} height="50vh">
        <BarChart />
        <LineChart />
      </Box>
    </div>
  ) : (
    <Home />
  );
}
