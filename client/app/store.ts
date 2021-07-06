import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authSliceReducer from '@/features/auth/slice';

const rootReducer = combineReducers({
  authStore: authSliceReducer,
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV === 'development',
});

export type RootState = ReturnType<typeof rootReducer>;

export default store;
