import axios from "axios";

const API_URL = "http://localhost:4001/api/inventory/product";

const getProducts = async () => {
  return axios.get(API_URL)
  .then((res) => res.data);
};

export { getProducts };
