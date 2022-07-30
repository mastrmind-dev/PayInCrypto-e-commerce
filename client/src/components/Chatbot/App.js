import React, { useState, useRef, useEffect } from "react";
import { AiFillCloseSquare } from "react-icons/ai";

import { MdChat, MdOutlineChatBubbleOutline } from "react-icons/md";
import axios from "axios";
import Message from "./Message";
import "./css/Message.css";

const App = () => {
  let says = {
    speaks: "bot",
    msg: "Hello there..! How can I help you?",
  };
  const [message, setMessage] = useState([says]);
  const [userMessageSent, setUserMessageSent] = useState(false);
  const [isClosed, setIsClosed] = useState(true);
  const chatAreaBottom = useRef(null);
  const inputText = useRef(null);
  const userSaid = useRef("");

  useEffect(() => {
    if (!isClosed) {
      chatAreaBottom.current.scrollIntoView({ behavior: "smooth" });
      // inputText.current.focus();
    }
  }, [message]);

  const userMessage = async (userInput) => {
    if (userInput) {
      inputText.current.value = "";
      says = {
        speaks: "me",
        msg: userInput,
      };

      setMessage([...message, says]);
      setUserMessageSent(true);
    }
  };

  const botMessage = async (userInput) => {
    const response = await axios.post(
      "http://localhost:4000/api/df_text_query",
      { text: userInput }
    );
    says = {
      speaks: "bot",
      msg: response.data,
    };
    setUserMessageSent(false);
    setMessage([...message, says]);
  };

  //We are in button functional component. So below if code block is executed automatically. No need to put it into button nested function.
  if (userMessageSent) {
    setTimeout(() => {
      botMessage(userSaid.current);
    }, 700);
  }

  return (
    <div className="row">
      {isClosed ? (
        <button
          href="#"
          className=""
          style={{
            position: "fixed",
            right: 40,
            bottom: 40,
            borderRadius: "50%",
            width: "60px",
            height: "60px",
            backgroundColor: "blue",
          }}
          onClick={() => {
            setIsClosed(false);
          }}
        >
          <MdChat size="25" color="white" />
        </button>
      ) : (
        <div
          className="chatbot-boundary col s3 right"
          style={{
            boxShadow:
              "rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px",
            position: "fixed",
            height: "70%",
            width: "25%",
            right: "2%",
            bottom: "3%",
            overflowY: "auto",
            borderRadius: "10px",
            background: "white",
          }}
        >
          <div
            className="chatbot-header row"
            style={{
              position: "fixed",
              height: "7%",
              width: "25%",
              backgroundColor: "#0d47a1",
              zIndex: "99",
              paddingLeft: "1%",
              paddingTop: "0.7%",
              color: "white",
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px",
            }}
          >
            <div className="col-sm-8">
              <>
                <MdOutlineChatBubbleOutline size="25" color="white" />
                <span
                  style={{
                    fontWeight: "bolder",
                    fontSize: "1.5em",
                    marginLeft: "10px",
                  }}
                >
                  Chaty
                </span>{" "}
                {userMessageSent ? <> is typing...</> : null}
              </>
            </div>

            <div
              className="col-sm-4"
              // style={{ marginRight: "2%" }}
            >
              <div className="row">
                <div className="col-sm-6"></div>
                <div className="col-sm-6">
                  <AiFillCloseSquare
                    onClick={() => {
                      setIsClosed(true);
                    }}
                    size="30"
                    color="white"
                  />
                </div>
              </div>
            </div>
          </div>
          <div
            className="chatbot-messages"
            style={{
              // backgroundColor: "red",
              position: "relative",
              marginTop: "14%",
              marginBottom: "14%",
              paddingBottom: "3%",
              zIndex: "9",
            }}
          >
            {<Message message={message} />}
            <div className="chatAreaBottom" ref={chatAreaBottom}></div>
            {/**this empty div is very important for scrollIntoView in the useEffect hook. To scroll this div into view the chatbot */}
          </div>

          <input
            className="input-field form-control"
            style={{
              position: "fixed",
              width: "25%",
              right: "2%",
              bottom: "3%",
              zIndex: "99",
              height: "7%",
              backgroundColor: "#0d47a1",
              paddingLeft: "1%",
              paddingRight: "1%",
              borderBottomLeftRadius: "10px",
              borderBottomRightRadius: "10px",
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
              borderStyle: "none",
              color: "white",
            }}
            autoFocus
            ref={inputText}
            type="text"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                userSaid.current = e.target.value;
                return userMessage(userSaid.current);
              }
            }}
          />
        </div>
      )}
    </div>
  );
};

export default App;
