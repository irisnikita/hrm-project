'use client';

// Components
import { Card, Flex, Menu } from '@/components/ui';
import { useTranslations } from 'next-intl';
import { useImmer } from 'use-immer';

// Types
import { useMemo, useState } from 'react';

// Constants
import { ACCOUNT_SETTING_ITEMS, ACCOUNT_SETTING_KEYS } from './constants';

type TState = {
  selectedKey: string;
};

export default function AccountSettingPage() {
  const t = useTranslations();

  const [state, setState] = useImmer<TState>({
    selectedKey: ACCOUNT_SETTING_KEYS.PREFERENCES,
  });

  const items = useMemo(() => {
    return ACCOUNT_SETTING_ITEMS.map(item => ({
      key: item.key,
      label: t(item.label as any),
      icon: item.icon,
    }));
  }, [t]);

  // Variables
  const { selectedKey } = state;

  return (
    <Flex gap={16} className="h-full">
      <Card className="h-full w-[250px] shrink-0">
        <Menu
          items={items}
          mode="inline"
          inlineIndent={16}
          selectedKeys={[selectedKey]}
          onSelect={info =>
            setState(draft => {
              draft.selectedKey = info.key;
            })
          }
        />
      </Card>
      <Card className="h-full w-full">Hello moi nguoi</Card>
    </Flex>
  );
}
