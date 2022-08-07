import React from "react";
import { Link } from "react-router-dom";
import { FaBars, FaCartPlus } from "react-icons/fa";
import { useSelector } from "react-redux";

const Header = () => {
  const { cartItems } = useSelector((state) => state.cartReducer);
  const user = JSON.parse(localStorage.getItem("currentUser"));
  console.log(JSON.parse(localStorage.getItem("currentUser")));

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          PayInCrypto
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbarTogglerIcon">
            <FaBars size="25" color="white" />
          </span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                {user.email.substring(0, user.email.length - 10)}
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Orders
              </Link>
            </li>
            <li
              className="nav-item"
              onClick={() => {
                const keysToRemove = ['currentUser', 'credentials']
                keysToRemove.forEach(key=>localStorage.removeItem(key))
                window.location.reload();
              }}
            >
              <Link className="nav-link" to="/">
                Logout
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/cart">
                <FaCartPlus /> {cartItems.length}
              </Link>
            </li>
            <li>
              <Link className="nav-link btn btn-primary" style={{fontWeight:"bolder"}} to="/cart">
                Crypto Exchange
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
