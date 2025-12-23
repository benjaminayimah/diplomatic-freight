// src/services/authService.js
import api from "./apiService";

export const loginUser = async (payload) => {
  const { data } = await api.post("/auth/login", payload);
  return data;
};

// export const registerUser = async (payload) => {
//   const { data } = await api.post("/auth/register", payload);
//   return data;
// };


export const updateUser = async (payload, id) => {
  const { data } = await api.put(`/auth/${id}`, payload);
  return data;
};

export const updatePassword = async (payload) => {
  const { data } = await api.post('/auth/update-password', payload);
  return data;
};

export const updateCompanyProfile = async (payload, id) => {
  const { data } = await api.put(`/profile/${id}`, payload);
  return data;
};

export const createOrUpdateBank = async (payload) => {

  const { id } = payload;

  const { data } = id
    ? await api.put(`/bank/${payload.id}`, payload)
    : await api.post('/bank', payload);
  return data;
};


export const deleteBankAccount = async (id) => {
  const { data } = await api.delete(`/bank/${id}`);
  return data;
}


export const logoutUser = async () => {
  const { data } = await api.post("/auth/logout");
  return data;
};
