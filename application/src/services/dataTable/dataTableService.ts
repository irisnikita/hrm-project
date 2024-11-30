// Axios
import { axiosInstance } from '@/services/api';
import { AxiosRequestConfig } from 'axios';

// Types
import { StrapiResponse } from '@/types';

export type GetDataTableListArgs = {
  params?: AxiosRequestConfig['params'];
  objectType: string;
};

export const dataTableService = {
  getDataTableListing: async <DT = any>(
    args?: GetDataTableListArgs,
  ): Promise<StrapiResponse<DT>> => {
    const { params, objectType } = args || {};
    const { populate = '*', ...restParams } = params || {};

    const response = await axiosInstance({
      method: 'GET',
      url: `/${objectType}`,
      params: { populate, ...restParams },
    });

    return response.data;
  },
  // getQRCodeList: async (args?: GetQRCodeListArgs): Promise<StrapiResponse<QRCode[]>> => {
  //   const { params } = args || {};
  //   const { populate = '*', ...restParams } = params;
  //   const response = await axiosInstance({
  //     method: 'GET',
  //     url: QR_CODE_BASE_URL,
  //     params: { populate, ...restParams },
  //   });
  //   return response.data;
  // },
  // createQRCode: async (data: CreateQRCode): Promise<StrapiResponse<any>> => {
  //   const response = await axiosInstance({
  //     method: 'POST',
  //     url: `${QR_CODE_BASE_URL}`,
  //     data,
  //   });
  //   return response.data;
  // },
  // bulkCreateQRCode: async (data: CreateQRCode['data'][]): Promise<StrapiResponse<boolean>> => {
  //   const response = await axiosInstance({
  //     method: 'POST',
  //     url: `${QR_CODE_BASE_URL}/bulk-create`,
  //     data: {
  //       data,
  //     },
  //   });
  //   return response.data;
  // },
};
