/* eslint-disable jsx-a11y/alt-text */
// Libraries
import { Upload as AntdUpload, UploadProps as AntdUploadProps } from 'antd';
import clsx from 'clsx';
import { UploadIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import { useImmer } from 'use-immer';

// Components
import { Flex } from '@/components/ui/Flex';
import { Image } from '@/components/ui/Image';
import { Typography } from '@/components/ui/Typography';

// Constants
import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE } from '@/constants';

// Utils
import { beforeUpload, getBase64 } from '@/utils';

export interface UploadProps extends AntdUploadProps {
  maxSize?: number;
}

type TState = {
  previewVisible: boolean;
  previewImage: string;
};

const { Dragger } = AntdUpload;
const { Text } = Typography;

export const Upload: React.FC<UploadProps> = ({
  className,
  accept = ALLOWED_FILE_TYPES.IMAGE.value,
  listType = 'picture',
  multiple = false,
  ...props
}) => {
  const [state, setState] = useImmer<TState>({
    previewVisible: false,
    previewImage: '',
  });

  const t = useTranslations();
  const { maxSize = MAX_FILE_SIZE.IMAGE } = props;

  // Variables
  const { previewVisible, previewImage } = state;

  // Memos
  const acceptLabel = useMemo(() => {
    const allowedFileType = Object.values(ALLOWED_FILE_TYPES).find(item => item.value === accept);

    return allowedFileType?.label;
  }, [accept]);

  // Handlers
  const onPreview = async (file: any) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setState(draft => {
      draft.previewVisible = true;
      draft.previewImage = file.url || file.preview;
    });
  };

  return (
    <>
      <Dragger
        className={clsx(className)}
        accept={accept}
        listType={listType}
        multiple={multiple}
        onPreview={onPreview}
        beforeUpload={file =>
          beforeUpload({ t, file, accept: { value: accept, label: acceptLabel || '' }, maxSize })
        }
        {...props}
      >
        <Flex vertical align="center" justify="center" gap={8}>
          <UploadIcon />
          <Text ellipsis={{ tooltip: true }} className="!font-semibold">
            {t('upload.clickOrDrag')}
          </Text>
          <Text ellipsis={{ tooltip: true }} className="!text-xs">
            {t('upload.format', { format: acceptLabel })}
          </Text>
          <Text ellipsis={{ tooltip: true }} className="!text-xs">
            {t('upload.maxSize', { maxSize })}
          </Text>
        </Flex>
      </Dragger>
      {previewImage && (
        <Image
          wrapperStyle={{ display: 'none' }}
          preview={{
            visible: previewVisible,
            onVisibleChange: visible =>
              setState(draft => {
                draft.previewVisible = visible;
              }),
            afterOpenChange: visible =>
              !visible &&
              setState(draft => {
                draft.previewImage = '';
              }),
          }}
          src={previewImage}
        />
      )}
    </>
  );
};
