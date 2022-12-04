import { format } from 'date-fns';
import api from 'services';

export const getMarmitaStatistics = async ({ filter, token }) => {
  try {
    const payload = {
      initial_date: format(filter.initial_date, 'yyyy-MM-dd'),
      final_date: format(filter.final_date, 'yyyy-MM-dd'),
    };
    const response = await api.get('/lunchs/statistics', {
      params: payload,
      headers: { authorization: `Bearear ${token}` },
    });

    return response.data;
  } catch (error) {
    throw new Error('Ouve um problema com a chamada ');
  }
};
