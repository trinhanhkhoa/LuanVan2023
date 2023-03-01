import React from 'react';
import hcmusLogo from "../../asserts/hcmus-logo.png";
import logo from "../../asserts/logo.png";
import './Footer.css';


function Footer() {
  return (
    <div className='footer'>
      <h3>Traceability agriculture &copy; 2023 - created by</h3>
      <div>
        <img src={hcmusLogo} className='hcmus-logo'/> <img src={logo} className='trace-logo'/>
      </div>
    </div>
  )
}

export default Footer