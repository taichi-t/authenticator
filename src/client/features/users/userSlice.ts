import {
  createSlice,
  PayloadAction,
  SerializedError,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import axios from 'axios';
import baseServerUrl from '@/client/lib/baseServerUrl';

export interface UserState {
  user: {
    data: Record<string, unknown>;
    loading: boolean;
    error: SerializedError;
  };
}

const initialState: UserState = {
  user: {
    data: undefined,
    loading: true,
    error: undefined,
  },
};

export const fetchUser = createAsyncThunk('user/fetchUser', async () =>
  axios
    .get(`${baseServerUrl}/api/user/`)
    .then((res) => res.data)
    .catch((err) => {
      Promise.reject(new Error(err.response.data.message || err.message));
    })
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.user.loading = payload;
    },

    setErrors: (state, { payload }: PayloadAction<SerializedError>) => {
      state.user.error = payload;
    },

    setUser: (state, { payload }: PayloadAction<Record<string, unknown>>) => {
      state.user.data = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.user = {
        data: action.payload,
        loading: false,
        error: undefined,
      };
    });
    builder.addCase(fetchUser.pending, (state) => {
      state.user = {
        data: undefined,
        loading: true,
        error: undefined,
      };
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.user = {
        data: undefined,
        error: action.error,
        loading: false,
      };
    });
  },
});

export const { setLoading, setErrors, setUser } = userSlice.actions;

export default userSlice.reducer;

export const userSelector = (state: { userStore: UserState }) =>
  state.userStore;
