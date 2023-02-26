import React from 'react';
import './CapNhatSanPham.css';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer/Footer';
import * as FcIcons from 'react-icons/fc';
import * as TbIcons from 'react-icons/tb';
import { Link } from 'react-router-dom';

function CapNhatSanPham() {
  return (
    <>
      <Navbar/>
      <div className='capnhatsanpham'>
        <div className='capnhatsanpham-container'>
          <div className='tieude-capnhatsanpham'>
            <h1>Mô tả sản phẩm</h1>
            <h4>Thông tin giới thiệu sản phẩm</h4>
          </div>
          <div className='capnhatthongtin'>
            <div className='capnhatthongtin-1'>
              <TbIcons.TbQrcode className="qr-icon"/>
              <Link to="/sanpham">
                <input type="button" className='btn-xemsanpham' value="Xem sản phẩm"/>
              </Link>
            </div>
            <div className='capnhatthongtin-1'>
              <div className='tensanpham'>
                <label>Tên sản phẩm <b>(*)</b></label>
                <input type="text" placeholder='Tên sản phẩm' required/>
              </div>
              <div className='thoigiantrongsanpham'>
                <label>Thời gian trồng sản phẩm <b>(*)</b></label>
                <input type="text" placeholder='Thời gian trồng' required/>
              </div>
            </div>
            <div className='capnhatthongtin-2'>
              <div className='diachisanpham'>
                <label>Địa chỉ <b>(*)</b></label>
                <input type="text" placeholder='Địa chỉ'required/>
              </div>
              <div className='hinhanhsanpham'>
                <label>Hình ảnh sản phẩm <b>(*)</b></label>
                <Link to="#">
                  <FcIcons.FcAddImage className='themhinhanh-icon'/>
                </Link>
              </div>
            </div>
          </div>
          <div className='motasanpham'>
            <label>Mô tả sản phẩm <b>(*)</b></label>
            <textarea placeholder='Mô tả sản phẩm' required/>
          </div>
          <div className='chuthich'>
            <p><b>(*)</b>: Thông tin bắt buộc</p>
            <Link to="/danhsachsanpham">
              <input type="button" value="Xác nhận" className='btn-xacnhan'/>
            </Link>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default CapNhatSanPham