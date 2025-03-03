// Libraries
import React from 'react';
import { QRCodeCanvas } from 'qrcode.react';

// Components
import { DrawerDetail, DrawerDetailProps } from '@/components/shared';

// Schemas
import { QRCode } from '@/schemas';

interface QrCodeDetailProps extends DrawerDetailProps {
  qrCode?: QRCode['attributes'];
}

// const ZALO_MINI_APP_URL = 'https://zalo.me/s/3516483688051051916/redeem-code?env=DEVELOPMENT&version=zdev-784f421c';
const ZALO_MINI_APP_URL = 'http://localhost:4001/redeem-code';

export const QrCodeDetail: React.FC<QrCodeDetailProps> = props => {
  const { qrCode, ...restProps } = props;

  return (
    <DrawerDetail {...restProps}>
      <QRCodeCanvas
        id={`qr-code-${qrCode?.qrCodeId}`}
        className="qr-code-canvas"
        value={`${ZALO_MINI_APP_URL}?qrCodeId=${qrCode?.qrCodeId}`}
        size={105} // size of the QR code
        fgColor="#000000" // foreground color
        bgColor="#ffffff" // background color
        level="H" // error correction level ('L', 'M', 'Q', 'H')
      />
      <div>{`${ZALO_MINI_APP_URL}?qrCodeId=${qrCode?.qrCodeId}`}</div>
    </DrawerDetail>
  );
};
