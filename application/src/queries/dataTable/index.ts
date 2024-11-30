// Queries
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

// Constants
import { QUERY_KEYS } from '@/constants';

// Services
import { dataTableService, GetDataTableListArgs } from '@/services';

// Types
import { StrapiResponse } from '@/types';

interface UseGetDataTableProps<DT = any> {
  args: GetDataTableListArgs;
  options?: Partial<UseQueryOptions<StrapiResponse<DT[]>, Error, StrapiResponse<DT[]>, any[]>>;
}

export const useGetDataTableList = <DT = any>({ args, options }: UseGetDataTableProps<DT>) =>
  useQuery({
    queryKey: [QUERY_KEYS.DATA_TABLE_LIST, args],
    queryFn: () => dataTableService.getDataTableListing(args),
    ...options,
  });
