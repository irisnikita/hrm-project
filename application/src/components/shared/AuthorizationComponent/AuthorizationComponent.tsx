'use client';

// Schemas
import { UserRoleType } from '@/schemas';

// Hooks
import { useOrganizationRole } from '@/hooks';

interface AuthorizationComponentProps {
  allowedRoles: UserRoleType[];
  children?: React.ReactNode;
}

export const AuthorizationComponent: React.FC<AuthorizationComponentProps> = ({
  allowedRoles,
  children,
}) => {
  const { role } = useOrganizationRole();

  if (!allowedRoles.includes(role as UserRoleType)) {
    return null;
  }

  return <>{children}</>;
};
