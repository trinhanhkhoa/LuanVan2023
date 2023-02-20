import React from "react";
import "./TrangChu.css";
import Navbar from "../../components/Navbar";
import tintuc from "../../asserts/tintuc.png";
import * as TbIcons from "react-icons/tb";
import * as MdIcons from "react-icons/md";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";

const data = [
  {id: 1, ten: "Táo", ma: "001", trangthai: <MdIcons.MdCheck className="check-icon"/>, solan: 1},
  {id: 2, ten: "Chuối", ma: "002", trangthai: <MdIcons.MdClose className="close-icon"/>, solan: 2},
  {id: 3, ten: "Xoài", ma: "003", trangthai: <MdIcons.MdCheck className="check-icon"/>, solan: 0},

]

export default function TrangChu() {
  return (
    <>
      <Navbar />
      <div className="trangchu">
        <div className="tintuc">
          <img src={tintuc}/>
        </div>
        <div className="trangchu-content">
          <div className="btn-taoma">
            <Link to="#" className="link-icon">
              <TbIcons.TbQrcode className="qr-icon"/>          
              Tạo mã QR
            </Link>
          </div>
          <div className="btn-quytrinh">
            <Link to="#" className="link-icon">
              <MdIcons.MdChangeCircle className="process-icon"/>
              Chọn quy trình
            </Link>
          </div>
        </div>
        <div className="danhsach">
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
                    <Link to="#" className="btn-xem">
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
    
  );
}
