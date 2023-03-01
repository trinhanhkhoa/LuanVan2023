import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./index.css";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { SidebarData } from "./SidebarData";
import { IconContext } from "react-icons/lib";
import logo from "../asserts/logo.png";
import { UserData } from "./UserData";

function Navbar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  const [dropdown, setDropdown] = useState(false);

  const showDropdown = () => setDropdown(!dropdown);

  return (
    <>
      <IconContext.Provider value={{color: '#fff'}}>
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
          <Link to="#" className="user">
            <FaIcons.FaRegUserCircle onClick={showDropdown}/>
          </Link>
        </div>

        <nav className={dropdown ? "logo-menu active" : "logo-menu"}>
          <ul className="dropdown" onClick={showDropdown}>
            {UserData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items"  onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose className="btn-close"/>
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
            <img className="logo" src={logo}/>
          </ul>
        </nav>
        
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
