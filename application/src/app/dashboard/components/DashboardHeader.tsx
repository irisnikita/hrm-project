'use client';

// Libraries
import React, { memo } from 'react';
import styled, { css } from 'styled-components';
import clsx from 'clsx';

// Components
import { Header, OrganizationSwitcher } from '@/components/shared';

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
      leftContent={isShowSider && <OrganizationSwitcher />}
    />
  );
});

DashboardHeader.displayName = 'DashboardHeader';
