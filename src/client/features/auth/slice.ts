import { createSlice } from '@reduxjs/toolkit';
import { authExtraReducers } from './reducers';
import { AuthState } from './type';

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
