// Api
import { axiosInstance } from '@/services/api';

// Schema
import { User, CreateUserDto } from '@/schemas/User';

// Types
import { TGetUserListArgs, TUpdateUserArgs } from './types';

const USER_ENDPOINT = '/users';

export const userService = {
  getUser: async (id: string): Promise<User | null> => {
    const response = await axiosInstance.get(`${USER_ENDPOINT}/${id}`);
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
  updateUser: async (args: TUpdateUserArgs): Promise<User | null> => {
    const { id, userData } = args;
    const response = await axiosInstance({
      method: 'PUT',
      url: `${USER_ENDPOINT}/${id}`,
      data: userData,
    });
    return response.data;
  },
};
