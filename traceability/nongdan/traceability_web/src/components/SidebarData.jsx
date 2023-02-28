import React from 'react'
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

export const SidebarData = [
  {
    title: 'Trang Chủ',
    path: '/trangchu',
    icon: <AiIcons.AiFillHome/>,
    cName: 'nav-text'
  },
  {
    title: 'Sản Phẩm',
    path: '/list',
    icon: <FaIcons.FaCartPlus/>,
    cName: 'nav-text'
  }
];