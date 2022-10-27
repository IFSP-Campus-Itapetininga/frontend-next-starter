import api from 'services';

export const createProduct = async (data) => {
  try {
    const response = await api.post('/product', data);

    return response.data;
  } catch (error) {
    throw new Error('Ouve um problema com a chamada ');
  }
};
