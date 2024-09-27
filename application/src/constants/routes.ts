// Schemas
import { UserRoleType } from '@/schemas';
import { USER_ROLES } from './auth';

export const ROUTE_KEYS = {
  HOME: 'home',
  OVERVIEW: 'overview',
  MANAGEMENT: 'management',
  ORG_CHART: 'org-chart',
  EMPLOYEES: 'employees',
} as const;
const { HOME, OVERVIEW, MANAGEMENT, ORG_CHART, EMPLOYEES } = ROUTE_KEYS;
const { ADMIN, EMPLOYEE, MANAGER, USER, AUTHENTICATED } = USER_ROLES;

type RouteKey = (typeof ROUTE_KEYS)[keyof typeof ROUTE_KEYS];

type Route = Record<
  RouteKey,
  {
    key: RouteKey;
    label: string;
    path: string;
    roles: UserRoleType[];
  }
>;

export const ROUTES: Route = {
  [OVERVIEW]: {
    key: ROUTE_KEYS.OVERVIEW,
    label: 'menu.overview',
    path: '/dashboard',
    roles: [ADMIN, MANAGER, EMPLOYEE, USER, AUTHENTICATED],
  },
  [ORG_CHART]: {
    key: ROUTE_KEYS.ORG_CHART,
    label: 'menu.orgChart',
    path: '/dashboard/org-chart',
    roles: [ADMIN, MANAGER, EMPLOYEE, USER, AUTHENTICATED],
  },
  [HOME]: {
    key: ROUTE_KEYS.HOME,
    label: 'menu.home',
    path: '/',
    roles: [ADMIN, MANAGER, EMPLOYEE, USER, AUTHENTICATED],
  },
  [MANAGEMENT]: {
    key: ROUTE_KEYS.MANAGEMENT,
    label: 'menu.management',
    path: '/dashboard/management',
    roles: [ADMIN, MANAGER, EMPLOYEE, USER, AUTHENTICATED],
  },
  [EMPLOYEES]: {
    key: ROUTE_KEYS.EMPLOYEES,
    label: 'menu.employees',
    path: '/dashboard/employees',
    roles: [ADMIN],
  },
};
