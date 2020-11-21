import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import baseServerUrl from '@/client/lib/baseServerUrl';

export interface AuthState {
  auth: Record<string, unknown>;
  loading: boolean;
  errors: string;
  mockData: any;
}

const initialState: AuthState = {
  auth: {},
  loading: false,
  errors: '',
  mockData: {
    loading: false,
    errors: {},
    data: {},
  },
};

export const fetchData = createAsyncThunk('auth/fetchData', () =>
  axios
    .get(`${baseServerUrl}/api/auth`)
    .then((res) => {
      if (res.status !== 200) {
        throw new Error('Error getting data');
      }
      return res.data;
    })
    .catch((err) => err)
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.loading = payload;
    },

    setErrors: (state, { payload }: PayloadAction<string>) => {
      state.errors = payload;
    },

    setAuth: (state, { payload }: PayloadAction<Record<string, unknown>>) => {
      state.auth = payload;
    },
  },
  extraReducers: {
    [fetchData.fulfilled.type]: (state, action) => {
      state.mockData = {
        loading: false,
        errors: undefined,
        data: action.payload,
      };
    },
    [fetchData.pending.type]: (state) => {
      state.mockData = {
        loading: true,
        errors: undefined,
        data: undefined,
      };
    },
    [fetchData.rejected.type]: (state, action) => {
      state.mockData = {
        loading: false,
        errors: action.payload,
        data: undefined,
      };
    },
  },
});

export const { setLoading, setErrors, setAuth } = authSlice.actions;

export default authSlice.reducer;

export const authSelector = (state: { authStore: AuthState }) =>
  state.authStore;
