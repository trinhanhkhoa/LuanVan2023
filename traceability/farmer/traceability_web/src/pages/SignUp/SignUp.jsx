import React from 'react';
import './SignUp.css';
import { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';

export default function SignUp() {

  const [isShown, setIsShown] = useState(false);
  const togglePassword = () => {
    setIsShown((isShown) => !isShown);
  };

  return (
    <div className='sign-up'>
    <div className='header-container'>
      <h1>Sign Up</h1>
      <div className='sub-title'>
        <h3>Hi!</h3>
        <h4>Create a new account.</h4>
      </div> 
    </div>
    <div className='sign-up-content'>
      <form action="form" onSubmit={(e) => e.preventDefault()}>
        <div className='input-container'>
          <label>Fullname</label>
          <input type="text" placeholder='Username' required/>
        </div>
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
            Show password</label>
          </div>
        </div>
        <div className='checkbox-container'>
          <div className='checkbox-remember'>
            <input type="checkbox" value="remember"/> Agree with <a href="#Agreement">Terms and Conditions</a>  
          </div>
        </div>
        <Link to='/home'>
          <button className='btn-sign-up' type='button'>SIGN UP</button>
        </Link>
        {/* <Outlet/> */}
        <div >
          <Link className='already-have' to='/'>
            <p>Already have an account</p>
          </Link>
        </div>
      </form>
    </div>
  </div>
  )
}