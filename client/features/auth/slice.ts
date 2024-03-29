import { createSlice, SerializedError } from '@reduxjs/toolkit';
import { User } from '@/types/user';
import { fetchUser } from './asyncActions';

type AuthState = {
  auth: {
    isAuthenticated: boolean;
    user: User | undefined;
    loading: boolean;
    error: SerializedError;
  };
};

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
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.auth = {
        isAuthenticated: action.payload.isAuthenticated,
        user: action.payload.user,
        loading: false,
        error: undefined,
      };
    });
    builder.addCase(fetchUser.pending, (state) => {
      state.auth = {
        isAuthenticated: false,
        user: undefined,
        loading: true,
        error: undefined,
      };
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      console.log(state, action);
      state.auth = {
        isAuthenticated: false,
        user: undefined,
        error: action.error,
        loading: false,
      };
    });
  },
});

export default authSlice.reducer;

export const authSelector = (state: { authStore: AuthState }) =>
  state.authStore;
