import Layout from '../../components/Layout/Layout'
import React, { useEffect, useState } from 'react'
import UserMenu from '../../components/Layout/UserMenu'
import { useAuth } from '../../context/auth'
//=========================================userProfile======================
const Profile = () => {
    const[auth,setAuth]=useAuth()
    const[values,setValues]=useState({
        name:"",
        email:"",
        phone:"",
        address:""
      })
     const handleChange=(e)=>{
        const{name,value}=e.target
        setValues({
            ...values,
            [name]:value
        })
     }
     useEffect(()=>{
           const{name,email,phone,address}=auth?.user
         setValues({name:name,email:email,phone:phone,address:address})
     },[])
    
    
     const handleSubmit=(e)=>{
            e.preventDefault()

      }
    return(
    <Layout title={"Your Profile"}>
    <div className="container-fluid dashboard" style={{height:"340px"}}>
      <div className="row">
        <h1 style={{textAlign:"center"}}>USER DASHBOARD</h1>
        <div className="col-md-3">
          <UserMenu/>
        </div>
        <div className="col-md-8">
          <div className="form-container">
            <form onSubmit={handleSubmit}>
              <h4 className="title">USER PROFILE</h4>
              <div className="mb-3">
                <input
                  type="text"
                  value={values?.name}
                  onChange={handleChange}
                  className="form-control"
                  name="name"
                  placeholder="Enter Your Name"
                  autoFocus
                />
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  value={values?.email}
                  onChange={handleChange}
                  className="form-control"
                  name="email"
                  placeholder="Enter Your Email "
              />
              </div>
             
              <div className="mb-3">
                <input
                  type="text"
                  value={values?.phone}
                  onChange={handleChange}
                  className="form-control"
                  name="phone"
                  placeholder="Enter Your Phone"
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={values?.address}
                  onChange={handleChange}
                  name="address"
                  placeholder="Enter Your Address"
                />
              </div>

              <button type="submit" className="btn btn-primary">
                UPDATE
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </Layout>
    )
}



export default Profile