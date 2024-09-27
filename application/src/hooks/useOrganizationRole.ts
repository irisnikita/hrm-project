import { useGetOrganizationRoleList } from '@/queries/organizationRole';
import { useUser } from './useUser';

export const useOrganizationRole = () => {
  const { organization, systemUser, isLoading: isLoadingUser } = useUser();
  const { data: organizationRoleData, isLoading: isLoadingOrganizationRole } =
    useGetOrganizationRoleList({
      args: {
        params: {
          populate: 'role',
          'filters[organization][$eq]': organization?.id,
          'filters[user][$eq]': systemUser?.id,
        },
      },
    });

  return {
    role: organizationRoleData?.data[0]?.attributes?.role,
    isLoading: isLoadingUser || isLoadingOrganizationRole,
  };
};
