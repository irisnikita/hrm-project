// API
import { axiosInstance } from '../api';

// Types
import { ErrorResponse, StrapiResponse } from '@/types';
import { User } from '@/schemas';

export type SignInArgs = {
  identifier: string;
  password: string;
};

export type SignInResponse = {
  jwt: string;
  user: User;
} & ErrorResponse;

const AUTH_ENDPOINT = '/auth';

export const authServices = {
  register: async () => {},
  signIn: async (args: SignInArgs): Promise<SignInResponse> => {
    const { identifier, password } = args;

    const response = await axiosInstance({
      method: 'POST',
      url: `${AUTH_ENDPOINT}/local`,
      data: {
        identifier,
        password,
      },
    });

    return response.data;
  },
  validateToken: async (): Promise<StrapiResponse<boolean>> => {
    const response = await axiosInstance({
      method: 'POST',
      url: `${AUTH_ENDPOINT}/validate-token`,
    });

    return response?.data;
  },
};
