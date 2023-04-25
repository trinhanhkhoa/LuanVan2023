import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./index.css";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { EnSidebarData } from "./EnSidebarData";
import { IconContext } from "react-icons/lib";
import logo from "../asserts/logo.png";

function EnNavbar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  const [dropdown, setDropdown] = useState(false);

  const showDropdown = () => setDropdown(!dropdown);

  const profile = () => {
    window.location.href = "/userinfo";
  }

  const logout = () => {
    window.localStorage.clear();
    window.location.href = "/";
  }
  return (
    <>
      <IconContext.Provider value={{color: '#fff'}}>
        <div className="ennavbar">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
          <div className="dropdown">
            <button className="dropdown-btn">
              <FaIcons.FaRegUserCircle/>
            </button>
            <div className="dropdown-content">
              <input type="button" className="btn-logout" value={"Profile"} onClick={profile}/>
              <input type="button" className="btn-logout" value={"Logout"} onClick={logout}/>
            </div>
          </div>
        </div>

        <nav className={sidebar ? "ennav-menu active" : "ennav-menu"}>
          <ul className="nav-menu-items"  onClick={showSidebar}>
            <li className="ennavbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose className="btn-close"/>
              </Link>
            </li>
            {EnSidebarData.map((item, index) => {
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

export default EnNavbar;
