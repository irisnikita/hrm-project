'use client';

// Libraries
import { useCallback } from 'react';
import { useImmer } from 'use-immer';
import { useTranslations } from 'next-intl';

// Components
import { Card, Typography, Tag } from '@/components/ui';
import { CreateQrCodeModal } from './components';
import { DataTable, renderDate, useDataTable } from '@/components/shared';

// Schemas
import { QRCode } from '@/schemas';
import { QR_CODE_STATUS_OPTIONS } from '@/constants';

type TState = {
  isOpenModal?: boolean;
};

type DataType = QRCode['attributes'] & {
  key: string;
};

const { Text } = Typography;

export default function QrCodesPage() {
  const t = useTranslations();

  // State
  const [state, setState] = useImmer<TState>({
    isOpenModal: false,
  });
  const { isOpenModal } = state;

  // Hooks
  const { table } = useDataTable<DataType>({
    config: {
      objectType: 'qr-codes',
    },
    table: {
      columns: {
        qrCodeId: {
          render(value) {
            return (
              <Text strong className="!text-primary">
                {value}
              </Text>
            );
          },
        },
        status: {
          render(value) {
            const qrCodeStatus = QR_CODE_STATUS_OPTIONS.find(
              qrCodeStatus => qrCodeStatus.key === value,
            );

            return (
              <Tag bordered={false} color={qrCodeStatus?.tagColor}>
                {t(qrCodeStatus?.label || ('' as any))}
              </Tag>
            );
          },
        },
        createdAt: {
          render(value) {
            return <Text>{renderDate(value)}</Text>;
          },
        },
      },
    },
  });

  const onClickCreateQrCode = useCallback(() => {
    setState(draft => {
      draft.isOpenModal = !draft.isOpenModal;
    });
  }, [setState]);

  return (
    <>
      <Card
        classNames={{
          body: '!px-0 h-full overflow-auto',
        }}
        className="h-full"
      >
        <DataTable<DataType>
          toolbarProps={{
            addButtonProps: {
              onClick: onClickCreateQrCode,
            },
          }}
          tableProps={{
            ...table,
          }}
        />
      </Card>

      <CreateQrCodeModal
        open={isOpenModal}
        onCancel={() =>
          setState(draft => {
            draft.isOpenModal = false;
          })
        }
      />
    </>
  );
}
