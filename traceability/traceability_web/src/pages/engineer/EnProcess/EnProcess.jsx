import React, {useState, useEffect} from 'react';
import './EnProcess.css';
import Popup from '../../../components/Popup/Popup';
import { Link, useParams } from 'react-router-dom';
import DataProcess from "../../../DataProcess.json";

function EnProcess() {
  const [isOpen, setIsOpen] = useState(false);
 
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }
  const params = useParams();
  console.log("params", params)

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

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

  const getInfoProcess = () => {
    fetch(`http://localhost:5000/process/get-process/${params.id}`, {
      method: "GET",
      headers: {
        'x-auth-token': tokenData,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setName(data.data.name);
        setDescription(data.data.description);

        console.log(data.data);
      });
  }

  useEffect(() => {
    tokenIsValid();
    getInfoProcess();
  }, []);

  return (
    <>
    <div className='enprocess'>
      <div className='description'>
        <div className='description-1'>   
          <div className='information'>
            <p><b>Process's name:</b> {name}</p>
            <p><b>Process's ID: </b> {DataProcess[0].pID}</p>
          </div>
        </div>
        <div className='description-2'>
          <h3>Description:</h3>
          <p>{description}</p>
        </div>

        <div className='description-3'>
          <div className='info-btn'>
            <Link to={`/enupdateprocess/${params.id}`}>
              <input type='button' value="Update information" className='btn-update-process-info'/>
            </Link>
          </div>
          <input type="button" className='btn-detail' value="Detail" onClick={togglePopup}/>
          {isOpen && <Popup
            content={
              <div className='popup-detail'>
                <h2>Full Process Information</h2>
                <p>
                  {DataProcess[0].detail_description}
                </p>
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

export default EnProcess