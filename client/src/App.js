import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Homepage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProductInfoPage from "./pages/ProductInfo";
import CartPage from "./pages/CartPage";

import "./stylesheets/Layout.css";
import "./stylesheets/Product.css";
import "./stylesheets/Authentication.css";
import "react-toastify/dist/ReactToastify.css";

function App() {

  const ProtectRoutes = (props) => {
    if (localStorage.getItem("currentUser")) {
      return props.protectedPage;
    } else {
      return <Navigate to="/login" />;
    }
  };

  return (
    <div className="App">
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            exact
            element={<ProtectRoutes protectedPage={<Homepage />} />}
          />
          <Route path="/login" exact element={<LoginPage />} />
          <Route path="/register" exact element={<RegisterPage />} />
          <Route
            path="/productinfo/:productid"
            exact
            element={<ProtectRoutes protectedPage={<ProductInfoPage />} />}
          />
          <Route
            path="/cart"
            exact
            element={<ProtectRoutes protectedPage={<CartPage />} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
