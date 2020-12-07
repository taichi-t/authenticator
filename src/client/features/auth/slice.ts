import { createSlice } from '@reduxjs/toolkit';
import { AuthState } from './types';
import { authExtraReducers } from './reducers';

const initialState: AuthState = {
  auth: {
    isAuthenticated: false,
    user: undefined,
    loading: true,
    error: undefined,
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: authExtraReducers,
});

export default authSlice.reducer;

export const authSelector = (state: { authStore: AuthState }) =>
  state.authStore;
