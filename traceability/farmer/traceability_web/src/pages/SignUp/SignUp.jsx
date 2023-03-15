import React, { useState } from 'react';
import './SignUp.css';
import { Outlet, Link } from 'react-router-dom';

export default function SignUp() {

  const [isShown, setIsShown] = useState(false);
  const togglePassword = () => {
    setIsShown((isShown) => !isShown);
  };
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const collectData = () => {
    console.log(name, email, password);
    fetch("http://localhost:5000/signup", {
      method:"POST",
      crossDomain:true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin":"*"
      },
      body: JSON.stringify({
        name,
        email,
        password
      })
    })
      .then((res) => res.json() )
      .then((data) => {
        console.log(data, "userRegister");
      });
  }
  

  return (
    <div className='signup'>
      <div className='signup-container'>
            <div className='header-container'>
              <h1>Register</h1>
              <div className='sub-title'>
                <h3>Hi!</h3>
                <h4>Create a new account.</h4>
              </div> 
            </div>
            <div className='sign-up-content'>
              <form action="form" onSubmit={(e) => e.collectData()}>
                <div className='input-container'>
                  <label>Fullname</label>
                  <input type="text" placeholder='Username' value={name} onChange={(e) => setName(e.target.value)} required/>
                </div>
                <div className='input-container'>
                  <label>Email</label>
                  <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}  required/>
                </div>
                <div className='input-container'>
                  <label>Password</label>
                  <input       
                    type={isShown ? "text" : "password"}
                    placeholder='Password' required
                    value={password} onChange={(e) => setPassword(e.target.value)} 
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
                <button className='btn-sign-up' type='button' onClick={collectData}>SIGN UP</button>
                <div>
                  <Link className='already-have' to='/'>
                    <p>Already have an account</p>
                  </Link>
                </div>
              </form>
            </div>
        </div>
    </div>
  )
}