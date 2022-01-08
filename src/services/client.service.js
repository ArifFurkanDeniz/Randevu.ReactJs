import axios from "axios";
import authHeader from "./auth-header";
import getApiRoot from "./api-root";

const API_URL = getApiRoot() +"Client/";

const deleteDate = (id) => {
  let header = authHeader();
  let query ='?Id='+id;

  return axios
  .get(API_URL + 'Delete'+ query, { headers: header })
  .then((response) => {
    return response;
  });
}

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

const getClients = (page, fullName, year, month, IsOrderText = false) => {
  
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
  let query ='?Page='+page+'&Pagesize='+pageSize + '&IsOrderText='+IsOrderText;

  if(fullName!=null)
  {
    query += '&FullName=' + fullName;
  }
  if (year != null) {
    query += '&Year=' + year;
  }
  if (month != null) {
    query += '&Month=' + month;
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
  getClients,
  deleteDate
};
