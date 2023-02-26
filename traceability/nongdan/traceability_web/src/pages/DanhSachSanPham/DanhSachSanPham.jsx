import React from 'react';
import './DanhSachSanPham.css';
import Navbar from "../../components/Navbar";
import * as MdIcons from "react-icons/md";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";

const data = [
  {id: 1, ten: "Táo", ma: "001", trangthai: <MdIcons.MdCheck className="check-icon"/>, solan: 1},
  {id: 2, ten: "Chuối", ma: "002", trangthai: <MdIcons.MdClose className="close-icon"/>, solan: 2},
  {id: 3, ten: "Xoài", ma: "003", trangthai: <MdIcons.MdCheck className="check-icon"/>, solan: 0},
  {id: 4, ten: "Ổi", ma: "004", trangthai: <MdIcons.MdCheck className="check-icon"/>, solan: 0},
  {id: 5, ten: "Cam", ma: "005", trangthai: <MdIcons.MdCheck className="check-icon"/>, solan: 0},

]

function DanhSachSanPham() {
  return (
    <>
      <Navbar />
      <div className='danhsachsanpham'>
        <div className='danhsachsanpham-tieude'>
          <h2>Danh sách sản phẩm</h2>
          <Link to="/taoqr" className="btn-themsanpham">
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
            {data.map((val, key) => {
              return (
                <tr key={key}>
                  <td>{val.id}</td>
                  <td>{val.ten}</td>
                  <td>{val.ma}</td>
                  <td>{val.trangthai}</td>
                  <td>{val.solan}</td>
                  <td>
                    <Link to="/capnhatsanpham" className="btn-xem">
                      Xem
                    </Link>
                  </td>
                </tr>
              )
            })}
          </table>
          
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default DanhSachSanPham