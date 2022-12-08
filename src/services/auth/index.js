import axios from 'axios';

export const createSession = async (data) => {
  const response = await axios.post('/api/session', data);

  return response.data;
};
