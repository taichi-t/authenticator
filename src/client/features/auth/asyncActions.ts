import { createAsyncThunk } from '@reduxjs/toolkit';
import { IUserFrontnd } from '@/types/user';
import { BASESERVERURL } from '@/client/config/index';
import Axios from 'axios';

const axios = Axios.create({ baseURL: BASESERVERURL });

export const fetchAuth = createAsyncThunk<{
  user: IUserFrontnd;
  isAuthenticated: boolean;
}>('auth/fetchAuth', () =>
  axios
    .get<{
      user: IUserFrontnd;
      isAuthenticated: boolean;
    }>('/api/auth/')
    .then((res) => res.data)
    .catch((err) => Promise.reject(new Error(err.response.data.message || err)))
);

export default fetchAuth;
