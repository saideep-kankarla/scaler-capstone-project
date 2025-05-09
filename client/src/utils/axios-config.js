// axios-config.js
import axios from 'axios';
const apiBaseUrl =
  import.meta.env.VITE_NODE_API_URL || import.meta.env.VITE_NODE_API_URL_LOCAL;

const instance = axios.create({
  baseURL: apiBaseUrl,
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('audiioAuthtoken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
