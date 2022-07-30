import React, { useEffect, useState, useRef } from "react";
import Layout from "../components/Layout";
import { collection, addDoc, getDocs } from "firebase/firestore";
import fireDB from "../fireConfig";
import { fireproducts } from "../firecommerce-products";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const Homepage = () => {
  // const adddata = async () => {
  //   try {
  //     // Add a new document with a generated id.
  //     const docRef = await addDoc(collection(fireDB, "users"), {
  //       name: "Upeksha",
  //       country: "Australia",
  //     });
  //     console.log("Document written with ID: ", docRef.id);
  //   } catch (error) {
  //     console.log("error in homepage, in adddata function =>");
  //     console.log(error);
  //   }
  // };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cartReducer);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const [filterKey, setFilterKey] = useState("");
  const inputSearchText = useRef();
  const selectCategory = useRef();

  console.log(selectCategory);

  useEffect(() => {
    getdata();
    // addProductData();
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const getdata = async () => {
    setLoading(true);
    try {
      const product = await getDocs(collection(fireDB, "products"));
      const productArray = [];
      product.forEach((doc) => {
        const obj = {
          id: doc.id,
          ...doc.data(),
        };
        productArray.push(obj);
      });
      console.log(productArray);
      setProducts(productArray);
      setLoading(false);
    } catch (error) {
      console.log("error in homepage, in getdata function =>");
      console.log(error);
      setLoading(false);
    }
  };

  const addProductData = async () => {
    try {
      fireproducts.map(async (product) => {
        //we can use forEach too
        await addDoc(collection(fireDB, "products"), product);
      });
    } catch (error) {
      console.log("error in homepage in addProductData function =>");
      console.log(error);
    }
  };

  const addToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  function Products({ product }) {
    return (
      <div className="col-md-4" key={product.id}>
        <div className="m-2 p-1 product position-relative">
          <div className="product-content">
            <h5>{product.name}</h5>
            <h6>{product.description}</h6>
            <img
              src={product.imageURL}
              alt="imageOfTheProduct"
              className="product-img"
            />
          </div>
          <div className="product-actions">
            <h2>{product.price} LKRT</h2>
            <div className="d-flex">
              <button
                className="mx-2 product-buttons"
                onClick={() => addToCart(product)}
              >
                ADD TO CART
              </button>
              <button
                className="product-buttons"
                onClick={() => {
                  navigate(`/productinfo/${product.id}`);
                }}
              >
                VIEW
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function Ui() {
    var map;
    if (filterKey === "all") {
      map = products
        .filter((item) =>
          item.name.toLowerCase().includes(searchKey.toLowerCase())
        )
        .map((product) => {
          return <Products product={product} />;
        });
    } else {
      map = products
        .filter((item) =>
          item.name.toLowerCase().includes(searchKey.toLowerCase())
        )
        .filter((item) =>
          item.category.toLowerCase().includes(filterKey.toLowerCase())
        )
        .map((product) => {
          return <Products product={product} />;
        });
    }
    // var mapArray = [];
    // for (var i = 0; i < 3; i++) {
    //   mapArray.push(map);
    // }
    // return mapArray;
    return map;
  }

  console.log(filterKey);

  return (
    <Layout loading={loading}>
      <div className="container">
        <div className="d-flex search_and_filter">
          <input
            style={{ boxShadow: "none" }}
            type="text"
            className="form-control"
            value={searchKey}
            ref={inputSearchText}
            autoFocus={inputSearchText.current === document.activeElement}
            onChange={(e) => {
              console.log(e.target.value);
              setSearchKey(e.target.value);
            }}
          />
          <select
            className="form-control"
            style={{ boxShadow: "none" }}
            value={filterKey}
            onChange={(e) => {
              setFilterKey(e.target.value);
            }}
          >
            <option value="all">All</option>
            <option value="travel">Travel</option>
            <option value="electronic">Electronic</option>
            <option value="fashion">Fashion</option>
          </select>
        </div>
        {/* <button onClick={adddata}>Add data to firebase</button> */}
        {/* <button onClick={getdata}>Get data from firebase</button> */}
        {/* <button onClick={addProductData}>Add product data to firebase</button> */}
        <div className="row">
          <Ui />
        </div>
      </div>
    </Layout>
  );
};

export default Homepage;
