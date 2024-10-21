// Schemas
import { UserRoleType } from '@/schemas';
import { USER_ROLES } from './auth';

export const ROUTE_KEYS = {
  HOME: 'home',
  OVERVIEW: 'overview',
  MANAGEMENT: 'management',
  ORG_CHART: 'org-chart',
  EMPLOYEES: 'employees',
  ACCOUNT: 'account',
  ACCOUNT_SETTING: 'account-setting',
  PROFILE: 'profile',
  SIGN_UP: 'sign-up',
  SIGN_IN: 'sign-in',
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
} = ROUTE_KEYS;
const { ADMIN, EMPLOYEE, MANAGER, USER, AUTHENTICATED } = USER_ROLES;

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
  [OVERVIEW]: {
    key: OVERVIEW,
    label: 'menu.overview',
    path: '/dashboard',
    roles: fullRoles,
  },
  [ORG_CHART]: {
    key: ORG_CHART,
    label: 'menu.orgChart',
    path: '/dashboard/org-chart',
    roles: fullRoles,
  },
  [HOME]: {
    key: HOME,
    label: 'menu.home',
    path: '/',
    roles: fullRoles,
  },
  [MANAGEMENT]: {
    key: MANAGEMENT,
    label: 'menu.management',
    path: '/dashboard/management',
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
    roles: fullRoles,
  },
  [ACCOUNT_SETTING]: {
    key: ACCOUNT_SETTING,
    label: 'menu.accountSetting',
    path: '/dashboard/account-setting',
    roles: fullRoles,
  },
  [PROFILE]: {
    key: PROFILE,
    label: 'menu.profile',
    path: '/dashboard/profile',
    roles: fullRoles,
  },
};
