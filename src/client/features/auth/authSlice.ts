import {
  createSlice,
  PayloadAction,
  SerializedError,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import axios from 'axios';
import baseServerUrl from '@/client/lib/baseServerUrl';
import { IUserFrontnd } from '@/types/user';

export interface AuthState {
  auth: {
    isAuthenticated: boolean;
    user: IUserFrontnd | undefined;
    loading: boolean;
    error: SerializedError;
  };
}

const initialState: AuthState = {
  auth: {
    isAuthenticated: false,
    user: undefined,
    loading: true,
    error: undefined,
  },
};

export const fetchAuth = createAsyncThunk<{
  user: IUserFrontnd;
  isAuthenticated: boolean;
}>('auth/fetchAuth', () =>
  axios
    .get(`${baseServerUrl}/api/auth/`)
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
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

    setAuth: (state, { payload }: PayloadAction<IUserFrontnd>) => {
      state.auth.user = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAuth.fulfilled, (state, action) => {
      state.auth = {
        isAuthenticated: action.payload.isAuthenticated,
        user: action.payload.user,
        loading: false,
        error: undefined,
      };
    });
    builder.addCase(fetchAuth.pending, (state) => {
      state.auth = {
        isAuthenticated: false,
        user: undefined,
        loading: false,
        error: undefined,
      };
    });
    builder.addCase(fetchAuth.rejected, (state, action) => {
      state.auth = {
        isAuthenticated: false,
        user: undefined,
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
