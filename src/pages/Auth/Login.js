import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MONGO_URL } from "../../services/Helper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../context/auth";
const Login = () => {
  const navigate= useNavigate()
  const [auth, setAuth] = useAuth();
  
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post(
        `${MONGO_URL}/api/v1/auth/login`,
        values
      );
      if (res.data.status === true) {
        toast.success(res.data && res.data.message);
        setAuth({
          ...auth,
          user: res.data.response,
          token: res.data.response.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate("/")
      } else {
        toast.error(res.data.response.message);
      }
    } catch (error) {
      toast.error("somthing went worng");
    }
  };

  return (
    <Layout title="Register - Ecommer App">
      <div className="form-container ">
        <form onSubmit={handleSubmit} className="login">
          <h4 className="title">LOGIN FORM</h4>
          <div className="mb-3">
            <input
              type="email"
              name="email"
              autoFocus
              onChange={handleInputChange}
              className="form-control"
              placeholder="Enter Your Email "
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              name="password"
              onChange={handleInputChange}
              className="form-control"
              placeholder="Enter Your Password"
              required
            />
          </div>
          <div className="mb-3">
            <button type="button" className="btn forgot-btn">
              Forgot Password
            </button>
          </div>

          <button type="submit" className="btn btn-primary">
            LOGIN
          </button>
        </form>
      </div>
      <ToastContainer />
    </Layout>
  );
};

export default Login;
