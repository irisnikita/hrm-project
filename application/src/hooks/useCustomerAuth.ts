// Libraries
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

// Queries
import { useGetOrganizationList } from '@/queries';

// Constants
import { SIGN_UP_TYPES } from '@/constants';

export const useCustomerAuth = () => {
  const searchParams = useSearchParams();
  const type = searchParams.get('type');
  const organizationKey = searchParams.get('organization');

  const { data: organizationData, isLoading } = useGetOrganizationList({
    args: {
      params: {
        'filters[slug][$eq]': organizationKey,
      },
    },
  });
  const organization = organizationData?.data?.[0];

  // Memos
  const isShowCustomerSignForm = useMemo(() => {
    if (type === SIGN_UP_TYPES.CUSTOMER && !!organization) {
      return true;
    }

    return false;
  }, [organization, type]);

  return {
    type,
    organization,
    isLoading,
    isShowCustomerSignForm,
  };
};
