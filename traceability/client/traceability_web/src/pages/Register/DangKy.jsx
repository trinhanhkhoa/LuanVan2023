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
      <h1>Dang Ky</h1>
      <div className='sub-title'>
        <h3>Hi!</h3>
        <h4>Create a new account</h4>
      </div> 
    </div>
    <div className='dangky-content'>
      <form action="form" onSubmit={(e) => e.preventDefault()}>
        <div className='input-container'>
          <label>Ho va Ten</label>
          <input type="text" placeholder='Username' required/>
        </div>
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
            <input type="checkbox" value="remember"/> I agree to <a href="#Agreement">Terms and Conditions</a>  
          </div>
        </div>
        
        <Link to='/trangchu'>
          <button className='btn-dangky' type='button'>DANG KY</button>
        </Link>
        {/* <Outlet/> */}
        <div className='signUp'>
        </div>
      </form>
    </div>
  </div>
  )
}