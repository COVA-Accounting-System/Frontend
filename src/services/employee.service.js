import axios from "axios";

const API_URL = "http://localhost:4001/api/inventory/employee";

const getAllEmployees = () => {
    return axios.get(API_URL)
    .then(employee => employee.data)
}


export { getAllEmployees }