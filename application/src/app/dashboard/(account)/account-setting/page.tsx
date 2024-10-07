// Components
import { Card, Flex, Menu } from '@/components/ui';
import { useTranslations } from 'next-intl';

// Icons
import { AppWindowMacIcon, LockKeyholeIcon } from 'lucide-react';

// Types
import { MenuItem } from '@/types';

export default function AccountSettingPage() {
  const t = useTranslations();

  const items: MenuItem[] = [
    {
      key: 'preferences',
      icon: <AppWindowMacIcon size={20} />,
      label: t('menu.preferences'),
    },
    {
      key: 'security',
      icon: <LockKeyholeIcon size={20} />,
      label: t('menu.security'),
    },
  ];

  return (
    <Flex gap={16} className="h-full">
      <Card className="h-full w-[250px] shrink-0">
        <Menu items={items} mode="inline" inlineIndent={16} />
      </Card>
      <Card className="h-full w-full">Hello moi nguoi</Card>
    </Flex>
  );
}
