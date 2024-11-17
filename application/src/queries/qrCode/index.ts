// Queries
import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from '@tanstack/react-query';

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
