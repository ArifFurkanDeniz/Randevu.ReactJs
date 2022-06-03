import axios from "axios";
import authHeader from "./auth-header";
import getApiRoot from "./api-root";
import tokenControl from "./axios-401-response-interceptor";

tokenControl();

const API_URL = getApiRoot() +"Room/";

const deleteUser = (id) => {
  let header = authHeader();
  let query ='?Id='+id;

  return axios
  .get(API_URL + 'Delete'+ query, { headers: header })
  .then((response) => {
    return response;
  });
}

const save = (room) => {
  let header = authHeader();

  return axios
  .post(API_URL + 'Save', room, { headers: header })
  .then((response) => {
    return response;
  });
}

const getRoom = (id) => {
  debugger;
  let header = authHeader();
  let query ='?Id='+id;

  return axios
  .get(API_URL + 'Get'+ query,  { headers: header })
  .then((response) => {
    return response;
  });
}

const getRooms = (page, title) => {
  
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

  if(title=='')
  {
    title=null;
  }

  let header = authHeader();
  let query ='?Page='+page+'&Pagesize='+pageSize;

  if(title!=null)
  {
    query += '&Title=' + title;
  }

  return axios
    .get(API_URL + 'GetList'+ query,  { headers: header })
    .then((response) => {
      return response;
    });
};


export default {
  deleteUser,
  save,
  getRoom,
  getRooms
};
