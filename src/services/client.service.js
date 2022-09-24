import axios from "axios";

const API_URL = "http://localhost:4001/api/inventory/client";

const getAllClients = () => {
  return axios.get(API_URL)
  .then(response => response.data)
};

export { 
    getAllClients 
};
