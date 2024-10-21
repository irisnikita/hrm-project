// API
import { axiosInstance } from '../api';

// Types
import { ErrorResponse } from '@/types';
import { User } from '@/schemas';

export type SignInArgs = {
  username: string;
  password: string;
};

export type SignInResponse = {
  jwt: string;
  user: User;
} & ErrorResponse;

const AUTH_ENDPOINT = '/auth/local';

export const authServices = {
  register: async () => {},
  signIn: async (args: SignInArgs): Promise<SignInResponse> => {
    const { username, password } = args;

    const response = await axiosInstance({
      method: 'POST',
      url: AUTH_ENDPOINT,
      data: {
        identifier: username,
        password,
      },
    });
    return response.data;
  },
};
