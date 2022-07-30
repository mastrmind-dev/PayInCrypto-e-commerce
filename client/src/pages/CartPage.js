import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

const CartPage = () => {
  const { cartItems } = useSelector((state) => state.cartReducer);
  const dispatch = useDispatch();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let temp = 0;
    cartItems.forEach((item) => {
      temp = temp + item.price;
    });
    setTotal(temp);
    console.log(total);
  }, [cartItems]);

  var n = 0;
  const Cartitem = (item) => {
    n = n + 1;
    return (
      <tr key={n}>
        <th>
          <img
            src={item.imageURL}
            alt={item.description}
            style={{ width: "165px", height: "125px" }}
          />
        </th>
        <th>{item.name}</th>
        <th>{item.price}</th>
        <th>
          {
            <FaTrash
              className="icon"
              onClick={() => {
                deleteFromCart(item);
              }}
            />
          }
        </th>
      </tr>
    );
  };

  function deleteFromCart(item) {
    dispatch({ type: "DELETE_FROM_CART", payload: item });
  }

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <Layout>
      <div className="container">
        <table className="table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => {
              return Cartitem(item);
            })}
          </tbody>
        </table>
        <div class="row">
            <button class="btn col-md-4 cart-page-buttons">Place Order</button>
            <button class="btn col-md-4"></button>
            <button class="btn col-md-4 cart-page-buttons">Total = {total} Rs.</button>
        </div>
    </div>
    </Layout>
  );
};

export default CartPage;
