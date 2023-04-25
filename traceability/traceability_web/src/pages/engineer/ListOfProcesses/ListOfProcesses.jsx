import React, { useState, useEffect } from 'react';
import './ListOfProcesses.css';
import * as RiIcons from "react-icons/ri";
import * as BiIcons from "react-icons/bi";
import { Link } from "react-router-dom";

function ListOfProcesses() {
  const [data, setData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 3;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = data.slice(firstIndex, lastIndex);
  const npage = Math.ceil(data.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);


  const tokenData = window.localStorage.getItem("token");

  const tokenIsValid = () => {
    fetch("http://localhost:5000/tokenIsValid", {
      method:"POST",
      crossDomain:true,
      headers: {
        'x-auth-token': tokenData,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin":"*"
      }
    })
      .then((res) => res.json() )
      .then((data) => {
        console.log("token", data)
      });
  }

  const getProcesses = () => {
    fetch("http://localhost:5000/process/get-processes", {
      method:"GET",
      headers: {
        'x-auth-token': tokenData,
      },
    })
      .then((res) => res.json() )
      .then((data) => {
        console.log(data.data);
        setData(data.data);
      });
  }

  useEffect(() => {
    tokenIsValid();
    getProcesses();
  }, []);


  return (
    <>
      <div className='list'>
        <div className='list-title'>
          <h2>List of processes</h2>
          <Link to="/encreateprocess" className="btn-add-process">
            Add process
          </Link>
        </div>
        <div className="process-list">
          <table>
            <tr>
              <th>Process's name</th>
              <th>Process's ID</th>
              <th></th>
            </tr>
            {records.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.pID}</td>
                  <td>
                    <Link to={`/enprocess/${item._id}`} className="btn-watch">
                      <BiIcons.BiSearch/>
                    </Link>
                    <Link to={`/enupdateprocess/${item._id}`} className="btn-edit">
                      <RiIcons.RiEditBoxLine/>
                    </Link>
                  </td>
                </tr>
              )
            })}
          </table>
          {
            records.length == 0 ? null 
            : <nav>
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
          }
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

export default ListOfProcesses