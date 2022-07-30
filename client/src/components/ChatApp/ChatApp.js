import React, { useState } from "react";
import { Button, ChatEngine } from "react-chat-engine";
import "../../stylesheets/ChatApp.css";
import ChatApp from "./DirectChat";
import {useSelector} from 'react-redux'

function Chatapp() {
  const [action, setAction] = useState(false);
  const {credentials}=useSelector((state)=>state.chatReducer)
  console.log(credentials)
  console.log(credentials.secret)

  function ChatArea({ action }) {
    if (action) {
      return (
        <div className="chat-area">
          <button
            className="btn btn-primary"
            onClick={() => {
              setAction(false);
            }}
          >
            Close
          </button>
          <ChatEngine
            height="80vh"
            projectID="0cd06a98-9c80-4952-8a37-11a48c19ccc8"
            userName={credentials.username}
            userSecret={credentials.secret}
            renderNewChatForm={(props) => <ChatApp {...props} />}
          />
        </div>
      );
    } else {
      return <></>;
    }
  }

  return (
    <>
      <Button
        className="chat-button chat-open-button"
        value="Open Chat Window"
        onClick={() => {
          setAction(true);
        }}
      />
      <ChatArea action={action} />
    </>
  );
}

export default Chatapp;