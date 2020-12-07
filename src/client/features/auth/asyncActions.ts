import { createAsyncThunk } from '@reduxjs/toolkit';
import { BASESERVERURL } from '@/client/config/index';
import Axios, { AxiosError } from 'axios';
import { FetchAuthResponse, IErrorResponse } from './types';

const axios = Axios.create({ baseURL: BASESERVERURL });

export const fetchAuth = createAsyncThunk<FetchAuthResponse>(
  'auth/fetchAuth',
  () =>
    axios
      .get<FetchAuthResponse>('/api/auth/')
      .then((res) => res.data)
      .catch((err: AxiosError<IErrorResponse>) =>
        Promise.reject(new Error(err.response.data.message || err.message))
      )
);

export default fetchAuth;
