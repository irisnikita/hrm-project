// Libraries
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from '@tanstack/react-query';

// Services
import { GetOrganizationRoleArgs, organizationRoleService } from '@/services/organizationRole';

// Constants
import { QUERY_KEYS } from '@/constants';

// Types
import { StrapiResponse } from '@/types';

// Schemas
import { CreateOrganizationDto, OrganizationRole } from '@/schemas';

interface UseGetOrganizationRoleListProps {
  args?: GetOrganizationRoleArgs;
  options?: UseQueryOptions<
    StrapiResponse<OrganizationRole[]>,
    Error,
    StrapiResponse<OrganizationRole[]>,
    any[]
  >;
}

interface UseCreateOrganizationProps {
  options?: UseMutationOptions<StrapiResponse<OrganizationRole>, Error, CreateOrganizationDto>;
}

export const useGetOrganizationRoleList = (props?: UseGetOrganizationRoleListProps) => {
  const { args } = props || {};

  return useQuery({
    queryKey: [QUERY_KEYS.ORGANIZATION_ROLE_LIST, args],
    queryFn: () => organizationRoleService.getOrganizationRoleList(args),
    ...props?.options,
  });
};

export const useCreateOrganizationRole = (props?: UseCreateOrganizationProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: organizationRoleService.createOrganizationRole,
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.ORGANIZATION_ROLE_LIST],
        exact: false,
      });
    },
    ...props?.options,
  });
};
