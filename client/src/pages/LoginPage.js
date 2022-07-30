import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Loader from '../components/Loader';

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const inputEmail = useRef();
  const inputPassword = useRef();

  const dispatch = useDispatch();
  const auth = getAuth();
  const { credentials } = useSelector((state) => state.chatReducer);
  useEffect(() => {
    localStorage.setItem("credentials", JSON.stringify(credentials));
  }, [credentials]);

  const signIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        localStorage.setItem("currentUser", JSON.stringify(user));
        console.log(JSON.parse(localStorage.getItem("currentUser")));
        // setLoading(false)
        toast.success("Successfully Signed In!");
        window.location.href = "/";
        dispatch({
          type: "LOGGED_IN",
          payload: {
            username: email.substring(0, email.length - 10),
            secret: password,
          },
        });
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
        toast.error("Sign In Failed!");
        // ..
      });
  };

  const Login = () => {
    return (
      <>
        <div className="register-parent d-flex justify-content-center">
          {/* animation */}
          <div className="col-md-5 login-animation">
            <lottie-player
              src="https://assets2.lottiefiles.com/packages/lf20_oftwajlo.json"
              background="transparent"
              speed="1"
              // style={{ width: "300px", height: "300px" }}
              loop
              autoplay
            ></lottie-player>
          </div>
          {/* register form */}
          <div className="col-md-4 register-form-parent">
            <div className="login-form">
              <h2 className="authentication-title">LOGIN</h2>
              <hr />
              <input
                className="form-control login-control"
                type="text"
                value={email}
                ref={inputEmail}
                autoFocus={inputEmail.current === document.activeElement}
                placeholder="Enter your email..."
                onChange={(e) => {
                  return setEmail(e.target.value);
                }}
              />
              <input
                className="form-control login-control"
                type="password"
                value={password}
                ref={inputPassword}
                autoFocus={inputPassword.current === document.activeElement}
                placeholder="Enter your password..."
                onChange={(e) => {
                  return setPassword(e.target.value);
                }}
              />
              <button
                className="btn btn-primary my-4 authenticate-btn"
                onClick={() => {
                  setLoading(true);
                  signIn();
                }}
              >
                LOGIN
              </button>
              <hr />
              <Link className="authentication-link" to="/register">
                Not registered? Click here to register
              </Link>
            </div>
          </div>
        </div>
        <div className="register-bottom"></div>
      </>
    );
  };

  

  return <>{loading ? <Loader /> : <Login />}</>;
};

export default LoginPage;
