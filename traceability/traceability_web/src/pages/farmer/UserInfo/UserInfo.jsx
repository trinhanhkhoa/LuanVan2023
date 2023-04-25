import React, { useState, useEffect } from 'react';
import Home from '../Home/Home';
import "./UserInfo.css";

export default function UserInfo () {
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [userType, setUserType] = useState("");

  const tokenData = window.localStorage.getItem("token");
  const id = window.localStorage.getItem("userId");

  const tokenIsValid = () => {
    fetch("http://localhost:5000/tokenIsValid", {
      method:"POST",
      crossDomain:true,
      headers: {
        'x-auth-token': tokenData,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin":"*"
      }
    })
      .then((res) => res.json() )
      .then((data) => {
        // console.log(token);
        // setToken(data);
        console.log("token", data)
      });
  }

  const getProfile = () => {
    fetch(`http://localhost:5000/users/${id}`, {
      method:"GET",
      headers: {
        'x-auth-token': tokenData,
      },
      })
      .then((res) => res.json() )
      .then((data) => {
        console.log(data.data.name, "userRegister");
        setName(data.data.name);
        setEmail(data.data.email)
        setUserType(data.data.userType);
  })
}
  useEffect(() => {
    tokenIsValid();
    getProfile();
  }, []);
  
  return (
    <div className='userinfo'>
      <div className='userinfo-container'>
        <div className='userinfo-name'>
          <h1>Name</h1> <h2>{ name }</h2>
        </div>
        <div className='userinfo-email'>
          <h1>Email</h1> <h2>{ email }</h2>
        </div>
        <div className='userinfo-role'>
          <h1>Role</h1> <h2>{ userType }</h2>
        </div>
      </div>
    </div>
  )
}
