import React from "react";
import "./css/Message.css";

const Message = ({ message }) => {
  const messages = message.map(
    (
      msg,
      i /*map takes this as button number increment, we don't have to make button number increment manually*/
    ) => {
      if (msg.speaks === "bot") {
        return (
          <div key={i} className="bot row">
            <p className="col s3 chat-icon">
              <button
                className="chat-icon"
              >
                Chaty
              </button>
            </p>
            <p className="col s8 message-box bot-box">{msg.msg}</p>
          </div>
        );
      } else {
        return (
          <div key={i} className="me row">
            <p className="col s8 message-box me-box">{msg.msg}</p>
            <p className="col s4 chat-icon">
              <button
                className="chat-icon"
              >
                Me
              </button>
            </p>
          </div>
        );
      }
    }
  );

  return messages;
};

export default Message;
