// Api
import { axiosInstance } from '../api';

// Types
import { Media } from '@/schemas/Media';

export const uploadServices = {
  uploadFiles: async (files: File[]): Promise<Media[]> => {
    const formData = new FormData();
    files.forEach(file => formData.append('files', file));

    const response = await axiosInstance.post('/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return response.data;
  },
};
