// Libraries
import { useSession } from 'next-auth/react';
import { useMemo } from 'react';

// Queries
import { useGetUserDetail } from '@/queries/user';

// Hooks
import { useUserConfig } from '../useUserConfig';

// Schemas
import { User } from '@/schemas';

export const useUser = () => {
  const { userConfig } = useUserConfig();
  const session = useSession();

  const { id: nextAuthId } = session?.data || {};
  const { data: user, isLoading: isLoadingNextAuth } = useGetUserDetail({
    args: {
      id: `${nextAuthId || ''}`,
      params: {
        populate: 'organizations,role',
      },
    },
  });

  const organization = useMemo(() => {
    return user?.organizations?.find(organization => organization.id === userConfig.organizationId);
  }, [user?.organizations, userConfig.organizationId]);

  return {
    user: user as User,
    role: user?.role,
    organization,
    session,
    isLoading: isLoadingNextAuth,
  };
};
