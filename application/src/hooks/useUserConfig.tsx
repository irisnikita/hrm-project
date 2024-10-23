'use client';

import { useLocalStorage } from 'usehooks-ts';

// Constants
import { LOCAL_STORAGE_KEYS } from '@/constants';

// Types
import { UserConfig } from '@/types';

export const useUserConfig = () => {
  const [value, setValue, removeValue] = useLocalStorage<UserConfig>(
    LOCAL_STORAGE_KEYS.USER_CONFIG,
    {
      organizationId: undefined,
      language: 'en',
    },
  );

  return {
    userConfig: value,
    setUserConfig: setValue,
    removeUserConfig: removeValue,
  };
};
