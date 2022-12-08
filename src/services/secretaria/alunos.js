import api from 'services';

export const getAlunos = async () => {
  try {
    const response = await api.get('');
    return response.data;
  } catch (error) {
    throw new Error('Houve um problema com a chamada');
  }
};

export const getAluno = async () => {
  try {
    const response = await api.get('');
    return response.data;
  } catch (error) {
    throw new Error('Houve um problema com a chamada');
  }
};

export const createAluno = async (data) => {
  try {
    const response = await api.post('', data);
    return response.data;
  } catch (error) {
    throw new Error('Ouve um problema com a chamada ');
  }
}

export const editAluno = async ({ id, data }) => {
  try {
    const response = await api.put(`/${id}`, data);
    return response.data;
  } catch (error) {
    throw new Error('Ouve um problema com a chamada ');
  }
}

export const deleteAluno = async (id) => {
  try {
    const response = await api.delete(`/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Ouve um problema com a chamada ');
  }
}