import axios from "axios";
import authHeader from "./auth-header"

const API_URL = "http://localhost:5000/api/home/";


const getdashboard = () => {
  
  let header = authHeader();

  return axios
    .get(API_URL + "getdashboard" ,  { headers: header })
    .then((response) => {
      return response;
    });
};


export default {
    getdashboard
};