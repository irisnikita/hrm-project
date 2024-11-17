// Axios
import { axiosInstance } from '@/services/api';
import { AxiosRequestConfig } from 'axios';

// Types
import { StrapiResponse } from '@/types';

// Schemas
import { CreateQRCode, QRCode } from '@/schemas';

export type GetQRCodeListArgs = {
  params?: AxiosRequestConfig['params'];
};

const QR_CODE_BASE_URL = '/qr-codes';

export const qrCodeService = {
  getQRCodeList: async (args?: GetQRCodeListArgs): Promise<StrapiResponse<QRCode[]>> => {
    const { params } = args || {};
    const { populate = '*', ...restParams } = params;

    const response = await axiosInstance({
      method: 'GET',
      url: QR_CODE_BASE_URL,
      params: { populate, ...restParams },
    });

    return response.data;
  },
  createQRCode: async (data: CreateQRCode): Promise<StrapiResponse<any>> => {
    const response = await axiosInstance({
      method: 'POST',
      url: `${QR_CODE_BASE_URL}`,
      data,
    });

    return response.data;
  },
};
