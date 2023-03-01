import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './SignIn.css';

export default function SignIn() {

  const [isShown, setIsShown] = useState(false);
  const togglePassword = () => {
    setIsShown((isShown) => !isShown);
  };

  return (
   <div className='sign-in'>
    <div className='header-container'>
      <h1>SIGN IN</h1>
      <div className='sub-title'>
        <h3>Welcome!</h3>
        <h4>Sign in to continue...</h4>
      </div> 
    </div>
    <div className='sign-in-content'>
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
            Show password</label>
          </div>
        </div>
        <div className='checkbox-container'>
          <div className='checkbox-remember'>
            <input type="checkbox" value="remember"/> Remember
          </div>
          <div className='forgot-password'>
            <a href="#">Forgot password ?</a>
          </div>
        </div>
        
        
        <Link to='/home'>
          <button className='btn-sign-in' type='button'>SIGN IN</button>
        </Link>

        <div className='dont-have-account'>
          You don't have an account ?
          <Link to='/signup'>Sign up now</Link>
        </div>
      </form>
    </div>
  </div>
  )
}