import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import baseServerUrl from '@/client/lib/baseServerUrl';

export interface AuthState {
  auth: {
    data: Record<string, unknown>;
    loading: boolean;
    error: string;
  };
}

const initialState: AuthState = {
  auth: {
    data: undefined,
    loading: true,
    error: undefined,
  },
};

export const fetchData = createAsyncThunk('auth/fetchData', () =>
  axios
    .get(`${baseServerUrl}/api/user/`)
    .then((res) => res.data)
    .catch((err) =>
      Promise.reject(new Error(err.response.data.message || err.message))
    )
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.auth.loading = payload;
    },

    setErrors: (state, { payload }: PayloadAction<string>) => {
      state.auth.error = payload;
    },

    setAuth: (state, { payload }: PayloadAction<Record<string, unknown>>) => {
      state.auth.data = payload;
    },
  },
  extraReducers: {
    [fetchData.fulfilled.type]: (state, action) => {
      state.auth = {
        data: action.payload,
        loading: false,
        error: undefined,
      };
    },
    [fetchData.pending.type]: (state) => {
      state.auth = {
        data: undefined,
        loading: true,
        error: undefined,
      };
    },
    [fetchData.rejected.type]: (state, action) => {
      state.auth = {
        data: undefined,
        error: action.error,
        loading: false,
      };
    },
  },
});

export const { setLoading, setErrors, setAuth } = authSlice.actions;

export default authSlice.reducer;

export const authSelector = (state: { authStore: AuthState }) =>
  state.authStore;
