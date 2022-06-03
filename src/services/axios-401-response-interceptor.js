import axios from "axios";

// Add a 401 response interceptor
export default function tokenControl() {
axios.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    if (401 === error.response.status) {
      localStorage.removeItem("user");
      window.location="/#/login";
    } else {
       // return Promise.reject(error);
    }
  });
}

