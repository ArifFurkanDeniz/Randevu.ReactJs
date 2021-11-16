import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "https://localhost:44376/api/ComingCase/";

const getComingCases = () => {
  
  let header = authHeader();


  return axios
    .get(API_URL + 'GetList',  { headers: header })
    .then((response) => {
      return response;
    });
};


export default {
  getComingCases
};
