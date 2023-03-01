import React from 'react';
import './Popup.css';

function Popup(props) {
  return (
    <div className="popup-box">
      <div className="box">
        {props.content}
        <button className="btn-dong" onClick={props.handleClose}>Đóng</button>
      </div>
    </div>
  )
}

export default Popup