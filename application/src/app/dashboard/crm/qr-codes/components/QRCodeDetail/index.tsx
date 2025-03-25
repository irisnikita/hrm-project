'use client';

// Libraries
import React, { useEffect, useMemo } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { useTranslations } from 'next-intl';
import { isEmpty } from 'lodash';

// Components
import { DrawerDetail, DrawerDetailProps } from '@/components/shared';
import { Col, Form, Input, Row } from '@/components/ui';

// Schemas
import { QRCode } from '@/schemas';

// Utils
import { buildVoucherQRCode } from '@/utils';
import { InputNumber, Tag } from 'antd';
import { QR_CODE_STATUS_OPTIONS } from '@/constants';

interface QrCodeDetailProps extends DrawerDetailProps {
  qrCode?: QRCode['attributes'];
}

type TFormValues = Omit<QRCode['attributes'], 'product'> & {
  product: string;
};

export const QrCodeDetail: React.FC<QrCodeDetailProps> = props => {
  const { qrCode, ...restProps } = props;
  const t = useTranslations();
  const [form] = Form.useForm<TFormValues>();

  // Effects
  useEffect(() => {
    if (!isEmpty(qrCode))
      form.setFieldsValue({
        ...qrCode,
        product: qrCode.product?.data?.attributes?.productName,
      });
  }, [form, qrCode]);

  const qrCodeStatus = useMemo(() => {
    return QR_CODE_STATUS_OPTIONS.find(qrCodeStatus => qrCodeStatus.key === qrCode?.status);
  }, [qrCode]);

  return (
    <DrawerDetail {...restProps}>
      <Row>
        <Col span={12}>
          <Form form={form} layout="vertical" disabled>
            <Form.Item<TFormValues> name="qrCodeId" label={t('common.ID')}>
              <Input />
            </Form.Item>
            <Form.Item<TFormValues> name="description" label={t('common.description')}>
              <Input />
            </Form.Item>
            <Form.Item<TFormValues> name="product" label={t('common.product')}>
              <Input />
            </Form.Item>
            <Form.Item<TFormValues> name="points" label={t('common.points')}>
              <InputNumber />
            </Form.Item>
            <Form.Item<TFormValues> label={t('qrCode.title')}>
              <QRCodeCanvas
                id={`qr-code-${qrCode?.qrCodeId}`}
                className="qr-code-canvas"
                value={buildVoucherQRCode(qrCode?.qrCodeId || '')}
                size={105} // size of the QR code
                fgColor="#000000" // foreground color
                bgColor="#ffffff" // background color
                level="H" // error correction level ('L', 'M', 'Q', 'H')
              />
            </Form.Item>
            <Form.Item<TFormValues> label={t('common.status')}>
              <Tag bordered={false} color={qrCodeStatus?.tagColor}>
                {t(qrCodeStatus?.label || ('' as any))}
              </Tag>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </DrawerDetail>
  );
};
