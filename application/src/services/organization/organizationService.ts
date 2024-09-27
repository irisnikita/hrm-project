// Axios
import { axiosInstance } from '@/services/api';
import { AxiosRequestConfig } from 'axios';

// Types
import { StrapiResponse } from '@/types';

// Schemas
import { CreateOrganization, Organization } from '@/schemas';

export type GetOrganizationListArgs = {
  params?: AxiosRequestConfig['params'];
};

export type GetOrganizationArgs = {
  id: number;
  params?: AxiosRequestConfig['params'];
};

const ORGANIZATION_BASE_URL = '/organizations';

export const organizationService = {
  getOrganization: async (args?: GetOrganizationArgs): Promise<StrapiResponse<Organization>> => {
    const { id, params } = args || {};
    const response = await axiosInstance({
      method: 'GET',
      url: `${ORGANIZATION_BASE_URL}/${id}`,
      params,
    });

    return response.data;
  },
  getOrganizationList: async (
    args?: GetOrganizationListArgs,
  ): Promise<StrapiResponse<Organization[]>> => {
    const { params } = args || {};
    const { populate = 'logo', ...restParams } = params;

    const response = await axiosInstance({
      method: 'GET',
      url: ORGANIZATION_BASE_URL,
      params: { populate, ...restParams },
    });

    return response.data;
  },
  createOrganization: async (data: CreateOrganization): Promise<StrapiResponse<Organization>> => {
    const response = await axiosInstance({
      method: 'POST',
      url: ORGANIZATION_BASE_URL,
      data,
    });

    return response.data;
  },
};
