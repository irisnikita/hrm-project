// Libraries
import { App } from 'antd';
import { useTranslations } from 'next-intl';

// Queries
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from '@tanstack/react-query';

// Constants
import { QUERY_KEYS } from '@/constants';

// Services
import { GetQRCodeListArgs, qrCodeService } from '@/services';

// Types
import { StrapiResponse } from '@/types';

// Schemas
import { CreateQRCode, QRCode } from '@/schemas';

interface UseGetQRCodeListProps {
  args?: GetQRCodeListArgs;
  options?: Partial<
    UseQueryOptions<StrapiResponse<QRCode[]>, Error, StrapiResponse<QRCode[]>, any[]>
  >;
}

interface UseCreateQRCodeProps {
  options?: UseMutationOptions<StrapiResponse<QRCode>, Error, CreateQRCode>;
}

interface UseBulkCreateQRCodeProps {
  options?: UseMutationOptions<StrapiResponse<boolean>, Error, CreateQRCode['data'][]>;
}

export const useGetQrCodeList = ({ args, options }: UseGetQRCodeListProps = {}) =>
  useQuery({
    queryKey: [QUERY_KEYS.QR_CODE_LIST, args],
    queryFn: () => qrCodeService.getQRCodeList(args),
    ...options,
  });

export const useCreateQRCode = ({ options }: UseCreateQRCodeProps = {}) => {
  return useMutation({
    mutationFn: qrCodeService.createQRCode,
    ...options,
  });
};

export const useBulkCreateQRCode = ({ options }: UseBulkCreateQRCodeProps = {}) => {
  const queryClient = useQueryClient();
  const { message } = App.useApp();
  const t = useTranslations();

  return useMutation({
    mutationFn: qrCodeService.bulkCreateQRCode,
    onSettled: data => {
      const isError = !data?.data;

      message[isError ? 'error' : 'success'](
        t(isError ? 'apiMessages.createdFailed' : 'apiMessages.createdSuccess', {
          name: t('qrCode.title'),
        }),
      );

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.QR_CODE_LIST],
        exact: false,
      });

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.DATA_TABLE_LIST],
        exact: false,
      });
    },
    ...options,
  });
};
