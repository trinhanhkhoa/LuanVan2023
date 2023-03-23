import React from 'react'
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";

export const EnSidebarData = [
  {
    title: 'Home',
    path: '/enhome',
    icon: <AiIcons.AiFillHome/>,
    cName: 'ennav-text'
  },
  {
    title: 'Process',
    path: '/listofprocesses',
    icon: <FaIcons.FaCartPlus/>,
    cName: 'ennav-text'
  }
];