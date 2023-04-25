import React,{ useState } from 'react';
import { Link } from 'react-router-dom';
import './SignIn.css';

export default function SignIn() {
 
  const [isShown, setIsShown] = useState(false);
  const togglePassword = () => {
    setIsShown((isShown) => !isShown);
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [secretKey, setSecretKey] = useState("");

  const handleSubmit = () => {
    if(userType == "admin" && secretKey != "12345") {
      alert("Invalid Admin")
    } else {
    console.log(email, password);
    fetch("http://localhost:5000/signin", {
      method:"POST",
      crossDomain:true,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin":"*"
      },
      body: JSON.stringify({
        email,
        password,
        userType
      })
    })
      .then((res) => res.json() )
      .then((data) => {
        console.log(data._id, "userRegister");
        if(userType == "admin") {
          alert("Login admin successful");
          console.log("user json: ", data);
          window.localStorage.setItem("user", JSON.stringify(data));
          window.localStorage.setItem("userId", data._id);
          window.localStorage.setItem("token", data.token);
          window.localStorage.setItem("signedIn", true);
          window.localStorage.setItem("userType", userType);
          window.location.href = "/enhome";
        } else {
          alert("Login user successful");
          window.localStorage.setItem("user", JSON.stringify(data));
          window.localStorage.setItem("userId", data._id);
          window.localStorage.setItem("token", data.token);
          window.localStorage.setItem("signedIn", true);
          window.localStorage.setItem("userType", userType);
          window.location.href = "/home";
        }
      });
    }
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
          <div className='sign-up-content'>
            <div className='radio-container'>
              <input 
                type="radio" 
                name='UserType'
                value="user"
                onChange={(e) => setUserType(e.target.value)}
              />
              User
              <input 
                type="radio" 
                name='UserType'
                value="admin"
                onChange={(e) => setUserType(e.target.value)}
              />
              Admin
            </div>
            { 
              userType == "admin" ? 
              <div className='input-container'>
                <label>Secret key</label>
                <input type="text" placeholder='Key' onChange={(e) => setSecretKey(e.target.value)} required/>
              </div> 
              : null 
            }
          </div>
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

