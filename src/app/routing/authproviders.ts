import { User } from '../../common/models/user';
import { login, logout } from '../redux/slices/authSlice';
import * as authLocalStorage from '../../features/auth/utils/authLocalStorage';
import store from '../redux/store';
/**
 * Represents an authentication provider.
 */
interface AuthProvider {
  /**
   * Retrieves the user information.
   * @returns The user information.
   */
  getUser(): User | null;

  /**
   * Signs in the user with the provided email and password.
   * @param email - The user's email.
   * @param password - The user's password.
   * @returns A promise that resolves when the sign-in process is complete.
   */
  signin({ email, password }: { email: string; password: string }): Promise<void>;
  /**
   * Signs out the user.
   * @returns A promise that resolves when the sign-out process is complete.
   */
  signout(): Promise<void>;
}

export const authProvider: AuthProvider = {
  getUser() {
    const authState = store.getState().auth;
    console.log(authState);

    if (authState.user) {
      return authState.user;
    }
    return null;
  },
  async signin({ email, password }: { email: string; password: string }) {
    const response = await fetch('http://localhost:3000/opeu/authn', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: email, password }),
    });
    if (!response.ok) {
      console.log(`Response:`, response);

      throw new Error('Invalid credentials');
    }
    const data = await response.json();
    const token = crypto.getRandomValues(new Uint32Array(1))[0].toString(16);
    authLocalStorage.saveAuthState({ token, user: data.user });
    store.dispatch(login({ token, user: data.user }));
  },

  async signout() {
    authLocalStorage.removeAuthState();
    store.dispatch(logout({ token: null, user: null }));
  },
};
