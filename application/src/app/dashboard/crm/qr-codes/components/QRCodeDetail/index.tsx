// Libraries
import React from 'react';

// Components
import { DrawerDetail, DrawerDetailProps } from '@/components/shared';

interface QrCodeDetailProps extends DrawerDetailProps {}

export const QrCodeDetail: React.FC<QrCodeDetailProps> = props => {
  const { ...restProps } = props;

  return <DrawerDetail {...restProps}>QrCodeDetail</DrawerDetail>;
};
