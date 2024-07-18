import { useState, useEffect } from "react";
import {MONGO_URL} from "../../services/Helper"
import axios from "axios";

export default function useCategory() {
  const [categories, setCategories] = useState([]);

  //=====================================================get categories================================================
  const getCategories = async () => {
    try {
      const { data } = await axios.get(`${MONGO_URL}/api/v1/category/get-category`);
      setCategories(data?.category);
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    getCategories();
  }, []);

  return categories;
}
