import { configureStore } from '@reduxjs/toolkit';
import ToastReducer from './slices/toastSlice';
import AuthReducer from './slices/authSlice';

const store = configureStore({
  reducer: {
    toast: ToastReducer,
    auth: AuthReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
