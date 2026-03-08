import axios from "axios";

// Get the API base URL from environment variables
const API_URL = import.meta.env.VITE_API_URL;

const login = async (userData) => {
  const response = await axios.post(`${API_URL}/users/login`, userData);
  return response.data;
};

const signup = async (userData) => {
  const response = await axios.post(`${API_URL}/users/register`, userData);
  return response.data;
};

const authService = { login, signup };
export default authService;
