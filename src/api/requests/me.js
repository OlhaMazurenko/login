import axiosInstance from "../request";

export const getProfile = () => {
  return axiosInstance.get(`/api/users/2`);
};

export const editProfile = (id, data) => {
  return axiosInstance.patch(`/api/users/${id}`, data);
};
