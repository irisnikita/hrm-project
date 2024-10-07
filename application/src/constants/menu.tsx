'use client';

// Libraries
import { MenuProps } from 'antd';
import { GaugeIcon, NetworkIcon, UserRoundCheckIcon, UserRoundCogIcon, UserRoundIcon, UsersIcon } from 'lucide-react';

// Constants
import { ROUTE_KEYS, ROUTES } from './routes';

export type MenuItem = Required<MenuProps>['items'][number];

const { HOME, OVERVIEW, MANAGEMENT, ORG_CHART, EMPLOYEES, ACCOUNT, ACCOUNT_SETTING, PROFILE } = ROUTE_KEYS;

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
];
