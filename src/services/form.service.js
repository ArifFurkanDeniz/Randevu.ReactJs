import axios from "axios";
import authHeader from "./auth-header";

import getApiRoot from "./api-root";

const API_URL = getApiRoot() +"Form/";

const getForms = () => {
  
  let header = authHeader();

  return axios
    .get(API_URL + "?$expand=WebUser($select=FullName),Resume($select=Title)&$filter=StatusId eq 1&$Select=Id,FormName,Guid,CreatedDate&$orderby=Id desc", { headers: header })
    .then((response) => {
      return response;
    });
};


export default {
  getForms
};

// const API_URL = "http://localhost:8080/api/test/";

// const getPublicContent = () => {
//   return axios.get(API_URL + "all");
// };

// const getUserBoard = () => {
//   return axios.get(API_URL + "user", { headers: authHeader() });
// };

// const getModeratorBoard = () => {
//   return axios.get(API_URL + "mod", { headers: authHeader() });
// };

// const getAdminBoard = () => {
//   return axios.get(API_URL + "admin", { headers: authHeader() });
// };

// export default {
//   getPublicContent,
//   getUserBoard,
//   getModeratorBoard,
//   getAdminBoard,
// };

//http://localhost:5000/api/WebUser?$expand=AppPurchases($select=StatusId)&$filter=StatusId%20eq%201&$Select=Id,FullName,Email,TypeId,GoogleId,StatusId
