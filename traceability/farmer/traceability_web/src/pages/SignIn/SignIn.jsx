import React,{ useState } from 'react';
import { Link } from 'react-router-dom';
import './SignIn.css';

export default function SignIn({ setToken }) {
 
  const [isShown, setIsShown] = useState(false);
  const togglePassword = () => {
    setIsShown((isShown) => !isShown);
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    console.log(email, password);
    fetch("http://localhost:5000/signin", {
      method:"POST",
      crossDomain:true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin":"*"
      },
      body: JSON.stringify({
        email,
        password
      })
    })
      .then((res) => res.json() )
      .then((data) => {
        console.log(data, "userRegister");
        if(data.status == "Ok") {
          alert("Login successful");
          window.localStorage.setItem("token", data.data);
          window.localStorage.setItem("signedIn", true);
          window.location.href = "/";
        }
      });
  }

  return (
   <div className='signin'>
    <div className='signin-container'>
    <div className='header-container'>
          <h1>SIGN IN</h1>
          <div className='sub-title'>
            <h3>Welcome!</h3>
            <h4>Sign in to continue...</h4>
          </div> 
        </div>
      <div className='sign-in-content'>
        <form action="form" onSubmit={handleSubmit}>
          <div className='input-container'>
            <label>Email</label>
            <input type="text" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required/>
          </div>
          <div className='input-container'>
            <label>Password</label>
            <input       
              type={isShown ? "text" : "password"}
              placeholder='Password' required
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="show-password">
              <label>
                <input
                  id="checkbox"
                  type="checkbox"
                  checked={isShown}
                  onClick={togglePassword}    
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
          
          <button className='btn-sign-in' type='button' onClick={handleSubmit}>SIGN IN</button>

          <div className='dont-have-account'>
            You don't have an account ?
            <Link to='/signup'>Sign up now</Link>
          </div>
        </form>
      </div>
    </div>
  </div>
  )
}

// SignIn.propTypes = { setToken: PropTypes.func.isRequired }

