import React from 'react';
import './DangKy.css';
import { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';

export default function DangKy() {

  const [isShown, setIsShown] = useState(false);
  const togglePassword = () => {
    setIsShown((isShown) => !isShown);
  };

  return (
    <div className='dangky'>
    <div className='header-container'>
      <h1>Đăng Ký</h1>
      <div className='sub-title'>
        <h3>Xin Chào!</h3>
        <h4>Tạo một tài khoản mới</h4>
      </div> 
    </div>
    <div className='dangky-content'>
      <form action="form" onSubmit={(e) => e.preventDefault()}>
        <div className='input-container'>
          <label>Họ và Tên</label>
          <input type="text" placeholder='Username' required/>
        </div>
        <div className='input-container'>
          <label>Email</label>
          <input type="email" placeholder='Email' required/>
        </div>
        <div className='input-container'>
          <label>Mật khẩu</label>
          <input       
            type={isShown ? "text" : "password"}
            placeholder='Password' required
          />
          <div className="show-password">
            <label>
              <input
                id="checkbox"
                type="checkbox"
                checked={isShown}
                onChange={togglePassword}
              />
            Hiện mật khẩu</label>
          </div>
        </div>
        <div className='checkbox-container'>
          <div className='checkbox-remember'>
            <input type="checkbox" value="remember"/> Đồng ý với <a href="#Agreement">Các điều kiện và điều khoản</a>  
          </div>
        </div>
        <Link to='/trangchu'>
          <button className='btn-dangky' type='button'>ĐĂNG KÝ</button>
        </Link>
        {/* <Outlet/> */}
        <div >
          <Link className='dacotaikhoan' to='/'>
            <p>Đã có tài khoản</p>
          </Link>
        </div>
      </form>
    </div>
  </div>
  )
}