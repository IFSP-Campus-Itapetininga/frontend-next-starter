import api from 'services';

export const getAllMarmitaClients = async ({ filter, token }) => {
  try {
    const response = await api.get('/lunchs/clients', {
      params: filter,
      headers: { authorization: `Bearear ${token}` },
    });

    return response.data;
  } catch (error) {
    throw new Error('Ouve um problema com a chamada ');
  }
};

export const getMarmitaClient = async (id) => {
  try {
    const response = await api.get(`/lunchs/clients/${id}`);

    return response.data;
  } catch (error) {
    throw new Error('Ouve um problema com a chamada ');
  }
};

export const getMarmitaClientByPhone = async ({ search, token }) => {
  try {
    const response = await api.get(`/lunchs/clients/phone`, {
      params: { search },
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error('Ouve um problema com a chamada ');
  }
};

export const createMarmitaClient = async (data) => {
  try {
    const response = await api.post('/lunchs/clients', data);

    return response.data;
  } catch (error) {
    throw new Error('Ouve um problema com a chamada ');
  }
};

export const editMarmitaClient = async ({ id, data }) => {
  try {
    const response = await api.put(`/lunchs/clients/${id}`, data);

    return response.data;
  } catch (error) {
    throw new Error('Ouve um problema com a chamada ');
  }
};
export const deleteMarmitaClient = async (id) => {
  try {
    const response = await api.delete(`/lunchs/clients/${id}`);

    return response.data;
  } catch (error) {
    throw new Error('Ouve um problema com a chamada ');
  }
};
