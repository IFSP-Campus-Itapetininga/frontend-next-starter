import api from 'services';

export const getMatriculas = async () => {
  try {
    const response = await api.get('');
    return response.data;
  } catch (error) {
    throw new Error('Houve um problema com a chamada');
  }
};

export const getMatricula = async () => {
  try {
    const response = await api.get('');
    return response.data;
  } catch (error) {
    throw new Error('Houve um problema com a chamada');
  }
};

export const createMatricula = async (data) => {
  try {
    const response = await api.post('', data);
    return response.data;
  } catch (error) {
    throw new Error('Ouve um problema com a chamada ');
  }
}

export const editMatricula = async ({ id, data }) => {
  try {
    const response = await api.put(`/${id}`, data);
    return response.data;
  } catch (error) {
    throw new Error('Ouve um problema com a chamada ');
  }
}

export const deleteMatricula = async (id) => {
  try {
    const response = await api.delete(`/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Ouve um problema com a chamada ');
  }
}