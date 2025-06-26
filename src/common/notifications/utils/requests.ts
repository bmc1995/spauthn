import axios from 'axios';
import { AuthResponse, CreateAccountResponse } from '../../models/APIResponse';

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
const routes = {
  auth: {
    login: `${baseURL}/opeu/authn`,
    logout: `${baseURL}/opeu/authn/logout`,
    createAccount: `${baseURL}/users/create`,
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
    createAccount: async (data: {
      email: string;
      password: string;
      displayName: string;
    }): Promise<CreateAccountResponse> => {
      try {
        const response = await axios.post<CreateAccountResponse>(routes.auth.createAccount, data);
        return response.data;
      } catch (error: any) {
        console.log(error);
        throw new Error(error.response?.data?.message || 'Account creation failed');
      }
    },
  };
}
