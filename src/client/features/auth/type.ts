import { SerializedError } from '@reduxjs/toolkit';
import { IUserFrontnd } from '@/types/user';

export interface AuthState {
  auth: {
    isAuthenticated: boolean;
    user: IUserFrontnd | undefined;
    loading: boolean;
    error: SerializedError;
  };
}
