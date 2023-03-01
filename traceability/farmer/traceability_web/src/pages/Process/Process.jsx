import React, { useState } from 'react';
import './Process.css';
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import DataProcess from '../../DataProcess.json';

// const data = [
//   {id: 1, name: "Process of planting Apple", pID: "001"},
//   {id: 2, name: "Process of planting Banana", pID: "002"},
//   {id: 3, name: "Process of planting Mango", pID: "003"},
//   {id: 4, name: "Process of planting Grape", pID: "004"},
//   {id: 5, name: "Process of planting Orange", pID: "005"},
// ]

function Process() {
  
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = DataProcess.slice(firstIndex, lastIndex);
  const npage = Math.ceil(DataProcess.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  return (
    <>
      <Navbar />
      <div className='process'>
        <div className='process-title'>
          <h2>List of processes</h2>
          <Link to="#" className="btn-add-process">
            Add process
          </Link>
        </div>
        <div className="list-process">
          <table>
            <tr>
              <th>ID</th>
              <th>Process's Name</th>
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
                    <Link to="#" className="btn-watch">
                      Watch
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

export default Process