'use client';

// Libraries
import { useCallback } from 'react';
import { useImmer } from 'use-immer';

// Components
import { Card } from '@/components/ui';
import { CreateQrCodeModal } from './components';
import { DataTable, useDataTable } from '@/components/shared';

// Schemas
import { QRCode } from '@/schemas';

type TState = {
  isOpenModal?: boolean;
};

type DataType = QRCode['attributes'] & {
  key: string;
};

export default function QrCodesPage() {
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
  });

  const onClickCreateQrCode = useCallback(() => {
    setState(draft => {
      draft.isOpenModal = !draft.isOpenModal;
    });
  }, [setState]);

  return (
    <>
      <Card className="h-full">
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
