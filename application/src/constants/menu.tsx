'use client';

// Libraries
import { MenuProps } from 'antd';
import { GaugeIcon, NetworkIcon, UsersIcon } from 'lucide-react';

// Constants
import { ROUTE_KEYS, ROUTES } from './routes';

export type MenuItem = Required<MenuProps>['items'][number];

const { HOME, OVERVIEW, MANAGEMENT, ORG_CHART, EMPLOYEES } = ROUTE_KEYS;

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
];
