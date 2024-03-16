import { ApiManage } from "./ApiManage.js";

import axios from "axios";
// import { refreshAuthenticated } from "./refreshAuthenticated.js";

// Vue.prototype.$axios = axios
// ^ ^ ^ this will allow you to use this.$axios
//       so you won't necessarily have to import axios in each vue file

const api = axios.create({
  baseURL: new ApiManage().baseUrl,
  headers: {
    Accept: "application/json",
  },
});
// if (localStorage.getItem("token") != null) {
//   api.defaults.headers.common["Authorization"] =
//     "Bearer " + localStorage.getItem("token");
// }
// Vue.prototype.$api = api
// ^ ^ ^ this will allow you to use this.$api
//       so you can easily perform requests against your app's API

// Response interceptor for API calls

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    // console.log('ici.............');

    const originalRequest = error.config;
    if (
      (error.response.status === 403 || error.response.status === 401) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      await refreshAuthenticated();

      return api(originalRequest);
    }
    return Promise.reject(error);
  }
);

// import router from '../router';
const refreshAuthenticated = async () => {
  const apiR = axios.create({ baseURL: new ApiManage().baseUrl });
  // if (
  //   VueCookies.get('refreshToken') != undefined &&
  //   VueCookies.get('refreshToken') != 'undefined'
  // ) {
  console.log(
    "ici  *******",
    localStorage.getItem("refreshToken"),
    localStorage.getItem("refreshToken")
  );
  await apiR
    .post("/api/token/refresh", {
      refreshToken: localStorage.getItem("refreshToken"),
    })
    .then((response) => {
      console.log("status", response.status);

      if (response.status == 201 || response.status == 200) {
        console.log("token", String(response.data.token));
        localStorage.setItem("token", String(response.data.token));

        localStorage.setItem(
          "refreshToken",
          String(response.data.refreshToken)
        );
        api.defaults.headers.delete;
        api.defaults.headers.delete["Authorization"];
        api.defaults.headers.common["Authorization"] =
          "Bearer " + String(response.data.token);
      }
    })
    .catch((e) => {
      console.log(e);
      if (e.response.status === 403 || e.response.status === 401) {
        //  router.push({ name: 'Signin' });
      }
    });
  // }
  // else {
  //         // router.push({ name: 'Signin' });
  // }
};
const delette = () => {
  delete axios.defaults.headers.common["Authorization"];
};
export { axios, api, delette };
