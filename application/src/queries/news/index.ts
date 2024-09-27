// Libraries
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

// Services
import { GetNewsListArgs, newsService } from '@/services';

// Types
import { StrapiResponse } from '@/types';

// Schemas
import { News } from '@/schemas';

// Constants
import { QUERY_KEYS } from '@/constants';

// Hooks
import { useOrganization } from '@/hooks';

interface UseGetNewsListProps {
  args?: GetNewsListArgs;
  options?: UseQueryOptions<StrapiResponse<News[]>, Error, StrapiResponse<News[]>, any[]>;
}

export const useGetNewsList = (props?: UseGetNewsListProps) => {
  const { currentOrganizationId } = useOrganization();
  const { options } = props || {};

  const args = {
    ...props?.args,
    params: {
      'filters[organization][$eq]': currentOrganizationId,
      ...props?.args?.params,
    },
  };

  return useQuery({
    queryKey: [QUERY_KEYS.NEWS_LIST, args],
    queryFn: () => newsService.getNewsList(args),
    ...options,
  });
};
