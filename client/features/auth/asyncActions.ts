import { createAsyncThunk } from '@reduxjs/toolkit';
import authApi from '@/api/auth';

export const fetchUser = createAsyncThunk('auth/fetchUser', () =>
  authApi.fetchUser()
);

export default fetchUser;
