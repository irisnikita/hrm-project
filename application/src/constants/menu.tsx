'use client';

// Libraries
import { MenuProps } from 'antd';
import {
  AwardIcon,
  GaugeIcon,
  NetworkIcon,
  QrCodeIcon,
  SmileIcon,
  StarIcon,
  UserRoundCheckIcon,
  UserRoundCogIcon,
  UsersIcon,
} from 'lucide-react';

// Constants
import { ROUTE_KEYS, ROUTES } from './routes';

export type MenuItem = Required<MenuProps>['items'][number];

const {
  HOME,
  OVERVIEW,
  MANAGEMENT,
  ORG_CHART,
  EMPLOYEES,
  ACCOUNT,
  ACCOUNT_SETTING,
  PROFILE,
  CRM,
  CUSTOMERS,
  CUSTOMER_LOYALTY,
  POINTS_MANAGEMENT,
  REWARDS,
  QR_CODES,
} = ROUTE_KEYS;

export const MENU: MenuItem[] = [
  {
    key: ROUTES[HOME].key,
    label: ROUTES[HOME].label,
    type: 'group',
    children: [
      {
        key: ROUTES[OVERVIEW].key,
        label: ROUTES[OVERVIEW].label,
        icon: <GaugeIcon size={20} />,
      },
    ],
  },
  {
    key: ROUTES[MANAGEMENT].key,
    label: ROUTES[MANAGEMENT].label,
    type: 'group',
    children: [
      {
        key: ROUTES[ORG_CHART].key,
        label: ROUTES[ORG_CHART].label,
        icon: <NetworkIcon size={20} />,
      },
      {
        key: ROUTES[EMPLOYEES].key,
        label: ROUTES[EMPLOYEES].label,
        icon: <UsersIcon size={20} />,
      },
    ],
  },
  {
    key: ROUTES[ACCOUNT].key,
    label: ROUTES[ACCOUNT].label,
    type: 'group',
    children: [
      {
        key: ROUTES[PROFILE].key,
        label: ROUTES[PROFILE].label,
        icon: <UserRoundCheckIcon size={20} />,
      },
      {
        key: ROUTES[ACCOUNT_SETTING].key,
        label: ROUTES[ACCOUNT_SETTING].label,
        icon: <UserRoundCogIcon size={20} />,
      },
    ],
  },

  // CRM
  {
    key: ROUTES[CRM].key,
    label: ROUTES[CRM].label,
    type: 'group',
    children: [
      {
        key: ROUTES[CUSTOMERS].key,
        label: ROUTES[CUSTOMERS].label,
        icon: <UsersIcon size={20} />,
      },
      {
        key: ROUTES[CUSTOMER_LOYALTY].key,
        label: ROUTES[CUSTOMER_LOYALTY].label,
        icon: <SmileIcon size={20} />,
        type: 'submenu',
        children: [
          {
            key: ROUTES[POINTS_MANAGEMENT].key,
            label: ROUTES[POINTS_MANAGEMENT].label,
            icon: <StarIcon size={20} />,
          },
          {
            key: ROUTES[REWARDS].key,
            label: ROUTES[REWARDS].label,
            icon: <AwardIcon size={20} />,
          },
          {
            key: ROUTES[QR_CODES].key,
            label: ROUTES[QR_CODES].label,
            icon: <QrCodeIcon size={20} />,
          },
        ],
      },
    ],
  },
];
