import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import EnNavBar from "./EnNavbar";
import Footer from "./Footer/Footer";

export default function WithNav() {
  const userType = window.localStorage.getItem("userType");

  return (
    <div>
      {userType == "Admin" ? <EnNavBar/> : <Navbar/>}
      <Outlet />      
      <Footer/>
    </div>
  );
}
  