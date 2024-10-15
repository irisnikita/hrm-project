'use client';

// Libraries
import React, { memo } from 'react';

// Icons
import { MoonIcon, SunIcon } from 'lucide-react';

// Components
import { Button } from '@/components/ui';

// Hooks
import { useDarkMode } from '@/hooks';

interface DarkModeSwitcherProps {}

export const DarkModeSwitcher: React.FC<DarkModeSwitcherProps> = memo(() => {
  const { isDarkMode, toggle } = useDarkMode();

  return (
    <Button shape="circle" type="text" onClick={toggle}>
      {isDarkMode ? <MoonIcon size={20} /> : <SunIcon size={20} />}
    </Button>
  );
});

DarkModeSwitcher.displayName = 'DarkModeSwitcher';
