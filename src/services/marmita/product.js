import api from 'services';

export const getAllMarmitaProducts = async (filter) => {
  try {
    const response = await api.get('/lunchs/products', { params: filter });

    return response.data;
  } catch (error) {
    throw new Error('Ouve um problema com a chamada ');
  }
};

export const getMarmitaProduct = async (id) => {
  try {
    const response = await api.get(`/lunchs/products/${id}`);

    return response.data;
  } catch (error) {
    throw new Error('Ouve um problema com a chamada ');
  }
};

export const createMarmitaProduct = async (data) => {
  try {
    const response = await api.post('/lunchs/products', data);

    return response.data;
  } catch (error) {
    throw new Error('Ouve um problema com a chamada ');
  }
};

export const editMarmitaProduct = async ({ id, data }) => {
  try {
    const response = await api.put(`/lunchs/products/${id}`, data);

    return response.data;
  } catch (error) {
    throw new Error('Ouve um problema com a chamada ');
  }
};
export const deleteMarmitaProduct = async (id) => {
  try {
    const response = await api.delete(`/lunchs/products/${id}`);

    return response.data;
  } catch (error) {
    throw new Error('Ouve um problema com a chamada ');
  }
};
