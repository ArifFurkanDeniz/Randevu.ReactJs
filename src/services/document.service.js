import axios from "axios";
import authHeader from "./auth-header";
import getApiRoot from "./api-root";
import tokenControl from "./axios-401-response-interceptor";

tokenControl();

const API_URL = getApiRoot() +"Document/";


const getDocuments = (name) => {
  let header = authHeader();
  let query ='?Path=' + name;

  return axios
  .get(API_URL + 'GetDocuments'+ query, { headers: header })
  .then((response) => {
    return response;
  });
}

const deleteDocument = (name) => {
  let header = authHeader();
  let query ='?publicId=' + name;

  return axios
  .get(API_URL + 'DeleteDocument'+ query, { headers: header })
  .then((response) => {
    return response;
  });
}

const getFolders = (name) => {
  let header = authHeader();
  let query ='?Name=' + name;

  return axios
  .get(API_URL + 'GetFolders'+ query, { headers: header })
  .then((response) => {
    return response;
  });
}



const createFolder = (request) => {
  let header = authHeader();

  return axios
  .post(API_URL + 'CreateFolder', request, { headers: header })
  .then((response) => {
    return response;
  });
}

const deleteFolder = (name) => {
  let header = authHeader();
  let query ='?Folder=' + name;

  return axios
  .get(API_URL + 'DeleteFolder'+ query, { headers: header })
  .then((response) => {
    return response;
  });
}

const upload = (request) => {
  let header = authHeader();

  return axios
  .post(API_URL + 'Upload', request, { headers: header })
  .then((response) => {
    return response;
  });
}

export default {
  getDocuments,
  deleteDocument,
  getFolders,
  createFolder,
  deleteFolder,
  upload,
};
