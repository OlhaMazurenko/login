import axios from "axios";

/**
 * Create axios instance.
 *
 * @type {AxiosInstance}
 */

const axiosInstance = (() => {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "API-KEY": "bdc15094-3805-44cb-ae3d-797e42b4a8d3"
  };
  return axios.create({
    baseURL: `https://reqres.in/`,
    headers: headers
  });
})();

axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem("token");
    if (
      token &&
      token !== null &&
      (window.location.pathname !== "/auth/login-page" ||
        window.location.pathname !== "/auth/register-page")
    ) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (
      error.response &&
      error.response.data &&
      error.response.data.message === "token.expired"
    ) {
      localStorage.removeItem("token");
      window.location.assign("/auth/login-page");
    }
    if (
      error.response &&
      error.response.status &&
      error.response.status === 401 &&
      (window.location.pathname !== "/auth/login-page" ||
        window.location.pathname !== "/auth/register-page")
    ) {
      window.location.assign("/auth/login-page");
    }

    if (
      error.response &&
      error.response.status &&
      error.response.status === 404
    ) {
      window.location.assign("/404");
    }
    if (
      error.response &&
      error.response.status &&
      error.response.status === 500
    ) {
      window.location.assign("/500");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
