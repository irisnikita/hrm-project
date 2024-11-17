// Schemas
import { UserRoleType } from '@/schemas';
import { USER_ROLES } from './auth';

export const ROUTE_KEYS = {
  // Home
  HOME: 'home',
  OVERVIEW: 'overview',
  MANAGEMENT: 'management',
  ORG_CHART: 'org-chart',
  EMPLOYEES: 'employees',

  // Account
  ACCOUNT: 'account',
  ACCOUNT_SETTING: 'account-setting',
  PROFILE: 'profile',

  // Auth
  SIGN_UP: 'sign-up',
  SIGN_IN: 'sign-in',

  // CRM
  CRM: 'crm',
  CUSTOMERS: 'customers',
  CUSTOMER_LOYALTY: 'customer-loyalty',
  POINTS_MANAGEMENT: 'points-management',
  REWARDS: 'rewards',
  QR_CODES: 'qr-codes',
} as const;
const {
  HOME,
  OVERVIEW,
  MANAGEMENT,
  ORG_CHART,
  EMPLOYEES,
  ACCOUNT,
  ACCOUNT_SETTING,
  PROFILE,
  SIGN_UP,
  SIGN_IN,
  CRM,
  CUSTOMERS,
  CUSTOMER_LOYALTY,
  POINTS_MANAGEMENT,
  REWARDS,
  QR_CODES,
} = ROUTE_KEYS;
const { ADMIN, EMPLOYEE, MANAGER, USER, AUTHENTICATED, CUSTOMER } = USER_ROLES;

type RouteKey = (typeof ROUTE_KEYS)[keyof typeof ROUTE_KEYS];

type Route = Record<
  RouteKey,
  {
    key: RouteKey;
    label: string;
    path?: string;
    roles: UserRoleType[];
  }
>;

const fullRoles = [ADMIN, MANAGER, EMPLOYEE, USER, AUTHENTICATED];
const fullCustomerRoles = [...fullRoles, CUSTOMER];

export const ROUTES: Route = {
  [SIGN_IN]: {
    key: SIGN_IN,
    label: 'signIn.title',
    path: '/sign-in',
    roles: fullRoles,
  },
  [SIGN_UP]: {
    key: SIGN_UP,
    label: 'signUp.title',
    path: '/sign-up',
    roles: fullRoles,
  },
  [HOME]: {
    key: HOME,
    label: 'menu.home',
    path: '/',
    roles: fullCustomerRoles,
  },
  [OVERVIEW]: {
    key: OVERVIEW,
    label: 'menu.overview',
    path: '/dashboard',
    roles: fullCustomerRoles,
  },
  [MANAGEMENT]: {
    key: MANAGEMENT,
    label: 'menu.management',
    path: '/dashboard/management',
    roles: fullRoles,
  },
  [ORG_CHART]: {
    key: ORG_CHART,
    label: 'menu.orgChart',
    path: '/dashboard/org-chart',
    roles: fullRoles,
  },

  [EMPLOYEES]: {
    key: EMPLOYEES,
    label: 'menu.employees',
    path: '/dashboard/employees',
    roles: [ADMIN],
  },
  [ACCOUNT]: {
    key: ACCOUNT,
    label: 'menu.account',
    roles: fullCustomerRoles,
  },
  [ACCOUNT_SETTING]: {
    key: ACCOUNT_SETTING,
    label: 'menu.accountSetting',
    path: '/dashboard/account-setting',
    roles: fullCustomerRoles,
  },
  [PROFILE]: {
    key: PROFILE,
    label: 'menu.profile',
    path: '/dashboard/profile',
    roles: fullCustomerRoles,
  },

  // CRM
  [CRM]: {
    key: CRM,
    label: 'menu.crm',
    path: '/dashboard/crm',
    roles: [ADMIN, MANAGER],
  },
  [CUSTOMERS]: {
    key: CUSTOMERS,
    label: 'menu.customers',
    path: '/dashboard/crm/customers',
    roles: [ADMIN, MANAGER],
  },
  [CUSTOMER_LOYALTY]: {
    key: CUSTOMER_LOYALTY,
    label: 'menu.customerLoyalty',
    path: '/dashboard/crm/customer-loyalty',
    roles: [ADMIN, MANAGER],
  },
  [POINTS_MANAGEMENT]: {
    key: POINTS_MANAGEMENT,
    label: 'menu.pointsManagement',
    path: '/dashboard/crm/points-management',
    roles: [ADMIN, MANAGER],
  },
  [REWARDS]: {
    key: REWARDS,
    label: 'menu.rewards',
    path: '/dashboard/crm/rewards',
    roles: [ADMIN, MANAGER],
  },
  [QR_CODES]: {
    key: QR_CODES,
    label: 'menu.qrCodes',
    path: '/dashboard/crm/qr-codes',
    roles: [ADMIN, MANAGER],
  },
};
