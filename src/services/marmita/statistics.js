import api from 'services';

export const getMarmitaStatistics = async (filter) => {
  try {
    const response = await api.get('/lunchs/statistics', { params: filter });

    return response.data;
  } catch (error) {
    throw new Error('Ouve um problema com a chamada ');
  }
};
