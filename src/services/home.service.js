import axios from "axios";
import authHeader from "./auth-header"
import getApiRoot from "./api-root";

const API_URL = getApiRoot() +"home/";


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