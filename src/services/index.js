import axios from 'axios';

export * from './marmita';
export * from './secretaria';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

export default api;
