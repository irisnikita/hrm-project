'use client';

// Libraries
import { useCallback } from 'react';
import { useImmer } from 'use-immer';

// Components
import { Button, Card } from '@/components/ui';
import { CreateQrCodeModal } from './components';

type TState = {
  isOpenModal?: boolean;
};

export default function QrCodesPage() {
  // State
  const [state, setState] = useImmer<TState>({
    isOpenModal: false,
  });
  const { isOpenModal } = state;

  const onClickCreateQrCode = useCallback(() => {
    setState(draft => {
      draft.isOpenModal = !draft.isOpenModal;
    });
  }, [setState]);

  return (
    <>
      <Card className="h-full">
        <Button onClick={onClickCreateQrCode}>Create QR Code</Button>
        {/* <Flex gap={8} vertical>
          <QRCodeSVG
            value={zaloMiniAppURL}
            size={200} // size of the QR code
            fgColor="#000000" // foreground color
            bgColor="#ffffff" // background color
            level="H" // error correction level ('L', 'M', 'Q', 'H')
          />
        </Flex> */}
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
