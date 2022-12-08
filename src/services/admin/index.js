import { getCookie } from 'cookies-next';
import api from 'services';

export const list = async (token) => {
  const response = await api.get('/users', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const find = async (id, token) => {
  const response = await api.get(`/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export const create = async (data, token) => {
  const response = await api.post('/users', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export const destroy = async (id, token) => {
  const response = await api.delete(`/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export const updatePassword = async (id, data, token) => {
  const response = await api.patch(`/users/${id}/password`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export const update = async (id, data, token) => {
  const response = await api.put(`/users/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
