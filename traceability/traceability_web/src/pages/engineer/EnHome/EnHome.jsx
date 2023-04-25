import React, {useState, useEffect} from "react";
import "./EnHome.css";
import news_img from "../../../asserts/news.png";
import * as TbIcons from "react-icons/tb";
import * as MdIcons from "react-icons/md";
import { Link } from "react-router-dom";
import Data from '../../../Data.json';
import Home from "../../farmer/Home/Home";

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

  useEffect(() => {
    if(userType == "admin")
      setAdmin(true);
    console.log(admin);
  }, []);
 
  return (
    admin
    ?
     <div className="en-home">
        <div className="news_img">
          <img src={news_img}/>
        </div>
        <div className="en-home-content">
          <div className="en-btn-createQR">
            <Link to="/encreateprocess" className="link-icon">
              <TbIcons.TbQrcode className="qr-icon-en-home"/>          
              Create process
            </Link>
          </div>
          <div className="en-btn-process">
            <Link to="/listofprocesses" className="link-icon">
              <MdIcons.MdChangeCircle className="process-icon"/>
              Watch processes
            </Link>
          </div>
        </div>
      </div>
    : <Home/>    
  );
}
