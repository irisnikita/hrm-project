// Axios
import { axiosInstance } from '@/services/api';
import { AxiosRequestConfig } from 'axios';

// Types
import { StrapiResponse } from '@/types';

// Schemas
import { Product } from '@/schemas';

export type GetProductListArgs = {
  params?: AxiosRequestConfig['params'];
};

const PRODUCT_BASE_URL = '/products';

export const productService = {
  getProductList: async (args?: GetProductListArgs): Promise<StrapiResponse<Product[]>> => {
    const { params } = args || {};
    const { populate = '*', ...restParams } = params;

    const response = await axiosInstance({
      method: 'GET',
      url: PRODUCT_BASE_URL,
      params: { populate, ...restParams },
    });

    return response.data;
  },
};
