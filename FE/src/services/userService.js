import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users';

const userService = {
  async login(credentials) {
    try {
      const response = await axios.post(`${API_URL}/login`, credentials, {
        withCredentials: true
      });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Login failed');
    }
  },

  async register(userData) {
    try {
      const response = await axios.post(`${API_URL}/register`, userData, {
        withCredentials: true
      });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Registration failed');
    }
  },

  async logout() {
    try {
      await axios.post(`${API_URL}/logout`, {}, {
        withCredentials: true
      });
    } catch (error) {
      throw error.response ? error.response.data : new Error('Logout failed');
    }
  },

  async getCurrentUser() {
    try {
      const response = await axios.get(`${API_URL}/me`, {
        withCredentials: true
      });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Failed to fetch user');
    }
  }
};

export default userService;