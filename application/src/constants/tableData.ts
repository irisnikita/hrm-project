// Constants
import { ColumnsType } from 'antd/es/table';
import { OBJECT_TYPE } from './object';

export const OBJECT_COLUMNS: Record<string, ColumnsType> = {
  [OBJECT_TYPE.QR_CODE]: [
    {
      key: 'qrCodeId',
      dataIndex: 'qrCodeId',
      title: 'QR Code ID',
    },
    {
      key: 'description',
      dataIndex: 'description',
      title: 'Description',
    },
    {
      key: 'points',
      dataIndex: 'points',
      title: 'Points',
    },
    {
      key: 'status',
      dataIndex: 'status',
      title: 'Status',
      sorter: true,
    },
    {
      key: 'createdAt',
      dataIndex: 'createdAt',
      title: 'Created At',
      sorter: true,
    },
  ],
};
