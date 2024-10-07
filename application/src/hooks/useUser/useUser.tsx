// Libraries
import { useUser as useClerkUser } from '@clerk/nextjs';

// Queries
import { useGetUserList } from '@/queries/user';
import { useGetOrganization } from '@/queries/organization';

// Schemas
import { User } from '@/schemas';

// Hooks
import { useUserConfig } from '../useUserConfig';

// Utils
import { combineUserInfo } from './utils';

export const useUser = () => {
  const { userConfig } = useUserConfig();
  const { user, isLoaded, isSignedIn } = useClerkUser();
  const { id } = user || {};

  const { data: users, isLoading: isLoadingUsers } = useGetUserList({
    args: {
      params: {
        'filters[userId][$eq]': id,
        populate: 'organizations,role',
      },
    },
  });
  const { data: organization, isLoading: isLoadingOrganization } = useGetOrganization({
    args: {
      id: userConfig.organizationId || -1,
      params: {
        populate: 'logo,owner',
      },
    },
  });

  const systemUser = users?.[0] as User;

  return {
    clerkUser: user,
    systemUser,
    user: combineUserInfo({ clerkUser: user, systemUser }),
    isLoaded,
    isSignedIn,
    role: systemUser?.role,
    organization: organization?.data,
    isLoading: isLoadingUsers || isLoadingOrganization,
  };
};
