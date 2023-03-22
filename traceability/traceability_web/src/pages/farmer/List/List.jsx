import React, { useState } from 'react';
import './List.css';
import * as RiIcons from "react-icons/ri";
import * as BiIcons from "react-icons/bi";
import { Link } from "react-router-dom";
import Data from "../../../Data.json";

function List() {

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 3;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = Data.slice(firstIndex, lastIndex);
  const npage = Math.ceil(Data.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  return (
    <>
      <div className='list'>
        <div className='list-title'>
          <h2>List of products</h2>
          <Link to="/createqr" className="btn-add-product">
            Add product
          </Link>
        </div>
        <div className="product-list">
          <table>
            <tr>
              <th>Ordinal numbers</th>
              <th>Product's name</th>
              <th>Product's ID</th>
              <th>Status</th>
              <th>Number of updates</th>
              <th></th>
            </tr>
            {records.map((val, key) => {
              return (
                <tr key={key}>
                  <td>{val.id}</td>
                  <td>{val.name}</td>
                  <td>{val.pId}</td>
                  <td>{val.status}</td>
                  <td>{val.numberOfUpdates}</td>
                  <td>
                    <div className='btn-list'>
                      <Link to="/updateproduct" className="btn-edit-product">
                        <RiIcons.RiEditBoxLine/>
                      </Link>
                      <Link to="/list" className="btn-remove-product">
                        <BiIcons.BiTrash/>
                      </Link>
                    </div>
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