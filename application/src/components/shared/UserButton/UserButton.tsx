'use client';

// Libraries
import React, { memo } from 'react';
import { CircleUserIcon, MailIcon, SettingsIcon } from 'lucide-react';
import { useAuth } from '@clerk/nextjs';
import { useTranslations } from 'next-intl';
import { signOut as nextAuthSignOut } from 'next-auth/react';

// Components
import { Avatar, Button, Divider, Flex, Menu, Popover, Typography } from '@/components/ui';

// Hooks
import { useUser } from '@/hooks';

// Types
import { MenuItem } from '@/types';

// Utils
import { getAvatarLabel } from '@/utils';

// Constants
import { ROUTES } from '@/constants';

const { Text } = Typography;

export const UserButton = memo(() => {
  const t = useTranslations();
  const { user, organization } = useUser();
  const { signOut } = useAuth();
  const { imageUrl, fullName, email } = user || {};

  const items: MenuItem[] = [
    {
      key: 'profile',
      icon: <CircleUserIcon size={20} />,
      label: t('user.profile'),
    },
    {
      key: 'account-settings',
      icon: <SettingsIcon size={20} />,
      label: t('user.accountSettings'),
    },
  ];

  const onClickSignOut = () => {
    signOut({
      redirectUrl: ROUTES.home.path,
    });
    nextAuthSignOut({
      redirectTo: ROUTES.home.path,
    });
  };

  const popoverContent = () => {
    return (
      <Flex vertical className="w-[300px]">
        <Flex align="center" gap={16}>
          <Avatar size={80} src={imageUrl} className="bg-primary !text-4xl">
            {getAvatarLabel(fullName || '')}
          </Avatar>
          <Flex vertical>
            <Text strong ellipsis={{ tooltip: true }}>
              {fullName || t('common.anonymous')}
            </Text>
            <Text ellipsis={{ tooltip: true }} className="!text-xs">
              {organization?.organizationName || ''}
            </Text>
            <Flex align="center" gap={4} className="mt-1">
              <MailIcon size={14} />
              <Text ellipsis={{ tooltip: true }} className="!text-xs">
                {email}
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Divider />

        <Menu items={items} mode="inline" inlineIndent={16} />

        <Button color="danger" className="mt-4" danger onClick={onClickSignOut}>
          {t('user.logout')}
        </Button>
      </Flex>
    );
  };

  return (
    <Flex align="center">
      <Popover content={popoverContent} trigger={['click']} arrow={false} placement="bottomRight">
        <Avatar src={imageUrl} size={32} className="cursor-pointer">
          {getAvatarLabel(fullName || '')}
        </Avatar>
      </Popover>
    </Flex>
  );
});

UserButton.displayName = 'UserButton';
