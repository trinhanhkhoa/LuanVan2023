import React, { useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom";
import './EnUserAccount.css';
import * as RiIcons from "react-icons/ri";


function EnUserAccount() {

  const [data, setData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 3;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = data.slice(firstIndex, lastIndex);
  const npage = Math.ceil(data.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  const params = useParams();
  console.log(params);

  const tokenData = window.localStorage.getItem("token");
  const id = window.localStorage.getItem("userId");

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
    fetch(`http://localhost:5000/users/${params.id}`, {
      method:"GET",
      headers: {
        'x-auth-token': tokenData,
      }
    })
      .then((res) => res.json() )
      .then((data) => {
        console.log(data.data.products.length);
        setData(data.data.products);
      });
  }

  useEffect(() => {
    tokenIsValid();
    getUsers();
    // console.log("length",data.length);
  }, []);

  return (
    <>
      <div className='manage-page'>
        <div className='manage-page-title'>
          <h2>User Account</h2>
        </div>
        <div className="manage-list">
          <table>
            <tr>
              <th>Product's name</th>
              <th>Type of product</th>
              <th></th>
            </tr>
            {records.length == 0 ? 
                <tr>
                  <td>null</td>
                  <td>null</td>
                </tr>
             : records.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{}</td>
                  <td>
                    <div className='btn-list'>
                      <Link to={`/enproducttracking`} className="btn-watch">
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

export default EnUserAccount