import api from "./apiService";

export const createSubscriber = async (credentials) => {
    const { data } = await api.post('/subscriber', credentials);
  return data;
};


export const deleteSubscriber = async (id) => {
  const { data } = await api.delete(`/subscriber/${id}`);
  return data;
}