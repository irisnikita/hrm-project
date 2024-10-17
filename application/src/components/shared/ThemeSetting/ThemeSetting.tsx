// Libraries
import React, { memo } from 'react';
// import { useImmer } from 'use-immer';

// Hooks
import { useToggle } from 'usehooks-ts';

// Icons
import { SettingsIcon } from 'lucide-react';

// Components
import { Button, Drawer } from '@/components/ui';

// Constants
import { WIDTHS } from '@/constants';

interface ThemeSettingProps {}

// type TState = {};

// const initialState: TState = {};

export const ThemeSetting: React.FC<ThemeSettingProps> = memo(() => {
  // const [state, setState] = useImmer<TState>(initialState);
  const [isOpenDrawer, toggleDrawer] = useToggle();

  return (
    <>
      <Button shape="circle" type="text" onClick={toggleDrawer}>
        <SettingsIcon size={20} />
      </Button>

      <Drawer width={WIDTHS.DRAWER_MIN_WIDTH} open={isOpenDrawer} onClose={toggleDrawer} />
    </>
  );
});

ThemeSetting.displayName = 'ThemeSetting';
