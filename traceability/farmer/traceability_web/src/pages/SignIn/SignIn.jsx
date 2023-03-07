import React,{ useState } from 'react';
import { Link } from 'react-router-dom';
import './SignIn.css';
import PropTypes from 'prop-types';

// async function loginUser(credentials) {
//   return fetch('http://localhost:8080/signin', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(credentials)
//   })
//     .then(data => data.json())
//  }

export default function SignIn({ setToken }) {
 
  const [isShown, setIsShown] = useState(false);
  const togglePassword = () => {
    setIsShown((isShown) => !isShown);
  };

  // const [username, setUserName] = useState();
  // const [password, setPassword] = useState();

  // const handleSubmit = async e => {
  //   e.preventDefault();
  //   const token = await loginUser({
  //     username,
  //     password
  //   });
  //   setToken(token);
  // }

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
      {/* <form action="form" onSubmit={handleSubmit}> */}
      <form action="form">
        <div className='input-container'>
          <label>Username</label>
          {/* <input type="text" placeholder='Username' required onChange={e => setUserName(e.target.value)}/> */}
          <input type="text" placeholder='Username' required/>
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
                onClick={togglePassword}
                // onChange={e => setPassword(e.target.value)}
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
        
        
        <Link to='/'>
          <button className='btn-sign-in' type='submit'>SIGN IN</button>
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

// SignIn.propTypes = { setToken: PropTypes.func.isRequired }

