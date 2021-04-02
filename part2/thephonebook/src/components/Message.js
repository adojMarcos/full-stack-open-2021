import React from 'react'

const Message = ({ message }) => {
    if (message === null) {
      return null;
    }
  
    return <div className={message.includes("Error:") ? "error" : "add"}>{message}</div>;
  };

export default Message;