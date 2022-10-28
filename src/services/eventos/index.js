import api from 'services';

export const getEvents = async () => {
  const response = await api.get('/events');

  return response.data;
};

export const create = async (data) => {
  const response = await api.post('/events', data);

  return response.data;
};

export const destroy = async (id) => {
  const response = await api.delete(`/events/${id}`);

  return response.data;
};

export const update = async (id, data) => {
  const response = await api.put(`/events/${id}`, data);

  return response.data;
};
