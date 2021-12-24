import axios from "axios";
import authHeader from "./auth-header";
import getApiRoot from "./api-root";

const API_URL = getApiRoot() +"Dashboard/";

const UserClientStatistic = (data) => {
  debugger;
  let query ="userId="+data.id;

  let header = authHeader();

  return axios
    .get(API_URL + 'UserClientStatistic?' + query,  { headers: header })
    .then((response) => {
      return response;
    });
};

const DateDayStatistic = (date1, date2) => {
  
  let query ="";

  if(date1!=null)
  {
    query += 'Date1=' + date1;
  }

  if(date2!=null)
  {
    query += '&Date2=' + date2;
  }

  let header = authHeader();

  return axios
    .get(API_URL + 'DateDayStatistic?' + query,  { headers: header })
    .then((response) => {
      return response;
    });
};

const DateHourStatistic = (date1, date2) => {
  
  let query ="";

  if(date1!=null)
  {
    query += 'Date1=' + date1;
  }

  if(date2!=null)
  {
    query += '&Date2=' + date2;
  }


  let header = authHeader();

  return axios
    .get(API_URL + 'DateHourStatistic?' + query,  { headers: header })
    .then((response) => {
      return response;
    });
};

const UserStatistic = (date1, date2) => {
  
  let query ="";

  if(date1!=null)
  {
    query += 'Date1=' + date1;
  }

  if(date2!=null)
  {
    query += '&Date2=' + date2;
  }


  let header = authHeader();

  return axios
    .get(API_URL + 'UserStatistic?' + query,  { headers: header })
    .then((response) => {
      return response;
    });
};

const TownStatistic = (date1, date2) => {
  
  let query ="";

  if(date1!=null)
  {
    query += 'Date1=' + date1;
  }

  if(date2!=null)
  {
    query += '&Date2=' + date2;
  }


  let header = authHeader();

  return axios
    .get(API_URL + 'TownStatistic?' + query,  { headers: header })
    .then((response) => {
      return response;
    });
};


const SexStatistic = (date1, date2) => {
  
  let query ="";

  if(date1!=null)
  {
    query += 'Date1=' + date1;
  }

  if(date2!=null)
  {
    query += '&Date2=' + date2;
  }

  let header = authHeader();

  return axios
    .get(API_URL + 'SexStatistic?' + query,  { headers: header })
    .then((response) => {
      return response;
    });
};

const DirectionalStatistic = (date1, date2) => {
  
  let query ="";

  if(date1!=null)
  {
    query += 'Date1=' + date1;
  }

  if(date2!=null)
  {
    query += '&Date2=' + date2;
  }

  let header = authHeader();

  return axios
    .get(API_URL + 'DirectionalStatistic?' + query,  { headers: header })
    .then((response) => {
      return response;
    });
};
export default {
  DateDayStatistic,
  DateHourStatistic,
  UserStatistic,
  TownStatistic,
  SexStatistic,
  DirectionalStatistic,
  UserClientStatistic
};
