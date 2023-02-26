import React, {useState} from 'react';
import './SanPham.css';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer/Footer";
import cam from "../../asserts/cam.jpg";
import * as TbIcons from "react-icons/tb";
import Popup from '../../components/Popup/Popup';
import { Link } from 'react-router-dom';

function SanPham() {
  const [isOpen, setIsOpen] = useState(false);
 
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }

  return (
    <>
    <Navbar/>
    <div className='sanpham'>
      <div className='hinhanh-btn'>
        <img src={cam} className='hinhanh-sanpham'/>
        <div className='btn-thongtin'>
          <Link to="/capnhatsanpham">
            <input type='button' value="Cập nhật sản phẩm" className='btn-capnhat'/>
          </Link>
          <Link to="/danhsachsanpham">
            <input type='button' value="Xóa sản phẩm" className='btn-xoa'/>
          </Link>
        </div>
      </div>
      <div className='mota'>
        <div className='mota-1'>
          <TbIcons.TbQrcode className="qr-icon"/>          
          <div className='thongtin-1'>
            <p><b>Tên sản phẩm:</b> Cam</p>
            <p><b>Mã sản phảm:</b> 001</p>
            <p><b>Thời gian trồng:</b> 3 năm</p>
          </div>
        </div>
        <div className='diachi'>
          <p><b>Địa chỉ: </b> 227 Đường Nguyễn Văn Cừ, Phường 4, Quận 5, Thành phố Hồ Chí Minh</p>
        </div>
        <div className='mota-2'>
          <ul>
            <h2>Mô tả:</h2>
            <li><p>Thời gian tưới nước: 30 phút</p></li>
            <li><p>Phân bón hữu cơ: 7 kg</p></li>
            <li><p>Phân bón vô cơ: 1 g</p></li>
          </ul>
        </div>

        <div className='mota-3'>
          <div className='capnhat'>
            <p><b>Số lần cập nhật: </b> 2 lần</p>
          </div>
          <input type="button" value="Chi tiết" onClick={togglePopup}/>
          {isOpen && <Popup
            content={
              <div className='popup-chitiet'>
                <b>Thông tin cập nhật</b>
                <ul>
                  <li>Thời gian tưới nước: 20 phút</li>
                  <li>Phân bón hữu cơ: 5 kg</li>
                  <li>Phân bón vô cơ: 1 g</li>
                  <li>Thuốc trừ sâu: Sherpa 25EC, Trebon 2.5 EC</li>
                </ul>
              </div>
              }
            handleClose={togglePopup}
          />}      
        </div>
      </div>
    </div>
    <Footer/>
  </>
  
  )
}

export default SanPham