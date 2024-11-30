// Constants
import { OBJECT_TYPE } from './object';

// Components
import { Typography } from '@/components/ui';
import { GLOBAL_TOKEN } from './theme';

export const OBJECT_COLUMNS = {
  [OBJECT_TYPE.QR_CODE]: [
    {
      key: 'qrCodeId',
      dataIndex: 'qrCodeId',
      title: 'QR Code ID',
      render: value => (
        <Typography.Text strong style={{ color: GLOBAL_TOKEN.colorPrimary }}>
          {value}
        </Typography.Text>
      ),
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
    },
  ],
};
