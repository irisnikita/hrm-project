// Queries
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

// Constants
import { QUERY_KEYS } from '@/constants';

// Services
import { GetProductListArgs, productService } from '@/services';

// Types
import { StrapiResponse } from '@/types';

// Schemas
import { Product } from '@/schemas';

interface UseGetProductListProps {
  args?: GetProductListArgs;
  options?: Partial<
    UseQueryOptions<StrapiResponse<Product[]>, Error, StrapiResponse<Product[]>, any[]>
  >;
}

export const useGetProductList = ({ args, options }: UseGetProductListProps = {}) =>
  useQuery({
    queryKey: [QUERY_KEYS.PRODUCT_LIST, args],
    queryFn: () => productService.getProductList(args),
    ...options,
  });
