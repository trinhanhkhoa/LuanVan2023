import React, {useState} from "react";
import "./Home.css";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer/Footer";
import news_img from "../../asserts/news.png";
import * as TbIcons from "react-icons/tb";
import * as MdIcons from "react-icons/md";
import { Link } from "react-router-dom";

export default function Home() {

  return (
    <>
      <Navbar />
      <div className="home">
        <div className="news_img">
          <img src={news_img}/>
        </div>
        <div className="home-content">
          <div className="btn-createQR">
            <Link to="/createprocess" className="link-icon">
              <TbIcons.TbQrcode className="qr-icon"/>          
              Create process
            </Link>
          </div>
          <div className="btn-process">
            <Link to="/list" className="link-icon">
              <MdIcons.MdChangeCircle className="process-icon"/>
              Choose process
            </Link>
          </div>
        </div>
      </div>
      <Footer/>
    </>
    
  );
}
