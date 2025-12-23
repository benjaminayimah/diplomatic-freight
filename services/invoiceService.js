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

export const createOrGenerateReceipt = async (payload) => {
  const { data } =  await api.post('/receipt', payload);
  return data;
};

export const deleteReceipt = async (id) => {
  const { data } = await api.delete(`/receipt/${id}`);
  return data;
}
