import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { AuthState } from './type';
import { fetchAuth } from './asyncActions';

export const authExtraReducers = (
  builder: ActionReducerMapBuilder<AuthState>
) => {
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
      loading: true,
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
};

export default authExtraReducers;
