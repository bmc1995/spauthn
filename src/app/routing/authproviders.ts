import { User } from '../../common/models/user';
import { login, logout } from '../redux/slices/authSlice';
import * as authLocalStorage from '../../features/auth/utils/authLocalStorage';
import store from '../redux/store';
import { APIRequest } from '../../common/notifications/utils/requests';
import { redirect } from 'react-router-dom';
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

// const response = await fetch('http://localhost:3000/opeu/authn', {
//   method: 'POST',
//   headers: { 'Content-Type': 'application/json' },
//   body: JSON.stringify({ username: email, password }),
// });
// if (!response.ok) {
//   console.log(`Response:`, response);

//   throw new Error('Invalid credentials');
// }
// const data = await response.json();
// const token = crypto.getRandomValues(new Uint32Array(1))[0].toString(16);
// authLocalStorage.saveAuthState({ token, user: data.user });
// store.dispatch(login({ token, user: data.user }));
