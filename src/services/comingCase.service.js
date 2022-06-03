import axios from "axios";
import authHeader from "./auth-header";
import getApiRoot from "./api-root";
import tokenControl from "./axios-401-response-interceptor";

tokenControl();

const API_URL = getApiRoot() +"ComingCase/";

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
