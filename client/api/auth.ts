import Axios, { AxiosError, AxiosInstance } from 'axios';
import getConfig from '@/config';
import { User } from '@/types/user';

type LogoutResponse = {
  message: string;
};

type FetchAuthResponse = {
  isAuthenticated: boolean;
  user: User;
};

type IErrorResponse = {
  message: string;
};

class AuthApi {
  axios: AxiosInstance;

  constructor() {
    this.axios = Axios.create({
      baseURL: getConfig().API_ENDPOINT,
    });
  }

  logout = async (
    cb: (
      res?: LogoutResponse,
      err?: Partial<AxiosError<LogoutResponse>>
    ) => void
  ): Promise<void> => {
    this.axios
      .get<LogoutResponse>('/api/auth/logout')
      .then((res) => cb(res.data, undefined))
      .catch((err: AxiosError<LogoutResponse>) => cb(undefined, err.response));
  };

  fetchAuth = async () =>
    this.axios
      .get<FetchAuthResponse>('/api/auth/')
      .then((res) => res.data)
      .catch((err: AxiosError<IErrorResponse>) =>
        Promise.reject(new Error(err.response.data.message || err.message))
      );
}

export default new AuthApi();
