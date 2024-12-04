// Libraries
import dayjs from 'dayjs';

// NOTE: This will be improved
export const renderStatus = (status: string) => {
  return status === 'active' ? 'success' : 'error';
};

export const renderDate = (date: string) => {
  return dayjs(date).format('DD-MM-YYYY HH:mm:ss');
};
