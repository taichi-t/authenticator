import { createAsyncThunk } from '@reduxjs/toolkit';
import authApi from '@/client/api/auth';

export const fetchAuth = createAsyncThunk('auth/fetchAuth', () =>
  authApi.fetchAuth()
);

export default fetchAuth;
