// Libraries
import React from 'react';
import { QRCodeCanvas } from 'qrcode.react';

// Components
import { DrawerDetail, DrawerDetailProps } from '@/components/shared';

// Schemas
import { QRCode } from '@/schemas';
import { buildVoucherQRCode } from '@/utils';

interface QrCodeDetailProps extends DrawerDetailProps {
  qrCode?: QRCode['attributes'];
}

export const QrCodeDetail: React.FC<QrCodeDetailProps> = props => {
  const { qrCode, ...restProps } = props;

  //zalo.me/s/3516483688051051916/?env=DEVELOPMENT&version=zdev-79b16a93
  https: return (
    <DrawerDetail {...restProps}>
      <QRCodeCanvas
        id={`qr-code-${qrCode?.qrCodeId}`}
        className="qr-code-canvas"
        value={buildVoucherQRCode(qrCode?.qrCodeId || '')}
        size={105} // size of the QR code
        fgColor="#000000" // foreground color
        bgColor="#ffffff" // background color
        level="H" // error correction level ('L', 'M', 'Q', 'H')
      />
      <div>{buildVoucherQRCode(qrCode?.qrCodeId || '')}</div>
    </DrawerDetail>
  );
};
