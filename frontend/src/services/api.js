import axios from 'axios';

const apiBase = process.env.REACT_APP_API_URL;
const baseURL = apiBase === '' ? '/api' : (apiBase ? `${apiBase}/api` : 'http://localhost:5000/api');
const api = axios.create({ baseURL });

const token = localStorage.getItem('token');
if (token) api.defaults.headers.common.Authorization = `Bearer ${token}`;

export default api;
