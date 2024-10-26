// Queries
import { useGetOrganizationList } from '@/queries/organization';

// Hooks
import { useUser } from './useUser';
import { useUserConfig } from './useUserConfig';
import { useCallback } from 'react';

export const useOrganization = () => {
  const { user, organization } = useUser();
  const { setUserConfig, userConfig } = useUserConfig();
  const { data, isLoading } = useGetOrganizationList({
    args: {
      params: {
        populate: 'logo,owner',
        'filters[users][$in]': user?.id || 0,
      },
    },
  });

  const onChangeOrganization = useCallback(
    (organizationId?: number) => {
      setUserConfig(prev => ({ ...prev, organizationId }));
    },
    [setUserConfig],
  );

  return {
    organizationList: data?.data,
    currentOrganizationId: userConfig?.organizationId,
    currentOrganization: organization,
    isLoading,
    onChangeOrganization,
  };
};
