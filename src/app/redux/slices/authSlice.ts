import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import * as authLocalStorage from '../../../features/auth/utils/authLocalStorage';
import { User } from '../../../common/models/user';

export interface AuthState {
  token: string | null;
  user: User | null;
}

const storedAuthState = authLocalStorage.getAuthState();
const initialState: AuthState = {
  token: storedAuthState?.token ?? null,
  user: storedAuthState?.user ?? null,
};

/**
 * Redux slice for managing authentication state.
 */
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    /**
     * Action for logging in a user.
     * @param state - The current authentication state.
     * @param action - The payload action containing the new authentication state.
     * @returns The updated authentication state.
     */
    login: (state, action: PayloadAction<AuthState>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    /**
     * Action for logging out a user.
     * @returns The authentication state with the token and user set to null.
     */
    logout: () => {
      return {
        token: null,
        user: null,
      };
    },
    /**
     * Action for updating the user profile.
     * @param state - The current authentication state.
     * @param action - The payload action containing the updated user profile.
     * @returns The authentication state with the updated user profile if applicable.
     */
    userProfileUpdated: (state, action: PayloadAction<User>) => {
      if (state.user) {
        return {
          ...state,
          user: {
            ...state.user,
            ...action.payload,
          },
        };
      }
      return state;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;

export const selectUser = (state: RootState) => state.auth.user;
