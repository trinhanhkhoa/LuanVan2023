import React from 'react';
import './TaoQR.css';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer/Footer';
import * as FcIcons from 'react-icons/fc';
import { Link } from 'react-router-dom';

function TaoQR() {
  return (
    <>
      <Navbar/>
      <div className='taoqr'>
        <div className='taoqr-container'>
          <div className='tieude-taoqr'>
            <h1>Mô tả sản phẩm</h1>
            <h4>Thông tin giới thiệu sản phẩm</h4>
          </div>
          <div className='dienthongtin'>
            <div className='dienthongtin-1'>
              <div className='tensanpham'>
                <label>Tên sản phẩm <b>(*)</b></label>
                <input type="text" placeholder='Tên sản phẩm' required/>
              </div>
              <div className='thoigiantrongsanpham'>
                <label>Thời gian trồng sản phẩm <b>(*)</b></label>
                <input type="text" placeholder='Thời gian trồng' required/>
              </div>
            </div>
            <div className='dienthongtin-2'>
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
            <input type="button" value="Xác nhận" className='btn-xacnhan'/>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default TaoQR