import React, {useState} from "react";
import "./Home.css";
import news_img from "../../asserts/news.png";
import * as TbIcons from "react-icons/tb";
import * as MdIcons from "react-icons/md";
import { Link } from "react-router-dom";
import Data from '../../Data.json';

export default function Home() {

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = Data.slice(firstIndex, lastIndex);
  const npage = Math.ceil(Data.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

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
              <th>Ordinal numbers</th>
              <th>Product's name</th>
              <th>Product's ID</th>
              <th>Status</th>
              <th>Number of updates</th>
              <th></th>
            </tr>
            {records.map((val, key) => {
              return (
                <tr key={key}>
                  <td>{val.id}</td>
                  <td>{val.name}</td>
                  <td>{val.pId}</td>
                  <td>{val.status}</td>
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
