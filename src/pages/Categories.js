import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Layout from "../components/Layout/Layout";
import useCategory from './../components/hooks/useCotegory';


const Categories = () => {
  const categories = useCategory();
  return (
    <Layout title={"All Categories"}>
      <div className="container" style={{ marginTop: "100px" }}>
        <div className="row container">
          <h1>Select Category</h1>
          {categories.map((c) => (
       
            <div className="col-md-4 mt-5 mb-3 gx-3 gy-3" key={c._id}>
              <div className="card">
            
                 <Link to={`/categoryList/${c._id}`} className="btn cat-btn">
                  <div style={{backgroundColor:"black",color:"white",height:"23px",paddingBottom:"30px"}}>{c.name}</div> 
                 </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
