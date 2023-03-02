import React, { useState } from 'react';
import './List.css';
import Navbar from "../../components/Navbar";
import * as MdIcons from "react-icons/md";
import * as RiIcons from "react-icons/ri";
import * as BiIcons from "react-icons/bi";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import DataProcess from "../../DataProcess.json";

function List() {

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 3;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = DataProcess.slice(firstIndex, lastIndex);
  const npage = Math.ceil(DataProcess.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  return (
    <>
      <Navbar />
      <div className='list'>
        <div className='list-title'>
          <h2>List of processes</h2>
          <Link to="/createprocess" className="btn-add-process">
            Add process
          </Link>
        </div>
        <div className="process-list">
          <table>
            <tr>
              <th>Ordinal numbers</th>
              <th>Process's name</th>
              <th>Process's ID</th>
              <th></th>
            </tr>
            {records.map((val, key) => {
              return (
                <tr key={key}>
                  <td>{val.id}</td>
                  <td>{val.name}</td>
                  <td>{val.pID}</td>
                  <td>
                    <Link to="/process" className="btn-watch">
                      <BiIcons.BiSearch/>
                    </Link>
                    <Link to="/createprocess" className="btn-edit">
                      <RiIcons.RiEditBoxLine/>
                    </Link>
                    <Link to="/list" className="btn-remove">
                      <BiIcons.BiTrash/>
                    </Link>
                  </td>
                </tr>
              )
            })}
          </table>
          <nav>
            <ul className='pagination'>
              <li className='page-item'>
                <a href="#" className='page-link' onClick={prePage}>
                  Prev
                </a>
              </li>
              {
                numbers.map((n, i) => (
                  <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                    <a href="#" className='page-item' onClick={() => changePage(n)}>
                      {n}
                    </a>
                  </li>
                ))
              }
              <li className='page-item'>
                <a href="#" className='page-link' onClick={nextPage}>
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      
      <Footer/>
    </>
  )

  function prePage() {
    if(currentPage !== 1) {
      setCurrentPage(currentPage - 1)
    }
  }
  
  function changePage(id) {
    setCurrentPage(id)
  }

  function nextPage() {
    if(currentPage !== npage) {
      setCurrentPage(currentPage + 1)
    }
  }
}

export default List