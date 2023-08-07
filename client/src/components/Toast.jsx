import React, { useState } from 'react';

const Toast = ({ message, onClose }) => {
  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
    onClose();
  };

  return (
    <div className={`custom-alert ${show ? 'show' : ''}`}>
      <div className="custom-alert-content">
        <p>{message}</p>
        <button onClick={handleClose}>OK</button>
      </div>
    </div>
  );
};

export default Toast;
