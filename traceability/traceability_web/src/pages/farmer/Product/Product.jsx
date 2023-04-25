import React, {useState, useEffect} from 'react';
import './Product.css';
import cam from "../../../asserts/cam.jpg";
import * as TbIcons from "react-icons/tb";
import Popup from '../../../components/Popup/Popup';
import { Link, useParams } from 'react-router-dom';
import Data from "../../../Data.json";

function Product() {
  const [isOpen, setIsOpen] = useState(false);
 
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }

  const params = useParams();
  
  const [name, setName] = useState("");
  const [time, setTime] = useState("");
  const [images, setImages] = useState([]);
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");


  const tokenData = window.localStorage.getItem("token");
  const user = window.localStorage.getItem("userId");
  const userId = window.localStorage.getItem("userId");

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

  const getInfoProduct = () => {
    fetch(`http://localhost:5000/product/get-product/${params.id}`, {
      method: "GET",
      headers: {
        "x-auth-token": tokenData,
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setName(data.data.name);
        setAddress(data.data.address);
        setDescription(data.data.description);
        setTime(data.data.time);
        setImages(data.data.image);
        console.log(data.data.images);

        console.log(data);
      });
  }

  const deleteProduct = (id) => {
    fetch(`http://localhost:5000/product/${id}`, {
      method:"DELETE",
    })
      .then((res) => res.json() )
      .then((data) => {
        alert("Product is deleted");
        window.location.href = "/list";
      });
  }

  useEffect(() => {
    tokenIsValid();
    getInfoProduct();
  }, []);

  return (
    <>
    <div className='product'>
      <div className='product-btn-img'>
        { 
          images && images.length > 0 && images.length < 3 && images.map((link, index) => {
            return (
              <div className="images-link" key={index++}>
                <img className="image" src={link}  width={190} height={170} />
              </div>
            )
          })
        }
        <div className='product-info-btn'>
          <Link to={`/updateproduct/${params.id}`}>
            <input type='button' value="Update information" className='btn-update-product-info'/>
          </Link>
          <Link to="/list">
            <input type='button' value="Delete product" onClick={() => deleteProduct(params.id)} className='btn-delete'/>
          </Link>
        </div>
      </div>
      <div className='product-description'>
        <div className='product-description-1'>
          <TbIcons.TbQrcode className="product-qr-icon"/>          
          <div className='product-information'>
            <p><b>Product's name:</b> {name}</p>
            <p><b>Product's ID:</b> {Data[0].pId}</p>
            <p><b>Plant time:</b> {time}</p>
          </div>
        </div>
        <div className='product-address'>
          <p><b>Address: </b> {address}</p>
        </div>
        <div className='product-description-2'>
          <h2>Description:</h2>
          <p>{description}</p>
        </div>

        <div className='product-description-3'>
          <div className='product-update'>
            <p><b>Number of updates: </b> 2 times</p>
          </div>
          <input type="button" value="Detail" onClick={togglePopup}/>
          {isOpen && <Popup
            content={
              <div className='popup-detail'>
                <b>Update Information</b>
                <p>{Data[0].detail}</p>
              </div>
              }
            handleClose={togglePopup}
          />}      
        </div>
      </div>
    </div>
  </>
  
  )
}

export default Product