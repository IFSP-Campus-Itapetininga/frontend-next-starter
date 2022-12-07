import api from 'services';

export const getResponsavels = async () => {
  try {
    const response = await api.get('');
    return response.data;
  } catch (error) {
    throw new Error('Houve um problema com a chamada');
  }
};

export const getResponsavel = async () => {
  try {
    const response = await api.get('');
    return response.data;
  } catch (error) {
    throw new Error('Houve um problema com a chamada');
  }
};

export const createResponsavel = async (data) => {
  try {
    const response = await api.post('', data);
    return response.data;
  } catch (error) {
    throw new Error('Ouve um problema com a chamada ');
  }
}

export const editResponsavel = async ({ id, data }) => {
  try {
    const response = await api.put(`/${id}`, data);
    return response.data;
  } catch (error) {
    throw new Error('Ouve um problema com a chamada ');
  }
}

export const deleteResponsavel = async (id) => {
  try {
    const response = await api.delete(`/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Ouve um problema com a chamada ');
  }
}