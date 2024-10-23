// Api
import { axiosInstance } from '@/services/api';

// Schema
import { User, CreateUserDto } from '@/schemas/User';

// Types
import { TGetUserDetailArgs, TGetUserListArgs, TUpdateUserArgs } from './types';
import { CheckNameResponse, ErrorResponse, StrapiResponse } from '@/types';

const USER_ENDPOINT = '/users';

export type UpdateUserResponse = User & ErrorResponse;

export const userService = {
  getUser: async (args?: TGetUserDetailArgs): Promise<User | null> => {
    const { id, params } = args || {};

    const response = await axiosInstance({
      method: 'GET',
      url: `${USER_ENDPOINT}/${id}`,
      params,
    });
    return response.data;
  },
  getUserList: async (args?: TGetUserListArgs): Promise<User[]> => {
    const response = await axiosInstance({
      method: 'GET',
      url: USER_ENDPOINT,
      params: args?.params,
    });
    return response.data;
  },
  createUser: async (userData: CreateUserDto): Promise<User | null> => {
    const response = await axiosInstance.post(USER_ENDPOINT, userData);
    return response.data;
  },
  updateUser: async (args: TUpdateUserArgs): Promise<UpdateUserResponse | null> => {
    const { id, userData } = args;
    const response = await axiosInstance({
      method: 'PUT',
      url: `${USER_ENDPOINT}/${id}`,
      data: userData,
    });
    return response.data;
  },
  checkUserName: async (username: string): Promise<StrapiResponse<CheckNameResponse>> => {
    const response = await axiosInstance({
      method: 'POST',
      url: `${USER_ENDPOINT}/check-username`,
      data: { username: username },
    });
    return response.data;
  },
  registerUser: async (userData: CreateUserDto): Promise<StrapiResponse<User>> => {
    const response = await axiosInstance({
      method: 'POST',
      url: `${USER_ENDPOINT}/register`,
      data: userData,
    });
    return response.data;
  },
};
