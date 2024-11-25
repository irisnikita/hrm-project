'use client';

// Libraries
import React, { useCallback, useMemo } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { useImmer } from 'use-immer';
import { useTranslations } from 'next-intl';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Components
import { Flex, Form, Input, Modal, ModalProps, Scrollbars, Typography } from '@/components/ui';
import { ProductSelect } from '@/components/shared';

// Queries
import { useBulkCreateQRCode } from '@/queries';

// Constants
import { QR_CODE_STATUS } from '@/constants';

// Utils
import { nanoid } from '@/utils';

interface CreateQrCodeDrawerProps extends ModalProps {}

type TFormValues = {
  description: string;
  points: number;
  expiresAt: string;
  image: any;
  product: number;
  quantity: number;
};

const initialState = {
  isOpenQRModal: false,
  isExportLoading: false,
};

const EXPORT_QR_CODE_SIZE = {
  width: 595,
  height: 842,
};
const QR_CODE_SIZE = {
  width: 472,
};

const ZALO_MINI_APP_URL = 'https://zalo.me/s/3516483688051051916/?env=TESTING&version=7';

export const CreateQrCodeModal: React.FC<CreateQrCodeDrawerProps> = props => {
  const { onCancel, ...restProps } = props;

  const t = useTranslations();
  const [form] = Form.useForm<TFormValues>();
  const [state, setState] = useImmer(initialState);
  const { isOpenQRModal } = state;

  const formValues = Form.useWatch([], form);

  // Mutations
  const { mutateAsync: bulkCreateQRCode, isPending: isBulkCreateLoading } = useBulkCreateQRCode({});

  // Memos
  const qrCodes = useMemo(() => {
    const { description, product, quantity, points } = formValues || {};

    return Array.from({ length: quantity }).map(() => ({
      qrCodeId: nanoid(),
      description,
      status: QR_CODE_STATUS.ACTIVE,
      product,
      points,
    }));
  }, [formValues]);

  // Handlers
  const handleOnCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      form.resetFields();

      setState(initialState);
      onCancel?.(e);
    },
    [form, setState, onCancel],
  );

  const onFinish = useCallback(() => {
    setState(draft => {
      draft.isOpenQRModal = true;
    });
  }, [setState]);

  const handleExportQRCodeList = useCallback(async () => {
    setState(draft => {
      draft.isExportLoading = true;
    });

    const pdf = new jsPDF({
      orientation: 'p',
      unit: 'px',
      format: [EXPORT_QR_CODE_SIZE.width, EXPORT_QR_CODE_SIZE.height],
      putOnlyUsedFonts: true,
    });

    const qrCodeListEl = document.querySelector('#qr-code-list') as HTMLElement;
    const qrCodeListCanvas = await html2canvas(qrCodeListEl, {
      allowTaint: true,
      useCORS: true,
      scrollX: 0,
      scrollY: 0,
    });

    const imgData = qrCodeListCanvas.toDataURL('image/png');
    const centerPosition = (EXPORT_QR_CODE_SIZE.width - QR_CODE_SIZE.width) / 2;

    // const countPage = Math.ceil(qrCodeListEl.clientHeight / EXPORT_QR_CODE_SIZE.height);

    // Array.from({ length: countPage }).forEach((_, index) => {
    //   pdf.addPage();
    // });

    pdf.addImage(imgData, 'PNG', centerPosition, 50, QR_CODE_SIZE.width, qrCodeListEl.clientHeight);

    pdf.save('qr-code-list.pdf');

    // Reset state and form
    setState(initialState);
    onCancel?.({} as any);
    form.resetFields();
  }, [form, onCancel, setState]);

  const onSaveAndExportQrCodeList = useCallback(async () => {
    await bulkCreateQRCode(qrCodes);

    await handleExportQRCodeList();
  }, [qrCodes, bulkCreateQRCode, handleExportQRCodeList]);

  // Renders
  const renderQRCodeList = () => {
    return qrCodes.map(qrCode => (
      <Flex vertical gap={8} key={qrCode.qrCodeId}>
        <QRCodeCanvas
          id={`qr-code-${qrCode.qrCodeId}`}
          className="qr-code-canvas"
          value={`${ZALO_MINI_APP_URL}&qrCodeId=${qrCode.qrCodeId}`}
          size={105} // size of the QR code
          fgColor="#000000" // foreground color
          bgColor="#ffffff" // background color
          level="H" // error correction level ('L', 'M', 'Q', 'H')
        />
        <Typography.Text className="w-[100px] text-center !text-xs" ellipsis={{ tooltip: true }}>
          {qrCode.qrCodeId}
        </Typography.Text>
      </Flex>
    ));
  };

  return (
    <>
      <Modal
        title={t('qrCode.createQRCode')}
        centered
        onCancel={handleOnCancel}
        onOk={form.submit}
        {...restProps}
      >
        <Form name="create-qr-code" form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item<TFormValues> name="description" label={t('common.description')}>
            <Input />
          </Form.Item>

          <Form.Item<TFormValues>
            name="product"
            label={t('common.product')}
            rules={[{ required: true }]}
          >
            <ProductSelect
              onChange={(value, option) => {
                form.setFieldsValue({
                  points: +(option as any)?.points,
                });
              }}
            />
          </Form.Item>

          <Form.Item<TFormValues>
            name="quantity"
            label={t('common.quantity')}
            rules={[{ required: true }, { max: 100 }]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item<TFormValues>
            name="points"
            label={t('common.points')}
            rules={[{ required: true }]}
          >
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        open={isOpenQRModal}
        title="QR Code list"
        okText={t('common.saveAndExport')}
        centered
        onCancel={() =>
          setState(draft => {
            draft.isOpenQRModal = false;
          })
        }
        okButtonProps={{ loading: isBulkCreateLoading }}
        onOk={onSaveAndExportQrCodeList}
      >
        <Scrollbars autoHeight autoHeightMax={500}>
          <Flex id="qr-code-list" gap={16} wrap className="mt-4">
            {renderQRCodeList()}
          </Flex>
        </Scrollbars>
      </Modal>
    </>
  );
};
