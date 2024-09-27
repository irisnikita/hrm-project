// Libraries
import { AxiosRequestConfig } from 'axios';

// Api
import { axiosInstance } from '../api';
import { StrapiResponse } from '@/types';

import { OrganizationRole } from '@/schemas';

const ORGANIZATION_ROLE_PATH = '/organization-roles';

export type GetOrganizationRoleArgs = {
  params: AxiosRequestConfig['params'];
};

export const organizationRoleService = {
  getOrganizationRoleList: async (
    args?: GetOrganizationRoleArgs,
  ): Promise<StrapiResponse<OrganizationRole[]>> => {
    const { params } = args || {};

    const response = await axiosInstance({
      method: 'GET',
      url: ORGANIZATION_ROLE_PATH,
      params,
    });
    return response.data;
  },
  getOrganizationRole: async (id: number) => {
    const response = await axiosInstance.get(`${ORGANIZATION_ROLE_PATH}/${id}`);
    return response.data;
  },
};
