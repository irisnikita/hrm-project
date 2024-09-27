// Libraries
import { AxiosRequestConfig } from 'axios';
import { StrapiResponse } from '@/types';

// API
import { axiosInstance } from '../api';

// Schemas
import { News } from '@/schemas';

export type GetNewsListArgs = {
  params?: AxiosRequestConfig['params'];
};

const NEWS_BASE_URL = '/news';

export const newsService = {
  getNewsList: async (args?: GetNewsListArgs): Promise<StrapiResponse<News[]>> => {
    const { params } = args || {};
    const response = await axiosInstance({
      method: 'GET',
      url: NEWS_BASE_URL,
      params,
    });

    return response.data;
  },
};
