import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Chatapp from "./ChatApp/ChatApp.js";
import Loader from "./Loader.js";
import Chatbot from './Chatbot'

const Layout = (props) => {
  const Body = () => {
    return (
      <>
        <Header />
        <div className="content">{props.children}</div>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <Chatapp />
            </div>
<Chatbot/>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      {props.loading ? <Loader /> : <Body />}
      {/* <Footer /> */}
    </>
  );
};

export default Layout;
