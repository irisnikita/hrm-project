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
import { GetOrganizationArgs, GetOrganizationListArgs, organizationService } from '@/services';

// Types
import { StrapiResponse } from '@/types';

// Schemas
import { CreateOrganization, Organization } from '@/schemas';

interface UseGetOrganizationListProps {
  args?: GetOrganizationListArgs;
  options?: UseQueryOptions<
    StrapiResponse<Organization[]>,
    Error,
    StrapiResponse<Organization[]>,
    any[]
  >;
}

interface UseGetOrganizationProps {
  args?: GetOrganizationArgs;
  options?: UseQueryOptions<
    StrapiResponse<Organization>,
    Error,
    StrapiResponse<Organization>,
    any[]
  >;
}

interface UseCreateOrganizationProps {
  options?: UseMutationOptions<StrapiResponse<Organization>, Error, CreateOrganization>;
}

export const useGetOrganization = (props?: UseGetOrganizationProps) => {
  const { args } = props || {};

  return useQuery({
    queryKey: [QUERY_KEYS.ORGANIZATION_DETAIL, args],
    queryFn: () => organizationService.getOrganization(args),
    ...props?.options,
  });
};

export const useGetOrganizationList = (props?: UseGetOrganizationListProps) => {
  const { args } = props || {};

  return useQuery({
    queryKey: [QUERY_KEYS.ORGANIZATION_LIST, args],
    queryFn: () => organizationService.getOrganizationList(args),
    ...props?.options,
  });
};

export const useCreateOrganization = (props?: UseCreateOrganizationProps) => {
  const queryClient = useQueryClient();
  const { message } = App.useApp();
  const t = useTranslations();

  return useMutation({
    mutationFn: organizationService.createOrganization,
    onSettled: data => {
      const isError = !data?.data;

      message[isError ? 'error' : 'success'](
        t(isError ? 'apiMessages.createdFailed' : 'apiMessages.createdSuccess', {
          name: t('organizationList.organization'),
        }),
      );

      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ORGANIZATION_LIST], exact: false });
      }, 1000);
    },
    ...props?.options,
  });
};
