import React from 'react'

const Message = ({ message }) => {
  return (
    <div className="message-container">
      <div className="message-box">
        <p className="message-text">{message.toUpperCase()}</p>
      </div>
    </div>
  )
}

export default Message
