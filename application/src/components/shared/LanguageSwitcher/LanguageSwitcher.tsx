'use client';

// Libraries
import { memo, useMemo, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

// Components
import { Button, Dropdown } from '@/components/ui';

// Constants
import { LOCALE_OPTIONS } from '@/constants';

// Utils
import { getLanguage, setLanguage } from '@/utils';

// Libs
import { tryCatch } from '@/lib';

export const LanguageSwitcher = memo(() => {
  const router = useRouter();
  const [currentLanguage, setCurrentLanguage] = useState(getLanguage());

  // Memo
  const languageIcon = useMemo(() => {
    return LOCALE_OPTIONS.find(option => option.key === currentLanguage)?.icon;
  }, [currentLanguage]);

  const handleLanguageChange = async (key: string) => {
    setCurrentLanguage(key);
    setLanguage(key);
    router.refresh();
  };

  return (
    <Dropdown
      menu={{
        items: LOCALE_OPTIONS.map(option => ({
          key: option.key,
          label: (
            <div className="flex items-center gap-2">
              <Image src={option.icon} alt={option.label} width={20} height={20} />
              {option.label}
            </div>
          ),
        })),
        selectedKeys: [currentLanguage],
        onClick: e => tryCatch(handleLanguageChange)(e.key),
      }}
      trigger={['click']}
      placement="bottomLeft"
    >
      <Button shape="circle" type="text">
        <Image src={languageIcon || ''} alt={currentLanguage} width={24} height={24} />
      </Button>
    </Dropdown>
  );
});

LanguageSwitcher.displayName = 'LanguageSwitcher';
