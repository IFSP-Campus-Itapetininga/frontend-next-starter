import api from 'services';

export const getAtividades = async () => {
  try {
    const response = await api.get('');
    return response.data;
  } catch (error) {
    throw new Error('Houve um problema com a chamada');
  }
};

export const getAtividade = async () => {
  try {
    const response = await api.get('');
    return response.data;
  } catch (error) {
    throw new Error('Houve um problema com a chamada');
  }
};

export const createAtividade = async (data) => {
  try {
    const response = await api.post('', data);
    return response.data;
  } catch (error) {
    throw new Error('Ouve um problema com a chamada ');
  }
}

export const editAtividade = async ({ id, data }) => {
  try {
    const response = await api.put(`/${id}`, data);
    return response.data;
  } catch (error) {
    throw new Error('Ouve um problema com a chamada ');
  }
}

export const deleteAtividade = async (id) => {
  try {
    const response = await api.delete(`/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Ouve um problema com a chamada ');
  }
}