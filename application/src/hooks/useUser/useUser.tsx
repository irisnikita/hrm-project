// Libraries
import { useUser as useClerkUser } from '@clerk/nextjs';
import { useSession } from 'next-auth/react';

// Queries
import { useGetUserDetail, useGetUserList } from '@/queries/user';

// Schemas
import { User } from '@/schemas';

// Hooks
import { useUserConfig } from '../useUserConfig';

// Utils
import { combineUserInfo } from './utils';
import { useMemo } from 'react';

export const useUser = () => {
  const { userConfig } = useUserConfig();
  const session = useSession();
  const { user, isLoaded, isSignedIn } = useClerkUser();
  const { id: nextAuthId } = session?.data || {};
  const { id } = user || {};
  const { data: users, isLoading: isLoadingUsers } = useGetUserList({
    args: {
      params: {
        'filters[userId][$eq]': id,
        populate: 'organizations,role',
      },
    },
    options: {
      enabled: !!id,
    },
  });
  const { data: nextAuthUser, isLoading: isLoadingNextAuth } = useGetUserDetail({
    args: {
      id: `${nextAuthId || ''}`,
      params: {
        populate: 'organizations,role',
      },
    },
  });
  const systemUser = nextAuthUser || (users?.[0] as User);
  console.log("🚀 ~ useUser ~ systemUser:", systemUser)

  const organization = useMemo(() => {
    return systemUser?.organizations?.find(
      organization => organization.id === userConfig.organizationId,
    );
  }, [systemUser?.organizations, userConfig.organizationId]);

  return {
    clerkUser: user,
    systemUser,
    user: combineUserInfo({ clerkUser: user, systemUser }),
    isLoaded,
    isSignedIn,
    role: systemUser?.role,
    organization,
    session,
    isLoading: isLoadingUsers || isLoadingNextAuth,
  };
};
