import { Role } from '../../common/models/role';
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

/**
 * A fake authentication provider that implements the AuthProvider interface.
 */
export const fakeAuthProvider: AuthProvider = {
  getUser() {
    const authState = store.getState().auth;
    if (authState.user) {
      return authState.user;
    }
    return null;
  },

  async signin({ email, password }: { email: string; password: string }) {
    await new Promise(r => setTimeout(r, 500)); // fake delay

    const fakeUser: User = {
      id: 1,
      email,
      newEmail: null,
      role: Role.ADMIN,
      firstName: 'John',
      lastName: 'Doe',
      activatedAt: null,
      profilePicture: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    if (password === 'regularpassword') {
      authLocalStorage.saveAuthState({ token: 'token', user: { ...fakeUser, role: Role.USER } });
      store.dispatch(login({ token: 'token', user: { ...fakeUser, role: Role.USER } }));
    } else if (password === 'adminpassword') {
      authLocalStorage.saveAuthState({ token: 'token', user: { ...fakeUser, role: Role.ADMIN } });
      store.dispatch(login({ token: 'token', user: { ...fakeUser, role: Role.ADMIN } }));
    } else {
      throw new Error('Invalid credentials');
    }
  },

  async signout() {
    await new Promise(r => setTimeout(r, 500)); // fake delay
    authLocalStorage.removeAuthState();
    store.dispatch(logout());
  },
};
