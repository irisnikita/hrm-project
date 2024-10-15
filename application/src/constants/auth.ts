export const USER_ROLES = {
  ADMIN: 'admin',
  EMPLOYEE: 'employee',
  MANAGER: 'manager',
  USER: 'user',
  AUTHENTICATED: 'authenticated',
  CUSTOMER: 'customer',
} as const;

export const USER_ROLE_IDS = {
  ADMIN: 3,
  EMPLOYEE: 4,
  MANAGER: 5,
  CUSTOMER: 6,
  PUBLIC: 2,
  AUTHENTICATED: 1,
};
