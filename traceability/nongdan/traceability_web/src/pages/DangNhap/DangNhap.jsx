import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './DangNhap.css';

export default function DangNhap() {

  const [isShown, setIsShown] = useState(false);
  const togglePassword = () => {
    setIsShown((isShown) => !isShown);
  };

  return (
   <div className='dangnhap'>
    <div className='header-container'>
      <h1>Đăng Nhập</h1>
      <div className='sub-title'>
        <h3>Chào mừng!</h3>
        <h4>Đăng nhập để tiếp tục</h4>
      </div> 
    </div>
    <div className='dangnhap-content'>
      <form action="form" onSubmit={(e) => e.preventDefault()}>
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
            <input type="checkbox" value="remember"/> Ghi nhớ
          </div>
          <div className='forgot-password'>
            Quên <a href="#">mật khẩu ?</a>
          </div>
        </div>
        
        
        <Link to='/trangchu'>
          <button className='btn-dangnhap' type='button'>ĐĂNG NHẬP</button>
        </Link>

        <div className='signUp'>
          Bạn không có tài khoản ?
          <Link to='/dangky'>Đăng ký ngay</Link>
        </div>
      </form>
    </div>
  </div>
  )
}