import { format } from 'date-fns';
import api from 'services';

export const getMarmitaStatistics = async ({ initial_date, final_date }) => {
  try {
    const payload = {
      initial_date: format(initial_date, 'yyyy-MM-dd'),
      final_date: format(final_date, 'yyyy-MM-dd'),
    };
    const response = await api.get('/lunchs/statistics', { params: payload });

    return response.data;
  } catch (error) {
    throw new Error('Ouve um problema com a chamada ');
  }
};
