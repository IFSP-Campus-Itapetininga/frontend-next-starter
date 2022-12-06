import api from 'services';

export const getChamadas = async () => {
  try {
    const response = await api.get('');
    return response.data;
  } catch (error) {
    throw new Error('Houve um problema com a Chamadas');
  }
};

export const getChamada = async () => {
  try {
    const response = await api.get('');
    return response.data;
  } catch (error) {
    throw new Error('Houve um problema com a Chamadas');
  }
};

export const createChamada = async (data) => {
  try {
    const response = await api.post('', data);
    return response.data;
  } catch (error) {
    throw new Error('Ouve um problema com a Chamadas ');
  }
}

export const editChamada = async ({ id, data }) => {
  try {
    const response = await api.put(`/${id}`, data);
    return response.data;
  } catch (error) {
    throw new Error('Ouve um problema com a Chamadas ');
  }
}

export const deleteChamada = async (id) => {
  try {
    const response = await api.delete(`/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Ouve um problema com a Chamadas ');
  }
}