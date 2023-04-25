import React, { useState, useEffect } from 'react';
import './List.css';
import * as RiIcons from "react-icons/ri";
import * as BiIcons from "react-icons/bi";
import { Link } from "react-router-dom";
import Data from "../../../Data.json";

function List() {
  const [data, setData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 3;
  const lastIndex = currentPage * recordsPerPage; 
  const firstIndex = lastIndex - recordsPerPage;
  const records = data.slice(firstIndex, lastIndex);
  const npage = Math.ceil(data.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

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
        // console.log(token);
        // setToken(data);
        console.log("token", data)
      });
  }

  const getProducts = () => {
    fetch("http://localhost:5000/product/get-product", {
      method:"GET",
      headers: {
        'x-auth-token': tokenData,
      }
    })
      .then((res) => res.json() )
      .then((data) => {
        console.log(data.data);
        setData(data.data);
      });
  }

  const deleteProduct = (id) => {
    fetch(`http://localhost:5000/product/delete-product/${id}`, {
      method:"DELETE",
      headers: {
        'x-auth-token': tokenData,
      }
    })
      .then((res) => res.json() )
      .then((data) => {
        alert("Product is deleted");
        window.location.href = "/list";
      });
  }
  useEffect(() => {
    tokenIsValid();
    getProducts();
  }, []);


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
              <th>No.</th>
              <th>Product's name</th>
              <th>Status</th>
              <th>Number of updates</th>
              <th></th>
            </tr>
            {records.map((item, index) => {
              return (
                <tr key={item._id}>
                  <td>{index+1}</td>
                  <td>{item.name}</td>
                  <td>{item.status == true ? <BiIcons.BiCheck className='check-icon'/> : <RiIcons.RiCloseLine className='close-icon'/>}</td>
                  <td>{item.numberOfUpdates}</td>
                  <td>
                    <div className='btn-list'>
                      <Link to={`/updateproduct/${item._id}`} className="btn-edit-product">
                        <RiIcons.RiEditBoxLine/>
                      </Link>
                      <Link to="/list" className="btn-remove-product" onClick={() => deleteProduct(item._id)}>
                        <BiIcons.BiTrash/>
                      </Link>
                    </div>
                  </td>
                </tr>
              )
            })}
          </table>
          {
            numbers.length <=1 ? null 
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

export default List