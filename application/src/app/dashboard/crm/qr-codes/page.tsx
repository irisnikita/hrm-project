'use client';

// Libraries
import { useCallback } from 'react';
import { useImmer } from 'use-immer';
import { useTranslations } from 'next-intl';
import { useSearchParams, useRouter } from 'next/navigation';

// Components
import { Card, Typography, Tag } from '@/components/ui';
import { CreateQrCodeModal, QrCodeDetail } from './components';
import { DataTable, renderDate, useDataTable } from '@/components/shared';

// Schemas
import { QRCode } from '@/schemas';
import { QR_CODE_STATUS_OPTIONS } from '@/constants';

type TState = {
  isOpenModal?: boolean;
  selectedQrCode?: null | DataType;
};

type DataType = QRCode['attributes'] & {
  key: string;
};

const { Text } = Typography;

export default function QrCodesPage() {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const router = useRouter();

  // State

  const [state, setState] = useImmer<TState>({
    isOpenModal: false,
    selectedQrCode: null,
  });
  const { isOpenModal } = state;

  // Handlers
  const onClickQrCode = useCallback((record: DataType) => {
    setState(draft => {
      draft.selectedQrCode = record;
    });
    // const params = new URLSearchParams(searchParams.toString());
    // params.set('qrCodeId', qrCodeId);

    // router.push(`/dashboard/crm/qr-codes?${params.toString()}`);
  }, []);

  // Hooks
  const { table } = useDataTable<DataType>({
    config: {
      objectType: 'qr-codes',
    },
    table: {
      columns: {
        qrCodeId: {
          render(value, record) {
            return (
              <Text
                strong
                className="!text-primary cursor-pointer"
                onClick={() => onClickQrCode(record)}
              >
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

      <QrCodeDetail
        open={!!state.selectedQrCode}
        qrCode={state.selectedQrCode as any}
        onClose={() =>
          setState(draft => {
            draft.selectedQrCode = null;
          })
        }
      />

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
