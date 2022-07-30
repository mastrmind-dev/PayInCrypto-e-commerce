import { doc, getDoc } from "@firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Layout from "../components/Layout";
import fireDB from "../fireConfig";

const ProductInfo = () => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const params = useParams();

  useEffect(() => {
    getdata();
  }, []);

  const getdata = async () => {
    setLoading(true);
    try {
      const productTemp = await getDoc(
        doc(fireDB, "products", params.productid)
      );
      console.log(productTemp.data());
      setProduct(productTemp.data());
      setLoading(false);
    } catch (error) {
      console.log("error in productinfo page, in getdata function =>");
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Layout loading={loading}>
      <div className="container">
        <div className="text-center">
          <h1>{product.name}</h1>
          <img
            src={product.imageURL}
            alt="image of the product"
            className="product-info-img"
          />
          <hr />
          <h4>{product.description}</h4>
        </div>
        <div className="row">
          <div className="col-md-6 d-flex justify-content-end">
            <button>Add To Cart</button>
          </div>
          <div
            className="col-md-6 d-flex justify-content-start"
          >
            <button>Exchange Ether</button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductInfo;
