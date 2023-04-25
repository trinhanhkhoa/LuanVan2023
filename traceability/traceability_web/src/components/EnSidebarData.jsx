import React from 'react'
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as MdIcons from "react-icons/md";


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
  },
  {
    title: 'Manage Accounts',
    path: '/enmanageaccounts',
    icon: <MdIcons.MdManageAccounts />,
    cName: 'ennav-text'
  }
];