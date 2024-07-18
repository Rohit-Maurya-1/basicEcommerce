import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Select } from "antd";
import { MONGO_URL } from "../../services/Helper";

const { Option } = Select;
const CreateProduct = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [catergories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState();
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
  });
  const handleChange = (e) =>{
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const handleImageChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${MONGO_URL}/api/v1/category/get-category`,
        {
          headers: {
            auth: auth?.token,
          },
        }
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wwent wrong in getting catgeory");
    }
  };
  useEffect(() => {
    getAllCategory();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("price", values.price);
      formData.append("quantity", values.quantity);
      formData.append("shipping", shipping);
      formData.append("imageData", photo);
      formData.append("category", category);
      const { data } = await axios.post(
        `${MONGO_URL}/api/v1/product/create-product`,
        formData
      );
      if (data.status == true);
      {
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>CreateProduct</h1>
            <div className="p-3 w-50">
              <Select
                bordered={false}
                placeholder="select a category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setCategory(value);
                }}
              >
                {catergories?.map((c) => {
                  return (
                    <Option key={c?._id} value={c._id}>
                      {c.name}
                    </Option>
                  );
                })}
              </Select>
              <div className="mb-3">
                <label className="btn btn-ouline-secondary col-md-12">
                  {photo ? photo.name : "upload image"}
                  <input
                    type="file"
                    name="photo"
                    accept="/image/*"
                    onChange={handleImageChange}
                    hidden
                  />
                </label>
              </div>
              {photo && (
                <div className="imagethumb--items text-center">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="product_photo"
                    height="150px"
                    width="250px"
                  />
                </div>
              )}
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="enter name"
                  name="name"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <textarea
                  type="text"
                  className="form-control"
                  placeholder="enter description"
                  name="description"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  className="form-control"
                  placeholder="enter price"
                  name="price"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  className="form-control"
                  placeholder="enter quantity"
                  name="quantity"
                  onChange={handleChange}
                />
              </div>

              <div>
                <Select
                  type="text"
                  bordered={false}
                  placeholder="select a category"
                  size="large"
                  value={shipping}
                  className="form-select mb-3"
                  name="shipping"
                  onChange={(values) => {
                    setShipping(values);
                  }}
                >
                  <Option value={0}>Yes</Option>
                  <Option value={1}>No</Option>
                </Select>
              </div>
              <div>
                <button className="btn btn-primary" onClick={handleCreate}>
                  CREATE PRODUCT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
