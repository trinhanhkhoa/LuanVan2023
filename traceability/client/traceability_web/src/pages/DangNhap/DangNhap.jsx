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
      <h1>Dang nhap</h1>
      <div className='sub-title'>
        <h3>Welcome!</h3>
        <h4>Sign to continue</h4>
      </div> 
    </div>
    <div className='dangnhap-content'>
      <form action="form" onSubmit={(e) => e.preventDefault()}>
        <div className='input-container'>
          <label>Email</label>
          <input type="email" placeholder='Email' required/>
        </div>
        <div className='input-container'>
          <label>Mat khau</label>
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
            Hien?</label>
          </div>
        </div>
        <div className='checkbox-container'>
          <div className='checkbox-remember'>
            <input type="checkbox" value="remember"/> Ghi nho
          </div>
          <div className='forgot-password'>
            Quen <a href="#">mat khau ?</a>
          </div>
        </div>
        
        
        <Link to='/trangchu'>
          <button className='btn-dangnhap' type='button'>DANG NHAP</button>
        </Link>

        <div className='signUp'>
          Khong co tai khoan ?
          <Link to='/dangky'>Dang ky ngay</Link>
        </div>
      </form>
    </div>
  </div>
  )
}