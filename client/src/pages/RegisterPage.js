import React, { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import Axios from "axios";
import Loader from "../components/Loader";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const inputEmail = useRef();
  const inputPassword = useRef();
  const inputConfirmPassword = useRef();

  const auth = getAuth();

  function registerToChatApp() {
    return new Promise((resolve, reject) => {
      var data = {
        username: email.substring(0, email.length - 10),
        secret: password,
        email: email,
      };
      var config = {
        method: "post",
        url: "https://api.chatengine.io/users/",
        headers: {
          "PRIVATE-KEY": "fbfe3e73-7d2f-4075-bd68-f62ce807c800",
        },
        data: data,
      };
      Axios(config)
        .then((response) => {
          console.log(
            "response data from Axios when user registering to chat app=>"
          );
          console.log(response.data);
          resolve("registered");
        })
        .catch((error) => {
          console.log("error from Axios when user registering to chat app=>");
          console.log(error);
          reject("not registered");
          alert("try again");
          window.location.reload();
        });
    });
  }
  function userRegistration() {
    registerToChatApp().then((e) => {
      // setLoading(false);
      if (e === "registered") {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user);
            toast.success("Successfully Registered!");
            navigate('/login')
            // ...
          })
          .catch((error) => {
            setLoading(false);
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(
              "Register page => userRegistration function => Error code =>"
            );
            console.log(errorCode);
            console.log(
              "Register page => userRegistration function => Error message =>"
            );
            console.log(errorMessage);
            toast.error("Registration Failed!");
            window.location.reload();
            // ..
          });
      }
    });
  }

  const Register = () => {
    return (
      <>
        <div className="register-parent d-flex justify-content-center">
          {/* register form */}
          <div className="col-md-4 register-form-parent">
            <div className="register-form">
              <h2 className="authentication-title">REGISTER</h2>
              <hr />
              <input
                className="form-control"
                type="text"
                ref={inputEmail}
                autoFocus={inputEmail.current === document.activeElement}
                value={email}
                placeholder="Enter your email..."
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <input
                className="form-control"
                type="password"
                ref={inputPassword}
                autoFocus={inputPassword.current === document.activeElement}
                value={password}
                placeholder="Enter your password..."
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <input
                className="form-control"
                type="password"
                ref={inputConfirmPassword}
                autoFocus={
                  inputConfirmPassword.current === document.activeElement
                }
                value={confirmPassword}
                placeholder="Enter your password again..."
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
              <button
                className="btn btn-primary my-3 authenticate-btn"
                onClick={() => {
                  setLoading(true);
                  userRegistration();
                }}
              >
                REGISTER
              </button>
              <hr />
              <Link className="authentication-link" to="/login">
                Already registerd? Click here to login
              </Link>
            </div>
          </div>
          {/* animation */}
          <div className="col-md-5 register-animation">
            <lottie-player
              src="https://assets10.lottiefiles.com/packages/lf20_u8o7BL.json"
              background="transparent"
              speed="1"
              // style={{ width: "300px", height: "300px" }}
              loop
              autoplay
            ></lottie-player>
          </div>
        </div>
        <div className="register-bottom"></div>
      </>
    );
  };

  return <>{loading ? <Loader /> : <Register />}</>;
};

export default RegisterPage;
