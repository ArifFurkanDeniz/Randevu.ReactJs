import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "https://localhost:44376/api/date/";

const deleteDate = (id) => {
  let header = authHeader();
  let query ='?Id='+id;

  return axios
  .get(API_URL + 'Delete'+ query, { headers: header })
  .then((response) => {
    return response;
  });
}

const save = (date) => {
  let header = authHeader();

  return axios
  .post(API_URL + 'Save', date, { headers: header })
  .then((response) => {
    return response;
  });
}


const getDate = (id) => {
  let header = authHeader();
  let query ='?Id='+id;

  return axios
  .get(API_URL + 'Get2'+ query,  { headers: header })
  .then((response) => {
    return response;
  });
}

const getDates = (page,date1,date2,user1,user2,client) => {

  if(user1==0)
  {
    user1=null;
  }

  if(user2==0)
  {
    user2=null;
  }

  if(client=='')
  {
    client=null;
  }

  if(page==0)
  {
    page =1;
  }

  let header = authHeader();
  let query ='?Page='+page+'&Pagesize=50';

  if(date1!=null)
  {
    query += '&Date1=' + date1;
  }

  if(date2!=null)
  {
    query += '&Date2=' + date2;
  }

  if(user1!=null)
  {
    query += '&User1Id=' + user1;
  }

  if(user2!=null)
  {
    query += '&User2Id=' + user2;
  }

  if(client!=null)
  {
    query += '&Client=' + client;
  }

  return axios
    .get(API_URL + 'GetList' + query,  { headers: header })
    .then((response) => {
      return response;
    });
};


export default {
  deleteDate,
  save,
  getDate,
  getDates
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
