import api from 'services';

export const getAllProducts = async (filter) => {
  try {
    const response = await api.get('/lunchs/products', { params: filter });

    return response.data;
  } catch (error) {
    throw new Error('Ouve um problema com a chamada ');
  }
};

export const createProduct = async (data) => {
  try {
    const response = await api.post('/lunchs/products', data);

    return response.data;
  } catch (error) {
    throw new Error('Ouve um problema com a chamada ');
  }
};
