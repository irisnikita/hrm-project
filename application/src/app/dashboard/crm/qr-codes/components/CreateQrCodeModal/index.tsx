'use client';

// Libraries
import React, { useCallback, useMemo } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { useImmer } from 'use-immer';
import { nanoid } from 'nanoid';

// Components
import { Flex, Form, Input, Modal, ModalProps, Scrollbars, Typography } from '@/components/ui';
import { ClientSelect, ProductSelect } from '@/components/shared';
import { useCreateQRCode } from '@/queries';
import { QR_CODE_STATUS } from '@/constants';

interface CreateQrCodeDrawerProps extends ModalProps {}

type TFormValues = {
  description: string;
  points: number;
  expiresAt: string;
  image: any;
  client: number;
  product: number;
  quantity: number;
};

const initialState = {
  isOpenQRModal: false,
};

const ZALO_MINI_APP_URL = 'https://zalo.me/s/3516483688051051916/?env=TESTING&version=1';

export const CreateQrCodeModal: React.FC<CreateQrCodeDrawerProps> = props => {
  const { onCancel, ...restProps } = props;

  const [form] = Form.useForm<TFormValues>();
  const [state, setState] = useImmer(initialState);
  const { isOpenQRModal } = state;

  const formValues = Form.useWatch([], form);

  // Mutations
  const { mutateAsync: createQRCode } = useCreateQRCode({});

  // Memos
  const qrCodes = useMemo(() => {
    const { description, product, quantity, client, points } = formValues || {};

    return Array.from({ length: quantity }).map(() => ({
      qrCodeId: nanoid(),
      description,
      product,
      points,
      client,
    }));
  }, [formValues]);

  // Handlers
  const handleOnCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      form.resetFields();

      setState(initialState);
      onCancel?.(e);
    },
    [onCancel, form],
  );

  const onFinish = useCallback(() => {
    setState(draft => {
      draft.isOpenQRModal = true;
    });
  }, [setState]);

  const onSaveAndExportQrCodeList = useCallback(async () => {
    await Promise.all(
      qrCodes.map(async ({ qrCodeId, client, description, points, product }) => {
        await createQRCode({
          data: {
            qrCodeId,
            description,
            points,
            status: QR_CODE_STATUS.ACTIVE,
            product,
            client,
          },
        });
      }),
    );
  }, [createQRCode, qrCodes]);

  // Renders
  const renderQRCodeList = () => {
    return qrCodes.map(qrCode => (
      <Flex vertical gap={8} key={qrCode.qrCodeId}>
        <QRCodeCanvas
          value={`${ZALO_MINI_APP_URL}&qrCodeId=${qrCode.qrCodeId}`}
          size={105} // size of the QR code
          fgColor="#000000" // foreground color
          bgColor="#ffffff" // background color
          level="H" // error correction level ('L', 'M', 'Q', 'H')
        />
        <Typography.Text className="w-[100px]" ellipsis={{ tooltip: true }}>
          {qrCode.qrCodeId}
        </Typography.Text>
      </Flex>
    ));
  };

  return (
    <>
      <Modal title="Create QR Code" onCancel={handleOnCancel} onOk={form.submit} {...restProps}>
        <Form name="create-qr-code" form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item<TFormValues> name="description" label="Description">
            <Input />
          </Form.Item>

          <Form.Item<TFormValues> name="product" label="Product" rules={[{ required: true }]}>
            <ProductSelect
              onChange={(value, option) => {
                form.setFieldsValue({
                  points: +(option as any)?.points,
                });
              }}
            />
          </Form.Item>

          <Form.Item<TFormValues> name="client" label="Client" rules={[{ required: true }]}>
            <ClientSelect />
          </Form.Item>

          <Form.Item<TFormValues>
            name="quantity"
            label="Quantity"
            rules={[{ required: true }, { max: 100 }]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item<TFormValues> name="points" label="Points" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        open={isOpenQRModal}
        title="QR Code list"
        okText="Save and Export"
        centered
        onCancel={() =>
          setState(draft => {
            draft.isOpenQRModal = false;
          })
        }
        onOk={onSaveAndExportQrCodeList}
      >
        <Scrollbars autoHeight autoHeightMax={500}>
          <Flex gap={16} wrap className="mt-4">
            {renderQRCodeList()}
          </Flex>
        </Scrollbars>
      </Modal>
    </>
  );
};
