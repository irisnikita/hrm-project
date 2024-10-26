// Libraries
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

// Queries
import { useGetOrganizationList } from '@/queries';

// Types
import { UserRole } from '@/types';
import { Organization } from '@/schemas';

type Config = {
  role?: UserRole;
  organization?: Organization;
};

export const useAuthPage = () => {
  const searchParams = useSearchParams();
  const role = searchParams.get('role');
  const organizationKey = searchParams.get('organization');

  const { data: organizationData, isLoading } = useGetOrganizationList({
    args: {
      params: {
        'filters[slug][$eq]': organizationKey,
      },
    },
    options: {
      enabled: !!organizationKey,
    },
  });
  const organization = organizationData?.data?.[0];

  // Memo
  const config: Config = useMemo(() => {
    return {
      organization: organization as Organization,
      role: role as UserRole,
    };
  }, [organization, role]);

  return {
    config,
    isLoading,
  };
};
