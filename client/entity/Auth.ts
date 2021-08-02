import { FetchUserResponse } from '@/types/api/auth';
import { User } from '@/types/user';

export type AuthJSONType = {
  isAuthenticated: boolean;
  user: User;
};

export type AuthViewType = {
  isAuthenticated: boolean;
  user: User;
};

export class Auth {
  isAuthenticated: boolean;

  user: User;

  private constructor(data: AuthJSONType) {
    this.isAuthenticated = data.isAuthenticated;
    this.user = data.user;
  }

  // Check the response whether valid or not in runtime
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static isValid(data: any): data is AuthJSONType {
    if (typeof data.isAuthenticated !== 'boolean') {
      return false;
    }
    if (typeof data.user !== 'object') {
      return false;
    }
    return true;
  }

  static fromJSON(data: unknown) {
    if (!this.isValid(data)) {
      throw new Error('Invalid response');
    }
    return new Auth(data);
  }

  // Create a valid object of auth from the response
  static createAuthFromResponse(response: FetchUserResponse) {
    return Auth.fromJSON({
      isAuthenticated: response.isAuthenticated,
      user: response.user,
    });
  }
}
