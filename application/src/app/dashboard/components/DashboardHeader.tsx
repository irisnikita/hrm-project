'use client';

// Libraries
import React, { memo } from 'react';
import styled, { css } from 'styled-components';
import clsx from 'clsx';
import { BellIcon } from 'lucide-react';

// Components
import { Header, LanguageSwitcher, OrganizationSwitcher } from '@/components/shared';
import { Badge, Button, Flex } from '@/components/ui';

// Constants
import { GLOBAL_TOKEN } from '@/constants';

interface DashboardHeaderProps {
  isDashboard?: boolean;
  isShowSider?: boolean;
}

const { colorGlassBgSecondary, borderRadiusLG, boxShadowTertiary } = GLOBAL_TOKEN;

const StyledHeader = styled(Header)<{ $isShowSider: boolean }>`
  ${props =>
    props.$isShowSider &&
    css`
      background-color: ${colorGlassBgSecondary};
      border-radius: ${borderRadiusLG}px;
      box-shadow: ${boxShadowTertiary};
    `}
`;

export const DashboardHeader: React.FC<DashboardHeaderProps> = memo(({ isShowSider }) => {
  return (
    <StyledHeader
      $isShowSider={!!isShowSider}
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
