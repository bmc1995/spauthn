import { AuthState } from '../../../app/redux/slices/authSlice';
import { User } from '../../../common/models/user';

const AUTH_LOCAL_STORAGE_KEY = 'auth';

/**
 * Saves the authentication state to the local storage.
 * @param authState The authentication state to be saved.
 */
export function saveAuthState(authState: AuthState) {
  localStorage.setItem(AUTH_LOCAL_STORAGE_KEY, JSON.stringify(authState));
}

/**
 * Retrieves the authentication state from the local storage.
 * @returns The authentication state if it exists, otherwise null.
 */
export function getAuthState(): AuthState | null {
  const authState = localStorage.getItem(AUTH_LOCAL_STORAGE_KEY);
  if (authState) {
    return JSON.parse(authState) as AuthState;
  }
  return null;
}

/**
 * Removes the authentication state from the local storage.
 */
export function removeAuthState() {
  localStorage.removeItem(AUTH_LOCAL_STORAGE_KEY);
}

/**
 * Retrieves the access token from the authentication state.
 * @returns The access token if available, otherwise null.
 */
export function getAccessToken(): string | null {
  const authState = getAuthState();
  if (authState) {
    return authState.token;
  }
  return null;
}

/**
 * Retrieves the authenticated user from the authentication state.
 * @returns The authenticated user if available, otherwise null.
 */
export function getAuthUser(): User | null {
  const authState = getAuthState();
  if (authState) {
    return authState.user;
  }
  return null;
}
