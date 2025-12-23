// src/services/userService.js
import api from "./apiService";

export const fetchProfile = async () => {
  const { data } = await api.get("/user/profile");
  return data;
};
