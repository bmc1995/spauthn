import axios from 'axios';
import { APIResponse, AuthResponse } from '../../models/APIResponse';

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
const routes = {
  auth: {
    login: `${baseURL}/opeu/authn`,
    logout: `${baseURL}/opeu/authn/logout`,
  },
};
export class APIRequest {
  static Auth = {
    login: async (data: { email: string; password: string }): Promise<AuthResponse> => {
      try {
        const response = await axios.post<AuthResponse>(routes.auth.login, data);
        return response.data;
      } catch (error) {
        console.log(error);
        throw new Error('Login failed');
      }
    },
    logout: async () => {
      try {
        const response = await axios.post(routes.auth.logout);
        return response.data;
      } catch (error) {
        console.log(error);
        throw new Error('Logout failed');
      }
    },
  };
}
