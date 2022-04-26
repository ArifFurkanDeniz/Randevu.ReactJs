import axios from "axios";
import authHeader from "./auth-header";
import getApiRoot from "./api-root";

const API_URL = getApiRoot() +"Profit/";

const ProfitDetail = (date1, date2, user) => {
  
  let query ="";

  if(date1!=null)
  {
    query += 'Date1=' + date1;
  }

  if(date2!=null)
  {
    query += '&Date2=' + date2;
  }
  
  if(user!=null && user!=0)
  {
    query += '&User1Id=' + user;
  }

  let header = authHeader();

  return axios
    .get(API_URL + 'ProfitDetail?' + query,  { headers: header })
    .then((response) => {
      return response;
    });
};

const ProfitTotalDetail = (date1, date2, user) => {
  
  let query ="";

  if(date1!=null)
  {
    query += 'Date1=' + date1;
  }

  if(date2!=null)
  {
    query += '&Date2=' + date2;
  }

  if(user!=null && user!=0)
  {
    query += '&User1Id=' + user;
  }
  
  let header = authHeader();

  return axios
    .get(API_URL + 'ProfitTotalDetail?' + query,  { headers: header })
    .then((response) => {
      return response;
    });
};

const ProfitStatistic = (date1, date2, user) => {
  
  let query ="";

  if(date1!=null)
  {
    query += 'Date1=' + date1;
  }

  if(date2!=null)
  {
    query += '&Date2=' + date2;
  }
  
  if(user!=null && user!=0)
  {
    query += '&User1Id=' + user;
  }

  let header = authHeader();

  return axios
    .get(API_URL + 'ProfitStatistic?' + query,  { headers: header })
    .then((response) => {
      return response;
    });
};

export default {
  ProfitStatistic,
  ProfitDetail,
  ProfitTotalDetail
};
