import Axios, { AxiosError, AxiosInstance } from 'axios';
import getConfig from '@/config';
import {
  LogoutResponse,
  IErrorResponse,
  FetchUserResponse,
} from '@/types/api/auth';
import { Auth } from '@/entity/Auth';

class AuthApi {
  axios: AxiosInstance;

  constructor() {
    this.axios = Axios.create({
      baseURL: getConfig().API_ENDPOINT,
      withCredentials: true,
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

  fetchUser = async () =>
    this.axios
      .get<FetchUserResponse>('/api/auth')
      .then((res) => {
        const data = Auth.fromJSON(res.data);
        return data;
      })
      .catch((err: AxiosError<IErrorResponse>) => {
        console.log(err);
        return Promise.reject(
          new Error(err.response.data.message ?? err.message)
        );
      });
}

export default new AuthApi();
