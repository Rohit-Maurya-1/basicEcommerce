import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import { MONGO_URL } from "../../services/Helper";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Select } from "antd";

const { Option } = Select;
const UpdateProduct = () => {

  const navigate = useNavigate();
  const { _id } = useParams();
   const [auth, setAuth] = useAuth();
  const [catergories, setCategories] = useState([]);
  const [catergory, setCategory] = useState("");
  const [product,setProduct]=useState([])
  const [shipping, setShipping] = useState("");
   const [photo, setPhoto] = useState();
  const [preview, setPreveiw] = useState();
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
  });

  const handleChange = (e) => {
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
  //=================================================================================================
  const getProduct = async () => {
    try {
      const data = await axios.get(
        `${MONGO_URL}/api/v1/product/get-Produts/${_id}`
      );
      const res = data.data.response;
      const findData = res.find((item) => {
        return item._id === _id;
      });
      setProduct(findData)
      } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProduct();
    if(photo){
      setPreveiw(URL.createObjectURL(photo))
     }
  }, [_id,photo]);
 const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("price", values.price);
      formData.append("quantity", values.quantity);
      formData.append("shipping", shipping);
      formData.append("imageData", photo);
      formData.append("category", catergory);
      const { data } = await axios.patch(
        `http://localhost:8080/api/v1/product/UpdateProductController/${_id}`,
        formData
      );
      if (data.status == true);
      {
        // setProduct(data)
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
            <h1>UpdateProduct</h1>
            <div className="p-3 w-50">
              <Select
                bordered={false}
                // value={product?.category?.name}
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
               {(photo||product?.photo) && (
                <div className="imagethumb--items text-center">
                  <img
                    src={photo ? preview:`http://localhost:8080/uploads/${product?.photo}`}
                    alt="product_photo"
                    height="150px"
                    width="250px"
                  />
                </div>
              )}
              <div className="mb-3">
                <input
                  type="text"
                  defaultValue={product?.name}
                  className="form-control"
                  placeholder="enter name"
                  name="name"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <textarea
                  type="text"
                  defaultValue={product?.description}
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
                  defaultValue={product?.price}
                  placeholder="enter price"
                  name="price"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  className="form-control"
                  defaultValue={product?.quantity}
                  placeholder="enter quantity"
                  name="quantity"
                  onChange={handleChange}
                />
              </div>
               <div>
                <Select
                  type="text"
                  bordered={false}
                  defaultValue={product?.shipping}
                  placeholder="select a category"
                  size="large"
                  className="form-select mb-3"
                  name="shipping"
                  onChange={(values) => {
                    setShipping(values);
                  }}
                    value={shipping? "No":"Yes"}
                >
                  <Option value={0}>Yes</Option>
                  <Option value={1}>No</Option>
                </Select>
              </div>
              <div>
                <button  onClick={handleUpdate}className="btn btn-primary">
                  UPDATE PRODUCT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default UpdateProduct;
