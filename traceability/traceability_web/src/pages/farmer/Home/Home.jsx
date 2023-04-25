import React, {useState, useEffect} from "react";
import "./Home.css";
import news_img from "../../../asserts/news.png";
import * as TbIcons from "react-icons/tb";
import * as MdIcons from "react-icons/md";
import * as RiIcons from "react-icons/ri";
import * as BiIcons from "react-icons/bi";
import { Link } from "react-router-dom";
import Data from '../../../Data.json';

export default function Home() {
  const [data, setData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = data.slice(firstIndex, lastIndex);
  const npage = Math.ceil(data.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  const tokenData = window.localStorage.getItem("token");
  const id = window.localStorage.getItem("userId");

  const tokenIsValid = () => {
    fetch("http://localhost:5000/tokenIsValid", {
      method:"POST",
      crossDomain:true,
      headers: {
        'x-auth-token': tokenData,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin":"*"
      }
    })
      .then((res) => res.json() )
      .then((data) => {
        console.log("token", data)
      });
  }

  const getProducts = () => {
    fetch("http://localhost:5000/product/get-product", {
      method:"GET",
      headers: {
        'x-auth-token': tokenData,
      },
    })  
      .then((res) => res.json() )
      .then((data) => {
        console.log(data.data, "list products");
        setData(data.data);
      });
  }

  useEffect(() => {
    tokenIsValid();
    getProducts();
  }, []);

  return (
    <>
      <div className="home">
        <div className="news_img">
          <img src={news_img}/>
        </div>
        <div className="home-content">
          <div className="btn-createQR">
            <Link to="/createqr" className="link-icon">
              <TbIcons.TbQrcode className="qr-icon-home"/>          
              Create product
            </Link>
          </div>
          <div className="btn-process">
            <Link to="/process" className="link-icon">
              <MdIcons.MdChangeCircle className="process-icon"/>
              Watch process
            </Link>
          </div>
        </div>
        <div className="list-item-home">
          <table>
            <tr>
              <th>No.</th>
              <th>Product's name</th>
              <th>Status</th>
              <th>Number of updates</th>
              <th></th>
            </tr>
            {records.map((item, index) => {
              return (
                <tr key={index+1}>
                  <td>{index+1}</td>
                  <td>{item.name}</td>
                  <td>{item.status == true ? <BiIcons.BiCheck className='check-icon'/> : <RiIcons.RiCloseLine className='close-icon'/>}</td>
                  <td>{item.numberOfUpdates}</td>
                  <td>
                    <Link to={`/product/${item._id}`} className="btn-watch-home">
                      Watch
                    </Link>
                  </td>
                </tr>
              )
            })}
          </table>
        </div>
      </div>
    </>
    
  );
}
