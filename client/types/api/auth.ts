import { User } from '@/types/user';

export type LogoutResponse = {
  message: string;
};

export type FetchUserResponse = {
  isAuthenticated: boolean;
  user: User;
};

export type IErrorResponse = {
  message: string;
};
