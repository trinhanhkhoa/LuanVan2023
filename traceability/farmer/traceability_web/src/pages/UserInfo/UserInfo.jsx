import React, { useState, useEffect } from 'react';
import "./UserInfo.css";

export default function UserInfo () {
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");


  useEffect(() => {
    console.log(token);
    fetch("http://localhost:5000/userinfo", {
      method:"POST",
      crossDomain:true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin":"*"
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token")
      })
    })
      .then((res) => res.json() )
      .then((data) => {
        console.log(data.data.name, "userRegister");
        setName(data.data.name);
        setEmail(data.data.email);
        if(data.data.name == "Token expired" && data.data.email == "Token expired")
        {
          alert("Token expired, please login again");
          window.localStorage.clear();
          window.location.href = "/";
        }
        console.log(name, email);
      });
  });
  return (
    <div className='userinfo'>
      <div className='userinfo-container'>
        <div className='userinfo-name'>
          <h2>Name</h2> <h1>{ name }</h1>
        </div>
        <div className='userinfo-email'>
          <h2>Email</h2> <h1>{ email }</h1>
        </div>
      </div>
    </div>
  )
}
