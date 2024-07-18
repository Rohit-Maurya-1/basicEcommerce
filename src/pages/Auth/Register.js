import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MONGO_URL } from "../../services/Helper";
import Layout from "../../components/Layout/Layout";
import axios from "axios";

const Register = () => {
   const navigate = useNavigate();
  const [formError, setFormError] = useState({});
  const [errorSubmit, setErrorSubmit] = useState(false);
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
     setValues({
      ...values,
      [name]: value,
    });
  };

  useEffect(() => {
   if (Object.keys(formError).length === 0 && errorSubmit) {
     }
  }, [errorSubmit]);

  const validate = (value) => {
    const errors = {};
    if (!value.name) {
      errors.name = "userName is required !";
    }

    if (!value.email) {
      errors.email = "email is required !";
    }

    if (!value.password) {
      errors.password = "password is required !";
    }

    if (!value.phone) {
      errors.phone = "phone is required !";
    }
    if (!value.address) {
      errors.address = "address is required !";
    }
    return errors;
  };


 const handleSubmit = async (e) => {
     try {
      e.preventDefault();
      setFormError(validate(values));
      setErrorSubmit(true);
      const res = await axios.post(
        `${MONGO_URL}/api/v1/auth/register`,
        values
      );
      if (res.data.status === true) {
        toast.success(res.data && res.data.message);
        navigate("/login");
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something is wrong");
    }
  };
  return (
    <>
      <Layout>
        <div className="register">
          <form className="bg-grey" onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                onChange={handleInputChange}
                name="name"
                placeholder=" Enter your Name"
                className="form-control"
              />
            </div>
            {formError.name}
            <div className="mb-3">
              <input
              onChange={handleInputChange}
                placeholder="Enter your Email"
                name="email"
                type="email"
                className="form-control"
              />
            </div>
            {formError.email}
            <div className="mb-3">
              <input
              onChange={handleInputChange}
                placeholder="Enter your Password"
                name="password"
                type="password"
                className="form-control"
              />
            </div>
            {formError.password}
            <div className="mb-3">
              <input
                   onChange={handleInputChange}
                placeholder="Enter your Phone"
                name="phone"
                type="number"
                className="form-control"
              />
            </div>
            {formError.phone}
            <div className="mb-3">
              <input
               onChange={handleInputChange}
                placeholder="Enter your Address"
                name="address"
                type="text"
                className="form-control"
              />
            </div>
            {formError?.address}
            <div className="mb-3 form-check">
              <input type="checkbox" className="form-check-input" required />
              <label className="form-check-label" htmlFor="exampleCheck1">
                Check me out
              </label>
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
        {/* <ToastContainer /> */}
      </Layout>
    </>
  );
};
export default Register;
