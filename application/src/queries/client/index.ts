// Queries
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

// Constants
import { QUERY_KEYS } from '@/constants';

// Services
import { clientService, GetClientListArgs } from '@/services';

// Types
import { StrapiResponse } from '@/types';

// Schemas
import { Client } from '@/schemas';

interface UseGetClientListProps {
  args?: GetClientListArgs;
  options?: Partial<
    UseQueryOptions<StrapiResponse<Client[]>, Error, StrapiResponse<Client[]>, any[]>
  >;
}

export const useGetClientList = ({ args, options }: UseGetClientListProps = {}) =>
  useQuery({
    queryKey: [QUERY_KEYS.CLIENT_LIST, args],
    queryFn: () => clientService.getClientList(args),
    ...options,
  });
