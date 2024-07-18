import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/cart";
import axios from "axios";
import { MONGO_URL } from "../services/Helper";
import { useParams, useNavigate } from "react-router-dom";
const ProductDetails = () => {
  const {id} = useParams();
  const [cart, setCart] = useCart();
  console.log(id,"id");
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  //initalp details
  const getProduct = async () => {
    try {
      const data = await axios.get(`${MONGO_URL}/api/v1/product/get-Produts/${id}`);
      const findData=data?.data?.response
       const items= findData.find((item)=>{
        return item._id===id
       })
       setProduct(items,"dd")
       getSimilarProduct (items._id,items.category._id,"iiiiiiiiiiiiiii");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProduct();
   
  }, []);
  //get similar product
  const getSimilarProduct = async (pid,cid) => {
    try {
      const { data } = await axios.get(`${MONGO_URL}/api/v1/product/related-product/${pid}/${cid}`);
      setRelatedProducts(data?.products,"similarProduct");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="row container product-details">
        <div className="col-md-6">
          <img
            src={`${MONGO_URL}/uploads/${product?.photo}`}
            className="card-img-top"
            alt={product?.name}
            height="300"
            width={"350px"}
          />
        </div>
        <div className="col-md-6 product-details-info">
          <h1 className="text-center">Product Details</h1>
          <hr />
          <h6>Name:{product?.name}</h6>
          <h6>Description : {product?.description}</h6>
          <h6>
            Price :
            {product?.price?.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </h6>
          <h6>Category : {product?.category?.name}</h6>
          <button class="btn btn-secondary ms-1"
               onClick={() => {
                    setCart([...cart ,product]);
                    localStorage.setItem(
                      "cart",
                      JSON.stringify([...cart,product])
                    );
                    // otast.success("Item Added to cart");
                  }}
                  >
            ADD TO CART</button>
        </div>
      </div>
      <hr/>
      <div className="row container similar-products">
        <h4>Similar Products ➡️</h4>
        {relatedProducts.length < 1 && (
          <p className="text-center">No Similar Products found</p>
        )}
        <div className="d-flex flex-wrap">
          {relatedProducts?.map((p) => (
            <div className="card m-2" key={p._id}>
              <img
                src={`${MONGO_URL}/uploads/${p.photo}`}  height="150px"
                width="250px"
                className="card-img-top"
                alt={p.name}
              />
              <div className="card-body">
                <div className="card-name-price">
                  <h5 className="card-title">{p.name}</h5>
                  <h5 className="card-title card-price">
                    {p.price.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </h5>
                </div>
                <p className="card-text ">
                  {p.description.substring(0, 60)}...
                </p>
                <div className="card-name-price">
                  <button
                    className="btn btn-info ms-1"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    More Details
                  </button>
                  <button
                  className="btn btn-dark ms-1"
                  onClick={() => {
                    setCart([...cart, p]);
                    localStorage.setItem(
                      "cart",
                      JSON.stringify([...cart, p])
                    );
                    // toast.success("Item Added to cart");
                  }}
                >
                  ADD TO CART
                </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
