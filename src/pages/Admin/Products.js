import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { MONGO_URL } from "../../services/Helper";
import { Link } from "react-router-dom";

const Products = () => {
 
  const [product, setProduct] = useState([]);

  const getProduct = async () => {
    try {
      const data = await axios.get(
        `${MONGO_URL}/api/v1/product/get-Produts`
      );
        setProduct(data?.data?.response, "ggggggg");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProduct();
  }, []);

  return (
    <Layout>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9 ">
            <h1 className="text-center">All Products</h1>
            <div className="d-flex flex-wrap">
              <div className="card-body">
                <div className="card-name-price">
                  <h5 className="card-title"></h5>
                  <h5 className="card-title card-price"></h5>
                </div>
                <p className="card-text "></p>
                <div className="d-flex flex-wrap">
                {product.map((p) => {
                  return (
                    <Link to={`/dashboard/admin/product/${p._id}`}>
                      <div
                        className="card"
                        style={{ width: "18rem" }}
                        key={p._id}
                      >
                        <img src={`http://localhost:8080/uploads/${p.photo}`} alt="not image" className="card-img-top"  height="150px"
                    width="250px"/>
                        <div className="card-body">
                          {p._id}
                          <h5 className="card-title">{p.name}</h5>
                          <p className="card-text">{p.description}</p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
                </div>
              </div>
            </div>
          </div>
      </div>
      </div>
    </Layout>
  );
};

export default Products;
