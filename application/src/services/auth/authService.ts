// API
import { axiosInstance } from '../api';

// Types
import { ErrorResponse } from '@/types';
import { User } from '@/schemas';

export type SignInArgs = {
  identifier: string;
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
    const { identifier, password } = args;

    const response = await axiosInstance({
      method: 'POST',
      url: AUTH_ENDPOINT,
      data: {
        identifier,
        password,
      },
    });

    return response.data;
  },
};
