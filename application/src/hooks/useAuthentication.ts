'use client';

// Libraries
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

// Hooks
import { useOrganizationRole } from './useOrganizationRole';

// Constants
import { ROUTES } from '@/constants';

// Schemas
import { UserRoleType } from '@/schemas';

export const useAuthentication = () => {
  const pathname = usePathname();
  const { role, isLoading } = useOrganizationRole();
  const routeInfo = Object.values(ROUTES).find(route => route.path === pathname);

  const isAuthenticated = useMemo(() => {
    return routeInfo?.roles.includes(role as UserRoleType);
  }, [role, routeInfo]);

  return {
    isAuthenticated,
    isLoading,
  };
};
