'use client';

// Libraries
import { SiderProps, theme } from 'antd';
import React, { memo } from 'react';
import styled from 'styled-components';

// Components
import { Logo } from '@/components/shared';
import { Layout, Menu } from '@/components/ui';

// Constants
import { GLOBAL_TOKEN } from '@/constants';

// Hooks
import { useAppMenu } from '@/hooks';

interface DashboardSiderProps extends SiderProps {
  isShow?: boolean;
}

const { borderRadiusLG, boxShadowTertiary } = GLOBAL_TOKEN;

// Styled
const StyledSider = styled(Layout.Sider)`
  border-radius: ${borderRadiusLG}px !important;
  box-shadow: ${boxShadowTertiary} !important;
  backdrop-filter: var(--bg-filter-blur);
`;

export const DashboardSider: React.FC<DashboardSiderProps> = memo(props => {
  const { collapsed, isShow } = props;

  const { token } = theme.useToken();
  const { menuItems, selectedMenuKey } = useAppMenu();

  return isShow ? (
    <StyledSider
      trigger={null}
      collapsible
      collapsed={collapsed}
      width={250}
      className="px-4"
      style={{
        backgroundColor: (token as any)?.colorSiderBg,
      }}
    >
      <Logo className="h-[64px]" />
      <Menu inlineIndent={16} mode="inline" selectedKeys={[selectedMenuKey]} items={menuItems} />
    </StyledSider>
  ) : null;
});

DashboardSider.displayName = 'DashboardSider';
