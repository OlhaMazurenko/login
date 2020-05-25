import axiosInstance from "../request";

export const registerApi = data => {
  return axiosInstance.post(`/api/register`, data);
}
