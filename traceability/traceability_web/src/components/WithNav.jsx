import React from "react";
import Navbar from "./Try/Navbar";
import StickyFooter from "./Try/Footer";

export default function WithNav() {
  const userType = window.localStorage.getItem("userType");

  return (
    <div>
      <Navbar/>
      <StickyFooter/>
    </div>
  );
}
  