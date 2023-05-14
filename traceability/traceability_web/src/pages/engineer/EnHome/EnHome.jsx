import React, {useState, useEffect} from "react";
import "./EnHome.css";
import news_img from "../../../asserts/news.png";
import * as TbIcons from "react-icons/tb";
import * as MdIcons from "react-icons/md";
import { Link } from "react-router-dom";
import Data from '../../../Data.json';
import Home from "../../farmer/Home/Home";
import Web3 from 'web3';

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
    if(window.ethereum) {
      provider = window.ethereum;
    } else if (window.web3) {
      provider = window.web3.currentProvider;
    } else {
      console.log("Non-ethereum browser detected. You should install Metamask")
    }

    return provider;
  }

  const onConnect = async () => {
    try {
      const currentProvider = detectCurrentProvider();
      if(currentProvider) {
        await currentProvider.request({method: 'eth_requestAccounts'})
        const web3 = new Web3(currentProvider);
        const userAccount = await web3.eth.getAccounts();
        const account = userAccount[0];
        let ethBalance = await web3.eth.getBalance(account);
        let value = web3.utils.fromWei(ethBalance, 'ether');
        setEthBalance(value);
        setIsConnected(true);
        console.log("isConnected!!!")
        console.log(value);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const onDisconnected = () => {
    setIsConnected(false);
  }

  useEffect(() => {
    if(userType == "admin" && !isConnected) {
      setAdmin(true);
      onConnect();
    }

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
