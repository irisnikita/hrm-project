// Icons
import { AppWindowMacIcon, LockKeyholeIcon } from 'lucide-react';

export const ACCOUNT_SETTING_KEYS = {
  PREFERENCES: 'preferences',
  SECURITY: 'security',
};

export const ACCOUNT_SETTING_ITEMS = [
  {
    key: 'preferences',
    icon: <AppWindowMacIcon size={20} />,
    label: 'menu.preferences',
  },
  {
    key: 'security',
    icon: <LockKeyholeIcon size={20} />,
    label: 'menu.security',
  },
];
