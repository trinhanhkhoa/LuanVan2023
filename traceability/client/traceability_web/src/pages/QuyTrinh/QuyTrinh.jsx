import React from 'react';
import './QuyTrinh.css';
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";

const data = [
  {id: 1, ten: "Quy trình trồng Táo", ma: "001"},
  {id: 2, ten: "Quy trình trồng Chuối", ma: "002"},
  {id: 3, ten: "Quy trình trồng Xoài", ma: "003"},
  {id: 4, ten: "Quy trình trồng Ổi", ma: "004"},
  {id: 5, ten: "Quy trình trồng Cam", ma: "005"},

]

function QuyTrinh() {
  return (
    <>
      <Navbar />
      <div className='quytrinh'>
        <div className='quytrinh-tieude'>
          <h2>Danh sách sản phẩm</h2>
          <Link to="#" className="btn-themquytrinh">
            Thêm quy trình
          </Link>
        </div>
        <div className="danhsachquytrinh">
          <table>
            <tr>
              <th>ID</th>
              <th>Tên sản phẩm</th>
              <th>Mã sản phẩm</th>
              <th></th>
            </tr>
            {data.map((val, key) => {
              return (
                <tr key={key}>
                  <td>{val.id}</td>
                  <td>{val.ten}</td>
                  <td>{val.ma}</td>
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
  )
}

export default QuyTrinh