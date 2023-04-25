import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import './EnManageAccounts.css';
import * as RiIcons from "react-icons/ri";


function EnManageAccounts() {
  const [data, setData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 3;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = data.slice(firstIndex, lastIndex);
  const npage = Math.ceil(data.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [userType, setUserType] = useState("");
  const [userId, setUserId] = useState([]);
  const [products, setProducts] = useState([]);

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

  const getUsers = () => {
    fetch("http://localhost:5000/users", {
      method:"GET",
      headers: {
        'x-auth-token': tokenData,
        },
      })
      .then((res) => res.json() )
      .then((data) => {
        console.log(data.data, "userRegister");
        setData(data.data);
  })
}
  useEffect(() => {
    tokenIsValid();
    getUsers();
  }, []);
  
  return (
    <>
      <div className='manage-page'>
        <div className='manage-page-title'>
          <h2>Accounts Management</h2>
        </div>
        <div className="manage-list">
          <table>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Number of products</th>
              <th></th>
            </tr>
            {records.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.products.length}</td>
                  <td>
                    <div className='btn-list'>
                      <Link to={`/enuseraccount/${item._id}`} className="btn-watch">
                        <RiIcons.RiEditBoxLine/>
                      </Link>
                    </div>
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

export default EnManageAccounts