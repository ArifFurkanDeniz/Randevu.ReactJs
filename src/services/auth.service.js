import axios from "axios";
import getApiRoot from "./api-root";

const API_URL = getApiRoot() +"Account/";

// const register = (username, email, password) => {
//   return axios.post(API_URL + "signup", {
//     username,
//     email,
//     password,
//   });
// };


const login = (email, password) => {
  return axios
    .post(API_URL + "login", {
        email,
      password,
    })
    .then((response) => {
  //      console.log(response);
      if (response.data.status == true) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export default {
  //register,
  login,
  logout,
  getCurrentUser,
};