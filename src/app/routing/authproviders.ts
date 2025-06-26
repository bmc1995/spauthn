import { User } from '../../common/models/user';
import { login, logout } from '../redux/slices/authSlice';
import * as authLocalStorage from '../../features/auth/utils/authLocalStorage';
import store from '../redux/store';
import { APIRequest } from '../../common/notifications/utils/requests';
import { dispatchToast } from '../../common/notifications/utils/dispatchToast';

interface AuthProvider {
  getUser(): User | null;
  signIn({ email, password }: { email: string; password: string }): Promise<void>;
  signOut(): Promise<void>;
}

export const authProvider: AuthProvider = {
  getUser() {
    const authState = store.getState().auth;
    console.log('[authProvider authState]', authState);
    if (authState.user) {
      return authState.user;
    }
    return null;
  },

  async signIn({ email, password }: { email: string; password: string }) {
    const response = await APIRequest.Auth.login({ email, password });
    if (!response?.data) {
      console.log(`Response:`, response);
      throw new Error(response?.error?.message || 'Invalid credentials');
    }
    const { user, token } = response.data;
    console.log('[authProvider signIn] user', user);
    console.log('[authProvider signIn] token', token);
    authLocalStorage.saveAuthState({ token, user });
    store.dispatch(login({ token, user }));
    dispatchToast('Login Success!', 'success');
  },

  async signOut() {
    authLocalStorage.removeAuthState();
    store.dispatch(logout({ token: null, user: null }));
  },
};
