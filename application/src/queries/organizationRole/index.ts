// Libraries
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

// Services
import { GetOrganizationRoleArgs, organizationRoleService } from '@/services/organizationRole';

// Constants
import { QUERY_KEYS } from '@/constants';

// Types
import { StrapiResponse } from '@/types';

// Schemas
import { OrganizationRole } from '@/schemas';

interface UseGetOrganizationRoleListProps {
  args?: GetOrganizationRoleArgs;
  options?: UseQueryOptions<
    StrapiResponse<OrganizationRole[]>,
    Error,
    StrapiResponse<OrganizationRole[]>,
    any[]
  >;
}

export const useGetOrganizationRoleList = (props?: UseGetOrganizationRoleListProps) => {
  const { args } = props || {};

  return useQuery({
    queryKey: [QUERY_KEYS.ORGANIZATION_ROLE_LIST, args],
    queryFn: () => organizationRoleService.getOrganizationRoleList(args),
    ...props?.options,
  });
};
