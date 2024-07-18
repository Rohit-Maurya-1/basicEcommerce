import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { Prices } from "../components/Prices";
import axios from "axios";
import "../App.css"
import { AiOutlineReload } from "react-icons/ai";
import { Checkbox, Radio } from "antd";
import { useCart } from "../context/cart";
import { MONGO_URL } from "../services/Helper";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
// import Rating from "./user/Rating/Rating";

const HomePage = () => {
  const navigate = useNavigate();
  const [auth,setAuth]=useAuth()
  const [cart, setCart] = useCart();
  const [product, setProduct] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${MONGO_URL}/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data?.category);
    }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);
  console.log(auth,"auth");
  console.log(cart,"cart");
  //==========================get total==========================================
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        `${MONGO_URL}/api/v1/product/product-count`
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };
  // ==================load more========================================================
  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);
  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${MONGO_URL}/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProduct([...product, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  //=====================get product====================================
  const getProduct = async () => {
    try {
      const data = await axios.get(
        `${MONGO_URL}/api/v1/product/product-list/${page}`
      );
      console.log(setProduct(data?.data?.products,"ggg"));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (!checked.length || !radio.length) getProduct();
  }, [checked, radio]);

  //================================handlefilter=====================================
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => {
        return c !== id;
      });
    }
    setChecked(all);
  };
  // //===================get filterd product===================================
  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        `${MONGO_URL}/api/v1/product/product-filters`,
        {
          checked,
          radio,
        }
      );
      setProduct(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  //=====================================add to cart================================
       const  handleCart= async (product)=>{
        try {
          const authUser=auth?.user?._id
          const createCart= await axios.post(`${MONGO_URL}/api/v1/cart/createCart`,{authUser,product})
          setCart(createCart?.data?.response,"createcart");
          
        } catch (error) {
           console.log(error);
        }
       
          
       }
  return (
    <>
      <Layout title={"ALl Products - Best offers "}>
        {/* banner image */}
        <img
          src="/images/banner.png"
          className="banner-img"
          alt="bannerimage"
          width={"100%"}
        />
        {/* banner image */}
        {checked}
        <div className="container-fluid row mt-3 home-page">
          <div className="col-md-3 filters">
            <h4 className="text-center">Filter By Category</h4>
            <div className="d-flex flex-column">
              {categories.map((c) => {
                return (
                  <Checkbox
                    key={c._id}
                    onChange={(e) => handleFilter(e.target.checked, c._id)}
                  >
                    {c.name}
                  </Checkbox>
                );
              })}
            </div>
            {/* price filter */}
            <h4 className="text-center mt-4">Filter By Price</h4>
            <div className="d-flex flex-column">
              <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                {Prices?.map((price) => (
                  <div key={price._id}>
                    <Radio value={price.array}>{price.name}</Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>
            <div className="d-flex flex-column">
              <button
                className="btn btn-danger"
                onClick={() => window.location.reload()}
              >
                RESET FILTERS
              </button>
            </div>
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
                  {product?.map((p) => {
                    return (
                      <div 
                        className="card"
                        style={{ width: "18rem", padding:"20px" }}
                        key={p._id}
                      >
                        <img src={`http://localhost:8080/uploads/${p.photo}`} className="card-img-top" alt="jj"  height="150px"
                    width="250px" />
                        <div className="card-body">
                          <h5 className="card-title">{p.name}</h5>
                          <p className="card-text">{p.description}</p>
                          {/* <p className="card-text">value= {p.rating}{p.numReviews}</p> */}
                          {/* <Rating value={p.rating} text={p.numReviews}/> */}
                          <p className="card-text">${p.price}</p>
                        </div>
                        <div className="card-name-price">
                          <button
                            className="btn btn-info ms-1"
                            onClick={() => navigate(`/product/${p._id}`)}
                          >
                            More Details
                          </button>
                          <button
                            className="btn btn-dark ms-1"
                            onClick={()=>handleCart([...cart,p._id])}
                            // onClick={() => {
                              // setCart([...cart, p]);
                            // }}
                          >
                            {/* {localStorage.setItem(
                              "cart",
                              JSON.stringify([...cart, p])
                            )} */}
                            ADD TO CART
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="m-2 p-3">
            {total}
            {product && product.length < total && (
              <button
                className="btn loadmore"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? (
                  "Loading ..."
                ) : (
                  <>
                    {" "}
                    Loadmore <AiOutlineReload />
                  </>
                )}
              </button>
            )}
          </div>
          <div className="m-2 p-3"></div>
        </div>
      </Layout>
    </>
  );
};

export default HomePage;
