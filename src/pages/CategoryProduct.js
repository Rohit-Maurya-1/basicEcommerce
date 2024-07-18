import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios';
import {MONGO_URL} from "../services/Helper"
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import "../App.css"
import Categories from './Categories';
const CategoryProduct = () => {
    const{id}=useParams()
    const[productCategory,setProductCategory]=useState([])
    const getProductByCate = async () => {
        try {
          const { data } = await axios.get(`${MONGO_URL}/api/v1/product/getProductByCate/${id}`);
           setProductCategory(data?.product);
        } catch (error) {
          console.log(error);
        }
      };
      useEffect(() => {
        getProductByCate();
      },[]);

  return (
    // 
  <Layout>
       <div className='container'>
        <div className='row' >
          <h1>Categories Details</h1>
        <div className='col-12' style={{display:"contents", justifyContent:"space-between"}}>
          {productCategory.map((p) => {
                  return (
                   <Link to="">
                      <div 
                        className="card"
                        style={{ width: "18rem" }}
                        key={p._id}
                      >  <img src={`http://localhost:8080/uploads/${p.photo}`} height="150px" width="250px"  className="card-img-top" alt="..." />
                          <div className="card-body">
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
         
         {/* </div> */}
    </Layout>
  )
}

export default CategoryProduct