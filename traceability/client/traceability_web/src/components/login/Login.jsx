import React from 'react';
import { useState } from 'react';
import './Login.css';

export default function Login() {

  const [isShown, setIsSHown] = useState(false);
  const togglePassword = () => {
    setIsSHown((isShown) => !isShown);
  };

  return (
   <div className='container'>
    <div className='header-container'>
      <h1>SIGN IN</h1>
      <div className='sub-title'>
        <h3>Welcome!</h3>
        <h4>Sign to continue</h4>
      </div> 
    </div>
    <div className='content'>
      <form action="form" onSubmit={(e) => e.preventDefault()}>
        <div className='input-container'>
          <label>Email</label>
          <input type="email" placeholder='Email' required/>
        </div>
        <div className='input-container'>
          <label>Password</label>
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
            Show password?</label>
          </div>
        </div>
        <div className='checkbox-container'>
          <div className='checkbox-remember'>
            <input type="checkbox" value="remember"/> Remember me
          </div>
          <div className='forgot-password'>
            Forgot <a href="#">Password ?</a>
          </div>
        </div>
        
        <button type='button'>SIGN IN</button>
        <div className='signUp'>
          Don't have an account ?
          <a href="#">SIGN UP NOW</a>
        </div>
      </form>
    </div>
  </div>
  )
}