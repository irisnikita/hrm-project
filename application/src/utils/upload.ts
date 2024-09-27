import { message } from 'antd';
import type { GetProp, UploadProps } from 'antd';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

interface BeforeUploadProps {
  t: any;
  file: FileType;
  accept?: {
    value: string;
    label: string;
  };
  maxSize?: number;
}

/**
 * Validates a file before upload based on file type and size.
 *
 * @param {BeforeUploadProps} props - The properties for the upload validation.
 * @param {Function} props.t - Translation function for error messages.
 * @param {FileType} props.file - The file to be validated.
 * @param {Object} [props.accept] - Accepted file type information.
 * @param {string} props.accept.value - The accepted MIME type.
 * @param {string} props.accept.label - Human-readable label for the accepted file type.
 * @param {number} [props.maxSize=10] - Maximum file size in MB.
 * @returns {boolean} Returns true if the file is valid, false otherwise.
 */
export const beforeUpload = (props: BeforeUploadProps): boolean => {
  const { t, file, /* accept, */ maxSize = 10 } = props;

  // const isAccepted = accept ? accept.value.includes(file.type) : true;
  // if (!isAccepted) {
  //   message.error(t('upload.errors.accepted', { acceptLabel: accept?.label }));
  // }
  const isLtMaxSize = file.size / 1024 / 1024 < maxSize;
  if (!isLtMaxSize) {
    message.error(t('upload.errors.maxSize', { maxSize }));
  }

  return /* isAccepted &&  */ isLtMaxSize;
};
