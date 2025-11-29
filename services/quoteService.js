import api from "./apiService";

export const createQuote = async (credentials) => {
    const { data } = await api.post('/quote', credentials);
  return data;
};


export const deleteQuote = async (id) => {
  const { data } = await api.delete(`/quote/${id}`);
  return data;
}