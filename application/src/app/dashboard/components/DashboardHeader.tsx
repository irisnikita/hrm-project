'use client';

// Libraries
import React, { memo } from 'react';
import styled, { css } from 'styled-components';
import clsx from 'clsx';
import { BellIcon } from 'lucide-react';
import { theme } from 'antd';

// Components
import {
  // DarkModeSwitcher,
  Header,
  LanguageSwitcher,
  OrganizationSwitcher,
} from '@/components/shared';
import { Badge, Button, Flex } from '@/components/ui';

// Constants
import { GLOBAL_TOKEN } from '@/constants';

interface DashboardHeaderProps {
  isDashboard?: boolean;
  isShowSider?: boolean;
}

const { borderRadiusLG, boxShadowTertiary } = GLOBAL_TOKEN;

const StyledHeader = styled(Header)<{ $isShowSider: boolean; $bgColor?: string }>`
  ${props =>
    props.$isShowSider &&
    css`
      background-color: ${props.$bgColor};
      border-radius: ${borderRadiusLG}px;
      box-shadow: ${boxShadowTertiary};
      backdrop-filter: var(--bg-filter-blur);
    `}
`;

export const DashboardHeader: React.FC<DashboardHeaderProps> = memo(({ isShowSider }) => {
  const { token } = theme.useToken();
  const { colorGlassBgSecondary } = token as any;

  return (
    <StyledHeader
      $isShowSider={!!isShowSider}
      $bgColor={colorGlassBgSecondary}
      className={clsx('!sticky top-0', {
        'mb-4': isShowSider,
      })}
      isDashboard
      rightContent={
        isShowSider && (
          <Flex gap={16} align="center">
            <LanguageSwitcher />

            <Badge count={2} size="small" offset={[-2, 2]}>
              <Button
                variant="filled"
                color="default"
                shape="circle"
                icon={<BellIcon size={20} />}
              />
            </Badge>
          </Flex>
        )
      }
      leftContent={isShowSider && <OrganizationSwitcher />}
    />
  );
});

DashboardHeader.displayName = 'DashboardHeader';
