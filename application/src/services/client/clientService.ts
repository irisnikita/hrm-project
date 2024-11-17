// Axios
import { axiosInstance } from '@/services/api';
import { AxiosRequestConfig } from 'axios';

// Types
import { StrapiResponse } from '@/types';

// Schemas
import { Client } from '@/schemas';

export type GetClientListArgs = {
  params?: AxiosRequestConfig['params'];
};

const CLIENT_BASE_URL = '/clients';

export const clientService = {
  getClientList: async (args?: GetClientListArgs): Promise<StrapiResponse<Client[]>> => {
    const { params } = args || {};
    const { populate = '*', ...restParams } = params;

    const response = await axiosInstance({
      method: 'GET',
      url: CLIENT_BASE_URL,
      params: { populate, ...restParams },
    });

    return response.data;
  },
};
