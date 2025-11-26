import api from "./apiService";

export const createOrUpdateInvoice = async (payload) => {

  const { id } = payload;

  const { data } = id
    ? await api.put(`/invoice/${payload.id}`, payload)
    : await api.post('/invoice', payload);
  return data;
};


export const deleteInvoice = async (id) => {
  const { data } = await api.delete(`/invoice/${id}`);
  return data;
}