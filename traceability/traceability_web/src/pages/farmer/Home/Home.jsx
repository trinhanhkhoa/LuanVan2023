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
  const records = Data.slice(firstIndex, lastIndex);
  const npage = Math.ceil(Data.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  useEffect(() => {
    fetch("http://localhost:5000/list", {
      method:"GET",
    })
      .then((res) => res.json() )
      .then((data) => {
        console.log(data.data);

        setData(data.data);
      });
  }, []);


  return (
    <>
      <div className="home">
        <div className="news_img">
          <img src={news_img}/>
        </div>
        <div className="home-content">
          <div className="btn-createQR">
            <Link to="/createQR" className="link-icon">
              <TbIcons.TbQrcode className="qr-icon-home"/>          
              Create QR
            </Link>
          </div>
          <div className="btn-process">
            <Link to="/process" className="link-icon">
              <MdIcons.MdChangeCircle className="process-icon"/>
              Choose process
            </Link>
          </div>
        </div>
        <div className="list-item-home">
          <table>
            <tr>
              <th>Product's ID</th>
              <th>Product's name</th>
              <th>Status</th>
              <th>Number of updates</th>
              <th></th>
            </tr>
            {records.map((val, key) => {
              return (
                <tr key={key}>
                  <td>{val.pId}</td>
                  <td>{val.name}</td>
                  <td>{val.status == true ? <BiIcons.BiCheck className='check-icon'/> : <RiIcons.RiCloseLine className='close-icon'/>}</td>
                  <td>{val.numberOfUpdates}</td>
                  <td>
                    <Link to="/product" className="btn-watch-home">
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

  function prePage() {
    if(currentPage !== 1) {
      setCurrentPage(currentPage - 1)
    }
  }
  
  function changePage(id) {
    setCurrentPage(id)
  }

  function nextPage() {
    if(currentPage !== npage) {
      setCurrentPage(currentPage + 1)
    }
  }
}
