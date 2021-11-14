import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:5000/api/resume/";


const getHtml = (guid,resumeId) => {
  
  let header = authHeader();

  return axios
    .get(API_URL + "examplehtml", 
    { 
        params: {
            guid: guid,
            resumeId: resumeId
        },
        headers: header
    })
    .then((response) => {
      return response;
    });
}

const getPdf = (guid) => {
  
  let header = authHeader();

  return axios
    .get(API_URL + "getpdf", 
    { 
        params: {
            guid: guid,
            resumeId: 0,
            save: false
        },
        headers: header
    })
    .then((response) => {
      return response;
    });
}


export default {
    getHtml,
    getPdf
};

