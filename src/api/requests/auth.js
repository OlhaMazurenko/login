import axiosInstance from "../request";

export const logInApi = data => {
  return axiosInstance.post(`/api/login`, data);
};
