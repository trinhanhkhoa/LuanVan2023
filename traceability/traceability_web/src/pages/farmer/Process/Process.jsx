import React, { useState, useEffect } from 'react';
import './Process.css';
import { Link } from "react-router-dom";
import DataProcess from '../../../DataProcess.json';

function Process() {
  const [data, setData] = useState([]);
  
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
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
      <div className='process'>
        <div className='process-title'>
          <h2>List of processes</h2>
        </div>
        <div className="list-process">
          <table>
            <tr>
              <th>ID</th>
              <th>Process's Name</th>
              {/* <th>Process's ID</th> */}
              <th></th>
            </tr>
            {records.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{index+1}</td>
                  <td>{item.name}</td>
                  {/* <td>{}</td> */}
                  <td>
                    <Link to={`/processdetail/${item._id}`} className="btn-watch-process">
                      Watch
                    </Link>
                  </td>
                </tr>
              )
            })}
          </table>
          {
            numbers.length <= 1 ? null 
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

export default Process