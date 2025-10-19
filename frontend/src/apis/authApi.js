import axios from 'axios';

const API_BASE_URL = 'http://localhost:9900/auth';

export const loginApi = async (email, password) => {
  const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
  return response.data;
};

export const registerApi = async (name, email, password, role) => {
  const response = await axios.post(`${API_BASE_URL}/register`, { name, email, password, role });
  return response.data;
};

export const getProfileApi = async () => {
  const response = await axios.get(`${API_BASE_URL}/profile`);
  return response.data;
};
