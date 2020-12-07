import { IUserFrontnd } from '@/types/user';
import { SerializedError } from '@reduxjs/toolkit';

export interface AuthState {
  auth: {
    isAuthenticated: boolean;
    user: IUserFrontnd | undefined;
    loading: boolean;
    error: SerializedError;
  };
}
