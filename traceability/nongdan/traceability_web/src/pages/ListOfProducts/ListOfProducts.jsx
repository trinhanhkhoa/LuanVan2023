import React, { useState } from 'react';
import './ListOfProducts.css';
import Navbar from "../../components/Navbar";
import * as MdIcons from "react-icons/md";
import * as RiIcons from "react-icons/ri";
import * as BiIcons from "react-icons/bi";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Data from "../../Data.json";

// const data = [
//   {id: 1, ten: "Táo", ma: "001", trangthai: <MdIcons.MdCheck className="check-icon"/>, solan: 1},
//   {id: 2, ten: "Chuối", ma: "002", trangthai: <MdIcons.MdClose className="close-icon"/>, solan: 2},
//   {id: 3, ten: "Xoài", ma: "003", trangthai: <MdIcons.MdCheck className="check-icon"/>, solan: 0},
//   {id: 4, ten: "Ổi", ma: "004", trangthai: <MdIcons.MdCheck className="check-icon"/>, solan: 0},
//   {id: 5, ten: "Cam", ma: "005", trangthai: <MdIcons.MdCheck className="check-icon"/>, solan: 0},
// ]

function ListOfProducts() {
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 2;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = Data.slice(firstIndex, lastIndex);
  const npage = Math.ceil(Data.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  return (
    <>
      <Navbar />
      <div className='danhsachsanpham'>
        <div className='danhsachsanpham-tieude'>
          <h2>Danh sách sản phẩm</h2>
          <Link to="/list" className="btn-themsanpham">
            Thêm sản phẩm
          </Link>
        </div>
        <div className="bangdanhsachsanpham">
          <table>
            <tr>
              <th>ID</th>
              <th>Tên sản phẩm</th>
              <th>Mã sản phẩm</th>
              <th>Trạng thái</th>
              <th>Số lần cập nhật</th>
              <th></th>
            </tr>
            {records.map((val, key) => {
              return (
                <tr key={key}>
                  <td>{val.id}</td>
                  <td>{val.ten}</td>
                  <td>{val.ma}</td>
                  <td>{val.trangthai}</td>
                  <td>{val.solan}</td>
                  <td>
                    <Link to="/capnhatsanpham" className="btn-chinhsua">
                      <RiIcons.RiEditBoxLine/>
                    </Link>
                    <Link to="/list" className="btn-xoabo">
                      <BiIcons.BiTrash/>
                    </Link>
                  </td>
                </tr>
              )
            })}
          </table>
          <nav>
            <ul className='pagination'>
              <li className='page-item'>
                <a href="#" className='page-link' onClick={prePage}>
                  Prev
                </a>
              </li>
              {
                numbers.map((n, i) => (
                  <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                    <a href="#" className='page-item' onClick={() => changePage(n)}>
                      {n}
                    </a>
                  </li>
                ))
              }
              <li className='page-item'>
                <a href="#" className='page-link' onClick={nextPage}>
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      
      <Footer/>
    </>
  )

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

export default ListOfProducts