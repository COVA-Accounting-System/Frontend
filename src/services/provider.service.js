import axios from "axios";

const API_URL = "http://localhost:4001/api/inventory/provider";

const getProviders = () => {
  return axios.get(API_URL)
  .then((res) => res.data);
};

export { getProviders };