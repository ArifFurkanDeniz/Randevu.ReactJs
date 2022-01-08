import axios from "axios";
import authHeader from "./auth-header";
import getApiRoot from "./api-root";

const API_URL = getApiRoot() +"User/";

const deleteUser = (id) => {
  let header = authHeader();
  let query ='?Id='+id;

  return axios
  .get(API_URL + 'Delete'+ query, { headers: header })
  .then((response) => {
    return response;
  });
}

const savePassword = (user) => {
  let header = authHeader();

  user.userRoles = [];
 

  return axios
  .post(API_URL + 'SavePassword', user, { headers: header })
  .then((response) => {
    return response;
  });
}

const save = (user) => {
  let header = authHeader();

  user.userRoles = [];

  if (user.role!=0) {
    user.userRoles.push(
      {
        "RoleId" : user.role
      });
  }
 

  return axios
  .post(API_URL + 'Save', user, { headers: header })
  .then((response) => {
    return response;
  });
}

const getUser = (id) => {
  debugger;
  let header = authHeader();
  let query ='?Id='+id;

  return axios
  .get(API_URL + 'Get'+ query,  { headers: header })
  .then((response) => {
    return response;
  });
}
const getUsers = (page, fullName) => {
  
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
  let query ='?Page='+page+'&Pagesize='+ pageSize;

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
  deleteUser,
  save,
  savePassword,
  getUser,
  getUsers
};
