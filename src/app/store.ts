import { configureStore } from '@reduxjs/toolkit';
import authSliceReducer from '@/features/auth/authSlice';

const store = configureStore({
  reducer: {
    authStore: authSliceReducer,
  },
  devTools: process.env.NODE_ENV === 'development',
});

export default store;
