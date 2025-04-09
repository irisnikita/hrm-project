'use client';

// Libraries
import React, { useCallback, useMemo, useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import QRCode from 'qrcode';
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
import { buildVoucherQRCode, nanoid } from '@/utils';

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

const QR_EXPORT_SIZE_CM = 2.5;
const QR_EXPORT_SIZE_PX = (QR_EXPORT_SIZE_CM / 2.54) * 96;
// A4
const PAGE_WIDTH_CM = 21;
const PAGE_HEIGHT_CM = 29.7;
// const PAGE_WIDTH_CM = 29.7;
// const PAGE_HEIGHT_CM = 42;
// const MARGIN_CM = 1;
const MARGIN_CM = 1;

const QR_PER_ROW = Math.floor((PAGE_WIDTH_CM - MARGIN_CM * 2) / QR_EXPORT_SIZE_CM);
const QR_PER_COLUMN = Math.floor((PAGE_HEIGHT_CM - MARGIN_CM * 2) / QR_EXPORT_SIZE_CM);
const QR_PER_PAGE = QR_PER_ROW * QR_PER_COLUMN;

export const CreateQrCodeModal: React.FC<CreateQrCodeDrawerProps> = props => {
  const { onCancel, ...restProps } = props;

  const t = useTranslations();
  const [form] = Form.useForm<TFormValues>();
  const [state, setState] = useImmer(initialState);
  const { isOpenQRModal } = state;

  const formValues = Form.useWatch([], form);

  // Ref
  const exportContainerRef = useRef<any>(null);
  const exportContentRef = useRef<any>(null);

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
      unit: 'cm',
      // format: 'a3',
      format: 'a4',
      putOnlyUsedFonts: true,
    });
    const pageCount = Math.ceil(qrCodes.length / QR_PER_PAGE);

    for (let page = 0; page < pageCount; page++) {
      if (page > 0) pdf.addPage();

      const startIdx = page * QR_PER_PAGE;
      const endIdx = Math.min(startIdx + QR_PER_PAGE, qrCodes.length);
      const pageQRCodes = qrCodes.slice(startIdx, endIdx);

      exportContainerRef.current.style.display = 'flex';
      exportContentRef.current.innerHTML = '';

      pageQRCodes.forEach(data => {
        const qrWrapper = document.createElement('div');
        const qrCanvas = document.createElement('canvas');
        QRCode.toCanvas(qrCanvas, buildVoucherQRCode(data.qrCodeId), { width: QR_EXPORT_SIZE_PX });
        qrCanvas.style.width = `${QR_EXPORT_SIZE_CM}cm`;
        qrCanvas.style.height = `${QR_EXPORT_SIZE_CM}cm`;
        qrCanvas.style.margin = '5px';
        qrWrapper.appendChild(qrCanvas);
        exportContentRef.current.appendChild(qrWrapper);
      });

      await new Promise(resolve => setTimeout(resolve, 1000));
      const canvas = await html2canvas(exportContainerRef.current, {
        scale: 1.2,
        allowTaint: true,
        useCORS: true,
        scrollX: 0,
        scrollY: 0,
      });
      const imgData = canvas.toDataURL('image/jpeg');

      pdf.addImage(
        imgData,
        'JPEG',
        MARGIN_CM,
        MARGIN_CM,
        PAGE_WIDTH_CM - 2 * MARGIN_CM,
        PAGE_HEIGHT_CM - 2 * MARGIN_CM,
      );
    }

    pdf.save(`${formValues.description || 'qr-code-list'}.pdf`);

    // Reset state and form, hide container
    exportContainerRef.current.style.display = 'none';
    setState(initialState);
    onCancel?.({} as any);
    form.resetFields();
  }, [form, qrCodes, onCancel, setState]);

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
          value={buildVoucherQRCode(qrCode.qrCodeId)}
          size={105}
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
      <div
        ref={exportContainerRef}
        id="qr-export-container"
        className="flex flex-col items-center"
        style={{
          position: 'fixed',
          zIndex: -1,
          display: 'none',
          width: `${PAGE_WIDTH_CM - 2 * MARGIN_CM}cm`,
          height: `${PAGE_HEIGHT_CM - 2 * MARGIN_CM}cm`,
        }}
      >
        <div ref={exportContentRef} className="flex flex-wrap justify-between w-full h-fit"></div>
      </div>
    </>
  );
};
