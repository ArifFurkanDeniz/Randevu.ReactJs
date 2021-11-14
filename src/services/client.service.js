import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "https://localhost:44376/api/Client/";

const save = (client) => {
  let header = authHeader();

  return axios
  .post(API_URL + 'Save', client, { headers: header })
  .then((response) => {
    return response;
  });
}

const getClient = (id) => {
  debugger;
  let header = authHeader();
  let query ='?Id='+id;

  return axios
  .get(API_URL + 'Get'+ query,  { headers: header })
  .then((response) => {
    return response;
  });
}

const getClients = (page, fullName) => {
  
  let pageSize = 20;
  if(page==0)
  {
    page =1;
  }
  else if(page==undefined)
  {
    page = 1;
    pageSize = 1000;
  }

  if(fullName=='')
  {
    fullName=null;
  }

  let header = authHeader();
  let query ='?Page='+page+'&Pagesize='+pageSize;

  if(fullName!=null)
  {
    query += '&FullName=' + fullName;
  }

  return axios
    .get(API_URL + 'GetList'+ query,  { headers: header })
    .then((response) => {
      return response;
    });
};


export default {
  save,
  getClient,
  getClients
};
