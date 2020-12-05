import {
  createSlice,
  PayloadAction,
  SerializedError,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import axios from 'axios';
import baseServerUrl from '@/client/lib/baseServerUrl';

export interface AuthState {
  auth: {
    data: Record<string, unknown>;
    loading: boolean;
    error: SerializedError;
  };
}

const initialState: AuthState = {
  auth: {
    data: undefined,
    loading: true,
    error: undefined,
  },
};

export const fetchAuth = createAsyncThunk('auth/fetchAuth', () =>
  axios
    .get(`${baseServerUrl}/api/auth/`)
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

    setErrors: (state, { payload }: PayloadAction<SerializedError>) => {
      state.auth.error = payload;
    },

    setAuth: (state, { payload }: PayloadAction<Record<string, unknown>>) => {
      state.auth.data = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAuth.pending, (state, action) => {
      state.auth = {
        data: action.payload,
        loading: false,
        error: undefined,
      };
    });
    builder.addCase(fetchAuth.fulfilled, (state) => {
      state.auth = {
        data: undefined,
        loading: true,
        error: undefined,
      };
    });
    builder.addCase(fetchAuth.rejected, (state, action) => {
      state.auth = {
        data: undefined,
        error: action.error,
        loading: false,
      };
    });
  },
});

export const { setLoading, setErrors, setAuth } = authSlice.actions;

export default authSlice.reducer;

export const authSelector = (state: { authStore: AuthState }) =>
  state.authStore;
