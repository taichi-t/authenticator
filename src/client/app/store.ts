import { configureStore } from '@reduxjs/toolkit';
import authSliceReducer from '@/client/features/auth/authSlice';
import userSliceReducer from '@/client/features/users/userSlice';

const store = configureStore({
  reducer: {
    authStore: authSliceReducer,
    userStore: userSliceReducer,
  },
  devTools: process.env.NODE_ENV === 'development',
});

export default store;
